"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimetable = exports.registerCourse = exports.getTiming = exports.getCourse = exports.getFaculties = exports.addCourse = exports.addSlot = exports.addTiming = exports.addStudent = exports.addFaculty = void 0;
const faculty_model_1 = require("../models/faculty_model");
const student_models_1 = require("../models/student_models");
const registeredCourses_models_1 = require("../models/registeredCourses_models");
const course_models_1 = require("../models/course_models");
const timings_models_1 = require("../models/timings_models");
const axios_1 = __importDefault(require("axios"));
const student_timetable_1 = require("../models/student_timetable");
//ADMIN POST requests (Need bearer token 'admin' for access)
const addFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    else if (token[1] !== "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const { id } = yield req.body;
    const isThere = yield faculty_model_1.Faculty.findByPk(id);
    if (isThere)
        return res.status(401).json({ error: 'Key Already Present' });
    const faculty = yield faculty_model_1.Faculty.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({
        //message: "Faculty Added Successfully", 
        success: true,
        data: faculty
    });
}); //Route -> /admin/faculty
exports.addFaculty = addFaculty;
const addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    else if (token[1] !== "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const { id } = yield req.body;
    const isThere = yield student_models_1.Student.findByPk(id);
    if (isThere)
        return res.status(401).json({ error: 'Key Already Present' });
    const student = yield student_models_1.Student.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({
        //message: "Student Added Successfully", 
        success: true,
        data: student
    });
}); //Route -> /admin/student
exports.addStudent = addStudent;
const addTiming = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    else if (token[1] !== "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const { id, day, start, end, fkey } = yield req.body;
    if (day.length > 3)
        return res.status(401).json({ error: 'Day attribute in incorrect format' });
    const isThere = yield timings_models_1.Timings.findByPk(id);
    if (isThere)
        return res.status(401).json({ error: 'Key Already Present' });
    //console.log(id + ", " + day + ", " + start + ", " + end + ", " + String(fkey))
    const timing = yield timings_models_1.Timings.create({ id, day, start, end, fkey });
    return res
        .status(200)
        .json({
        //message: "Student Added Successfully", 
        success: true,
        data: timing
    });
}); //Route -> /admin/timings
exports.addTiming = addTiming;
const addSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    else if (token[1] !== "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const x = yield req.body;
    const { id, timings } = x;
    const isThere = yield timings_models_1.Timings.findAll({ where: { fkey: id } });
    if (isThere.length > 0)
        return res.status(401).json({ error: 'Key Already Present' });
    const fkey = id;
    for (let i = 0; i < timings.length; i++) {
        let obj = timings[i];
        const id = fkey + `_${i}`;
        const day = obj.day;
        const start = obj.start;
        const end = obj.end;
        const timing = yield timings_models_1.Timings.create({ id, day, start, end, fkey });
        //const slot = await Slot.create({ ...req.body });
    }
    return res
        .status(200)
        .json({
        //message: "Student Added Successfully", 
        success: true,
        data: x
    });
}); //Route -> /admin/slot
exports.addSlot = addSlot;
const addCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const token = (_e = req.headers.authorization) === null || _e === void 0 ? void 0 : _e.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    else if (token[1] !== "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const val = req.body;
    const { id, name, slot_ids, faculty_ids, course_type } = val;
    var temp = id.toString();
    var isThere = yield course_models_1.Course.findAll({
        where: {
            id: temp
        }
    });
    // console.log(isThere)
    if (isThere.length > 0)
        return res.status(401).json({ error: 'Key Already Present' });
    const x = String(course_type);
    if (x !== "THEORY" && x !== "LAB")
        return res.status(401).json({ error: 'Incorrect Course Types' + course_type + " -> " + course_type.type });
    let i = 0;
    let counter = 0;
    for (i = 0; i < slot_ids.length; i++) {
        for (let j = 0; j < faculty_ids.length; j++) {
            const primKey = id + `_${counter}`;
            const sids = slot_ids[i];
            const fids = faculty_ids[j];
            var course = yield course_models_1.Course.create({ primKey, id, name, slot_ids: sids, faculty_ids: fids, course_type: x });
            counter++;
        }
    }
    const config = {
        headers: { Authorization: `Bearer ${token[1]}` }
    };
    // ______________________________Create get api for faculty and receive it via Axios
    let data = [];
    let allowed_slots = [];
    for (let j = 0; j < faculty_ids.length; j++) {
        const res = yield axios_1.default.get(`http://localhost:3000/admin/faculties/${faculty_ids[j]}`, config);
        data.push(res.data.data[0]);
    }
    for (let j = 0; j < slot_ids.length; j++) {
        const fkey = slot_ids[j]; //
        //const res = await Timings.findAll({ where: { fkey } });
        const res = yield axios_1.default.get(`http://localhost:3000/admin/timings/${fkey}`, config);
        let timings = [];
        for (let k = 0; k < res.data.data.length; k++) {
            timings.push({
                day: res.data.data[k].day,
                start: res.data.data[k].start,
                end: res.data.data[k].end
            });
        }
        const temp = {
            id: fkey,
            timings: timings
        };
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
}); //Route -> /admin/course
exports.addCourse = addCourse;
//GET Requests (Common to both Admin and Students) (Bearer Token Admin: Admin && Student: Student_ID)
const getFaculties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const token = (_f = req.headers.authorization) === null || _f === void 0 ? void 0 : _f.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    const bt = token[1].toString();
    const isIDverified = yield student_models_1.Student.findAll({ where: { id: bt } });
    if (token[1] !== "admin") {
        if (isIDverified.length === 0)
            return res.status(403).json({ error: 'Unauthorized Access' });
    }
    var { id } = req.params;
    var temp = id.toString();
    var isThere = yield faculty_model_1.Faculty.findAll({
        where: {
            id: temp
        }
    });
    if (isThere.length > 0)
        return res
            .status(200)
            .json({
            //message: "Student Added Successfully", 
            success: true,
            data: isThere
        });
    else
        return res.status(401).json({ error: 'Not Found' });
}); //Route -> /admin/faculties/:id && /faculty/:id
exports.getFaculties = getFaculties;
const getCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const token = (_g = req.headers.authorization) === null || _g === void 0 ? void 0 : _g.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    const bt = token[1].toString();
    const isIDverified = yield student_models_1.Student.findAll({ where: { id: bt } });
    if (token[1] !== "admin") {
        if (isIDverified.length === 0)
            return res.status(403).json({ error: 'Unauthorized Access' });
    }
    var { id } = req.params;
    var temp = id.toString();
    let allCourses = yield course_models_1.Course.findAll({ where: { id: temp } });
    if (allCourses.length === 0)
        return res.status(401).json({ error: 'Not Found' });
    let courseType = allCourses === null || allCourses === void 0 ? void 0 : allCourses[0].dataValues.course_type;
    let courseName = allCourses === null || allCourses === void 0 ? void 0 : allCourses[0].dataValues.name;
    let slotsInitial = [];
    let facultiesInitial = [];
    const faculties = [];
    const allowed_slots = [];
    const slots = [];
    const slot_taken = [];
    for (let j = 0; j < allCourses.length; j++) {
        const z = allCourses[j].dataValues;
        const { slot_ids, faculty_ids } = z;
        slotsInitial.push(slot_ids);
        facultiesInitial.push(faculty_ids);
    }
    const uniqueSlotsInitial = slotsInitial.filter((value, index, self) => {
        return self.indexOf(value) == index;
    });
    const uniqueFacultiesInitial = facultiesInitial.filter((value, index, self) => {
        return self.indexOf(value) == index;
    });
    for (let j = 0; j < uniqueFacultiesInitial.length; j++) {
        let FacultyDetails = yield faculty_model_1.Faculty.findAll({ where: { id: uniqueFacultiesInitial[j] } });
        let FacultyName = FacultyDetails[0].dataValues.name;
        let FacultyID = FacultyDetails[0].dataValues.id;
        let faculty = {
            "id": FacultyID,
            "name": FacultyName
        };
        faculties.push(faculty);
    }
    for (let j = 0; j < uniqueSlotsInitial.length; j++) {
        const SlotDetails = yield timings_models_1.Timings.findAll({ where: { fkey: uniqueSlotsInitial[j] } });
        let SlotId = SlotDetails[0].dataValues.fkey;
        let slot = {
            "id": SlotId,
        };
        if (uniqueSlotsInitial.includes(SlotId)) {
            slot_taken.push(slot);
        }
        allowed_slots.push(slot);
    }
    let course = {
        "id": temp,
        "name": courseName,
        "slot_ids": allowed_slots,
        "faculty_ids": faculties,
        "course_type": courseType,
    };
    if (allCourses.length > 0)
        return res
            .status(200)
            .json({
            //message: "Student Added Successfully", 
            success: true,
            data: course
        });
    else
        return res.status(401).json({ error: 'Not Found' });
}); //Route -> /course/:id
exports.getCourse = getCourse;
const getTiming = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const token = (_h = req.headers.authorization) === null || _h === void 0 ? void 0 : _h.split(" ");
    if (!token)
        return res.status(403).json({ error: 'Unauthorized Access' });
    const bt = token[1].toString();
    const isIDverified = yield student_models_1.Student.findAll({ where: { id: bt } });
    if (token[1] !== "admin") {
        if (isIDverified.length === 0)
            return res.status(403).json({ error: 'Unauthorized Access' });
    }
    const { fkey } = req.params;
    const temp = String(fkey);
    const isThere = yield timings_models_1.Timings.findAll({ where: { fkey } });
    if (isThere)
        return res
            .status(200)
            .json({
            //message: "Student Added Successfully", 
            success: true,
            data: isThere
        });
    else
        return res.status(401).json({ error: 'Not Found' });
}); //Route -> /timings/:fkey
exports.getTiming = getTiming;
// REGISTER and TIMETABLE of STUDENTS
const registerCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const token = (_j = req.headers.authorization) === null || _j === void 0 ? void 0 : _j.split(" ");
    if (!token || token[1] === "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const bt = token[1].toString();
    const isIDverified = yield student_models_1.Student.findAll({ where: { id: bt } });
    if (isIDverified.length === 0)
        return res.status(403).json({ error: 'Unauthorized Access' });
    const x = yield req.body;
    const { course_id, faculty_id, slot_ids } = x;
    //Get Student Name
    var student = isIDverified[0].dataValues.name;
    //Search if Course Exists, Teacher is teaching selected course, slot_id's exist, does not clash with other slots
    const doesCourseExist = yield course_models_1.Course.findAll({ where: { id: course_id } });
    if (doesCourseExist.length === 0)
        return res.status(401).json({ error: 'Selected Course Does Not Exist!' });
    var doesTeacherTeachSelectedCourse = false;
    for (let i = 0; i < doesCourseExist.length; i++) {
        if (doesCourseExist[i].faculty_ids === faculty_id)
            doesTeacherTeachSelectedCourse = true;
    }
    if (!doesTeacherTeachSelectedCourse)
        return res.status(401).json({ error: 'Selected Teacher does not teach this Course!' });
    var doesSelectedSlotsExist = [];
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
    if (unique.length === 0)
        return res.status(401).json({ error: 'Selected slots are not available for this Course!' });
    for (let i = 0; i < unique.length; i++) {
        const isSlotOccupied = yield registeredCourses_models_1.RegCourses.findAll({ where: { slotId: unique[i] } });
        if (isSlotOccupied.length > 0)
            return res.status(401).json({ error: 'Slot Occupied' });
        const addedCourse = yield registeredCourses_models_1.RegCourses.create({ studentId: bt, courseId: course_id, teacherId: faculty_id, slotId: unique[i] });
    }
    let regCourses = yield registeredCourses_models_1.RegCourses.findAll({ where: { studentId: bt } });
    let courses = [];
    const faculties = [];
    const allowed_slots = [];
    const slots = [];
    const slot_taken = [];
    for (let i = 0; i < regCourses.length; i++) {
        const { slotId } = regCourses[i].dataValues;
        slots.push(slotId);
    }
    for (let i = 0; i < 1; i++) {
        const y = regCourses[i].dataValues;
        const { courseId, teacherId, slotId } = y;
        let courseDetails = yield course_models_1.Course.findAll({ where: { id: courseId } });
        let courseType = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails[0].dataValues.course_type;
        let courseName = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails[0].dataValues.name;
        let slotsInitial = [];
        let facultiesInitial = [];
        for (let j = 0; j < courseDetails.length; j++) {
            const z = courseDetails[j].dataValues;
            const { slot_ids, faculty_ids } = z;
            slotsInitial.push(slot_ids);
            facultiesInitial.push(faculty_ids);
        }
        const uniqueSlotsInitial = slotsInitial.filter((value, index, self) => {
            return self.indexOf(value) == index;
        });
        const uniqueFacultiesInitial = facultiesInitial.filter((value, index, self) => {
            return self.indexOf(value) == index;
        });
        //Fill up faculties
        for (let j = 0; j < uniqueFacultiesInitial.length; j++) {
            let FacultyDetails = yield faculty_model_1.Faculty.findAll({ where: { id: uniqueFacultiesInitial[j] } });
            let FacultyName = FacultyDetails[0].dataValues.name;
            let FacultyID = FacultyDetails[0].dataValues.id;
            let faculty = {
                "id": FacultyID,
                "name": FacultyName
            };
            faculties.push(faculty);
        }
        //Fill Up Available Slots
        for (let j = 0; j < uniqueSlotsInitial.length; j++) {
            const SlotDetails = yield timings_models_1.Timings.findAll({ where: { fkey: uniqueSlotsInitial[j] } });
            let timings = [];
            let SlotId;
            for (let k = 0; k < SlotDetails.length; k++) {
                SlotId = SlotDetails[k].dataValues.fkey;
                let Day = SlotDetails[k].dataValues.day;
                let Start = SlotDetails[k].dataValues.start;
                let End = SlotDetails[k].dataValues.end;
                let time = {
                    "day": Day,
                    "start": Start,
                    "end": End
                };
                timings.push(time);
            }
            let slot = {
                "id": SlotId,
                "timings": timings
            };
            if (slots.includes(SlotId)) {
                slot_taken.push(slot);
            }
            allowed_slots.push(slot);
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
        };
        courses.push(course);
    }
    const data = {
        id: bt,
        name: student,
        registered_courses: courses
    };
    const data2 = courses;
    const finalSend = student_timetable_1.StudentTimetable.upsert({ id: bt, name: student, registered_courses: data2 });
    return res
        .status(200)
        .json({
        //message: "Student Added Successfully", 
        success: true,
        data: data
    });
}); //Route -> /register
exports.registerCourse = registerCourse;
const getTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const token = (_k = req.headers.authorization) === null || _k === void 0 ? void 0 : _k.split(" ");
    if (!token || token[1] === "admin")
        return res.status(403).json({ error: 'Unauthorized Access' });
    const bt = token[1].toString();
    const isIDverified = yield student_models_1.Student.findAll({ where: { id: bt } });
    if (isIDverified.length === 0)
        return res.status(403).json({ error: 'Unauthorized Access' });
    const data = yield student_timetable_1.StudentTimetable.findAll({ where: { id: bt } });
    if (data.length > 0)
        return res
            .status(200)
            .json({
            //message: "Student Added Successfully", 
            success: true,
            data: data
        });
    else
        return res.status(404).json({ error: 'Not Found' });
}); //Route -> /timetable
exports.getTimetable = getTimetable;
