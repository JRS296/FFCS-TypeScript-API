import { RequestHandler } from "express";

import { Faculty } from "../models/faculty_model";
import { Student } from "../models/student_models";
import { RegCourses } from "../models/registeredCourses_models";
import { Course } from "../models/course_models";
import { Timings } from "../models/timings_models";

import axios from 'axios';
import { StudentTimetable } from "../models/student_timetable";

//ADMIN POST requests (Need bearer token 'admin' for access)
export const addFaculty: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  else if (token[1] !== "admin") return res.status(403).json({ error: 'Unauthorized Access' });

  const { id } = await req.body;
  const isThere: Faculty | null = await Faculty.findByPk(id);
  if (isThere) return res.status(401).json({ error: 'Key Already Present' });

  const faculty = await Faculty.create({ ...req.body });
  return res
    .status(200)
    .json({
      //message: "Faculty Added Successfully", 
      success: true,
      data: faculty
    });
};  //Route -> /admin/faculty

export const addStudent: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  else if (token[1] !== "admin") return res.status(403).json({ error: 'Unauthorized Access' });

  const { id } = await req.body;
  const isThere: Student | null = await Student.findByPk(id);
  if (isThere) return res.status(401).json({ error: 'Key Already Present' });

  const student = await Student.create({ ...req.body });
  return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: student
    });
};  //Route -> /admin/student

export const addTiming: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  else if (token[1] !== "admin") return res.status(403).json({ error: 'Unauthorized Access' });

  const { id, day, start, end, fkey } = await req.body;
  if (day.length > 3) return res.status(401).json({ error: 'Day attribute in incorrect format' });
  const isThere: Timings | null = await Timings.findByPk(id);
  if (isThere) return res.status(401).json({ error: 'Key Already Present' });
  //console.log(id + ", " + day + ", " + start + ", " + end + ", " + String(fkey))
  const timing = await Timings.create({ id, day, start, end, fkey });
  return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: timing
    });
};  //Route -> /admin/timings

export const addSlot: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  else if (token[1] !== "admin") return res.status(403).json({ error: 'Unauthorized Access' });

  const x = await req.body;
  const { id, timings } = x;

  const isThere = await Timings.findAll({where: {fkey: id}});
  if (isThere.length>0) return res.status(401).json({ error: 'Key Already Present' });

  const fkey = id
  for (let i = 0; i < timings.length; i++) {
    let obj = timings[i];
    const id = fkey + `_${i}`
    const day = obj.day
    const start = obj.start
    const end = obj.end

    const timing = await Timings.create({ id, day, start, end, fkey });
    //const slot = await Slot.create({ ...req.body });
  }

  return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: x
    });
};  //Route -> /admin/slot

export const addCourse: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  else if (token[1] !== "admin") return res.status(403).json({ error: 'Unauthorized Access' });

  const val = req.body;
  const { id, name, slot_ids, faculty_ids, course_type } = val;
  var temp = id.toString()
  var isThere = await Course.findAll({
    where: {
      id: temp
    }
  });
  // console.log(isThere)
  if (isThere.length > 0) return res.status(401).json({ error: 'Key Already Present' });
  const x = String(course_type)
  if (x !== "THEORY" && x !== "LAB") return res.status(401).json({ error: 'Incorrect Course Types' + course_type + " -> " + course_type.type });

  let i = 0;
  let counter = 0;
  for (i = 0; i < slot_ids.length; i++) {
    for (let j = 0; j < faculty_ids.length; j++) {
      const primKey = id + `_${counter}`
      const sids = slot_ids[i];
      const fids = faculty_ids[j];
      var course = await Course.create({ primKey, id, name, slot_ids: sids, faculty_ids: fids, course_type: x });
      counter++
    }
  }

  const config = {
    headers: { Authorization: `Bearer ${token[1]}` }
  };

  // ______________________________Create get api for faculty and receive it via Axios
  let data: { id: string; name: string; }[] = []
  let allowed_slots: { id: string; timings: any; }[] = []
  for (let j = 0; j < faculty_ids.length; j++) {
    const res = await axios.get(`http://localhost:3000/admin/faculties/${faculty_ids[j]}`, config);
    data.push(res.data.data[0]);
  }

  for (let j = 0; j < slot_ids.length; j++) {
    const fkey = slot_ids[j]; //
    //const res = await Timings.findAll({ where: { fkey } });
    const res = await axios.get(`http://localhost:3000/admin/timings/${fkey}`, config);
    let timings: { day: string; start: string; end: string }[] = []
    for (let k = 0; k < res.data.data.length; k++) {
      timings.push({
        day: res.data.data[k].day,
        start: res.data.data[k].start,
        end: res.data.data[k].end
      })
    }

    const temp = {
      id: fkey,
      timings: timings
    }
    allowed_slots.push(temp);
    //console.log(temp);
  }

  return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: {
        id: id,
        name: name,
        faculties: data,
        course_type: course_type,
        allowed_slots: allowed_slots
      }
    });
};  //Route -> /admin/course


//GET Requests (Common to both Admin and Students) (Bearer Token Admin: Admin && Student: Student_ID)
export const getFaculties: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  const bt = token[1].toString()
  const isIDverified = await Student.findAll({ where: { id: bt } })
  if (token[1] !== "admin") {
    if (isIDverified.length === 0) return res.status(403).json({ error: 'Unauthorized Access' });
  }

  var { id } = req.params;
  var temp = id.toString()
  var isThere = await Faculty.findAll({
    where: {
      id: temp
    }
  });
  if (isThere.length > 0) return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: isThere
    });
  else return res.status(401).json({ error: 'Not Found' });
};  //Route -> /admin/faculties/:id && /faculty/:id

export const getCourse: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  const bt = token[1].toString()
  const isIDverified = await Student.findAll({ where: { id: bt } })
  if (token[1] !== "admin") {
    if (isIDverified.length === 0) return res.status(403).json({ error: 'Unauthorized Access' });
  }

  var { id } = req.params;
  var temp = id.toString()
  let allCourses = await Course.findAll({ where: { id: temp } })
  if(allCourses.length===0) return res.status(401).json({ error: 'Not Found' });
  let courseType = allCourses?.[0].dataValues.course_type
  let courseName = allCourses?.[0].dataValues.name
  let slotsInitial = []
  let facultiesInitial = []
  const faculties = []
  const allowed_slots = []
  const slots = []
  const slot_taken = []

  for (let j = 0; j < allCourses.length; j++) {
    const z = allCourses[j].dataValues
    const { slot_ids, faculty_ids } = z
    slotsInitial.push(slot_ids)
    facultiesInitial.push(faculty_ids)
  }

  const uniqueSlotsInitial = slotsInitial.filter((value, index, self) => {
    return self.indexOf(value) == index;
  });

  const uniqueFacultiesInitial = facultiesInitial.filter((value, index, self) => {
    return self.indexOf(value) == index;
  });

  for (let j = 0; j < uniqueFacultiesInitial.length; j++) {
    let FacultyDetails = await Faculty.findAll({ where: { id: uniqueFacultiesInitial[j] } })
    let FacultyName = FacultyDetails[0].dataValues.name
    let FacultyID = FacultyDetails[0].dataValues.id
    let faculty = {
      "id": FacultyID,
      "name": FacultyName
    }
    faculties.push(faculty)
  }

  for (let j = 0; j < uniqueSlotsInitial.length; j++) {
    const SlotDetails = await Timings.findAll({ where: { fkey: uniqueSlotsInitial[j] } })
    let SlotId = SlotDetails[0].dataValues.fkey
    let slot = {
      "id": SlotId,
    }

    if (uniqueSlotsInitial.includes(SlotId)) {
      slot_taken.push(slot)
    }
    allowed_slots.push(slot)
  }

  let course = {
    "id": temp,
    "name": courseName,
    "slot_ids": allowed_slots,
    "faculty_ids": faculties,
    "course_type": courseType,
  }


  if (allCourses.length > 0) return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: course
    });
  else return res.status(401).json({ error: 'Not Found' });
};  //Route -> /course/:id

export const getTiming: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token) return res.status(403).json({ error: 'Unauthorized Access' });
  const bt = token[1].toString()
  const isIDverified = await Student.findAll({ where: { id: bt } })
  if (token[1] !== "admin") {
    if (isIDverified.length === 0) return res.status(403).json({ error: 'Unauthorized Access' });
  }

  const { fkey } = req.params;
  const temp = String(fkey)
  const isThere = await Timings.findAll({ where: { fkey } });
  if (isThere) return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: isThere
    });
  else return res.status(401).json({ error: 'Not Found' });
};  //Route -> /timings/:fkey


// REGISTER and TIMETABLE of STUDENTS
export const registerCourse: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token || token[1] === "admin") return res.status(403).json({ error: 'Unauthorized Access' });
  const bt = token[1].toString()
  const isIDverified = await Student.findAll({ where: { id: bt } })
  if (isIDverified.length === 0) return res.status(403).json({ error: 'Unauthorized Access' });

  const x = await req.body;
  const { course_id, faculty_id, slot_ids } = x;

  //Get Student Name
  var student = isIDverified[0].dataValues.name

  //Search if Course Exists, Teacher is teaching selected course, slot_id's exist, does not clash with other slots
  const doesCourseExist = await Course.findAll({ where: { id: course_id } });
  if (doesCourseExist.length === 0) return res.status(401).json({ error: 'Selected Course Does Not Exist!' });

  var doesTeacherTeachSelectedCourse = false
  for (let i = 0; i < doesCourseExist.length; i++) {
    if (doesCourseExist[i].faculty_ids === faculty_id) doesTeacherTeachSelectedCourse = true;
  }
  if (!doesTeacherTeachSelectedCourse) return res.status(401).json({ error: 'Selected Teacher does not teach this Course!' });

  var doesSelectedSlotsExist = []
  for (let i = 0; i < doesCourseExist.length; i++) {
    for (let j = 0; j < slot_ids.length; j++) {
      if (doesCourseExist[i].slot_ids == slot_ids[j]) {
        doesSelectedSlotsExist.push(slot_ids[j]);
        break;
      }
    }
  }
  const unique = doesSelectedSlotsExist.filter((value, index, self) => {
    return self.indexOf(value) == index;
  });

  if (unique.length === 0) return res.status(401).json({ error: 'Selected slots are not available for this Course!' });

  for (let i = 0; i < unique.length; i++) {
    const isSlotOccupied = await RegCourses.findAll({ where: { slotId: unique[i] } })
    if (isSlotOccupied.length > 0) return res.status(400).json({ error: 'Slot Occupied' });
    const addedCourse: RegCourses | null = await RegCourses.create({ studentId: bt, courseId: course_id, teacherId: faculty_id, slotId: unique[i] })
  }

  let regCourses = await RegCourses.findAll({ where: { studentId: bt } })
  let courses = []

  const faculties = []
  const allowed_slots = []
  const slots = []
  const slot_taken = []

  for (let i = 0; i < regCourses.length; i++) {
    const { slotId } = regCourses[i].dataValues;
    slots.push(slotId)
  }

  for (let i = 0; i < 1; i++) {
    const y = regCourses[i].dataValues;
    const { courseId, teacherId, slotId } = y

    let courseDetails = await Course.findAll({ where: { id: courseId } })
    let courseType = courseDetails?.[0].dataValues.course_type
    let courseName = courseDetails?.[0].dataValues.name
    let slotsInitial = []
    let facultiesInitial = []
    for (let j = 0; j < courseDetails.length; j++) {
      const z = courseDetails[j].dataValues
      const { slot_ids, faculty_ids } = z
      slotsInitial.push(slot_ids)
      facultiesInitial.push(faculty_ids)
    }

    const uniqueSlotsInitial = slotsInitial.filter((value, index, self) => {
      return self.indexOf(value) == index;
    });

    const uniqueFacultiesInitial = facultiesInitial.filter((value, index, self) => {
      return self.indexOf(value) == index;
    });

    //Fill up faculties
    for (let j = 0; j < uniqueFacultiesInitial.length; j++) {
      let FacultyDetails = await Faculty.findAll({ where: { id: uniqueFacultiesInitial[j] } })
      let FacultyName = FacultyDetails[0].dataValues.name
      let FacultyID = FacultyDetails[0].dataValues.id
      let faculty = {
        "id": FacultyID,
        "name": FacultyName
      }
      faculties.push(faculty)
    }

    //Fill Up Available Slots
    for (let j = 0; j < uniqueSlotsInitial.length; j++) {
      const SlotDetails = await Timings.findAll({ where: { fkey: uniqueSlotsInitial[j] } })
      let timings = []
      let SlotId
      for (let k = 0; k < SlotDetails.length; k++) {

        SlotId = SlotDetails[k].dataValues.fkey
        let Day = SlotDetails[k].dataValues.day
        let Start = SlotDetails[k].dataValues.start
        let End = SlotDetails[k].dataValues.end

        let time = {
          "day": Day,
          "start": Start,
          "end": End
        }
        timings.push(time)

      }
      let slot = {
        "id": SlotId,
        "timings": timings
      }

      if (slots.includes(SlotId)) {
        slot_taken.push(slot)
      }
      allowed_slots.push(slot)
    }

    let course = {
      "course": {
        "id": courseId,
        "name": courseName,
        "faculties": faculties,
        "course_type": courseType,
        "allowed_slots": allowed_slots,
        "slots": slot_taken
      },
      //
    }
    courses.push(course)
  }

  const data = {
    id: bt,
    name: student,
    registered_courses: courses
  }

  const data2 = courses

  const finalSend = StudentTimetable.upsert({ id: bt, name: student, registered_courses: data2 });

  return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: data
    });
};  //Route -> /register

export const getTimetable: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ") as string[]
  if (!token || token[1] === "admin") return res.status(403).json({ error: 'Unauthorized Access' });
  const bt = token[1].toString()
  const isIDverified = await Student.findAll({ where: { id: bt } })
  if (isIDverified.length === 0) return res.status(403).json({ error: 'Unauthorized Access' });

  const data = await StudentTimetable.findAll({ where: { id: bt } });
  if (data.length > 0) return res
    .status(200)
    .json({
      //message: "Student Added Successfully", 
      success: true,
      data: data
    });
  else return res.status(404).json({ error: 'Not Found' });
};  //Route -> /timetable