import { Sequelize } from "sequelize-typescript";
import { Course } from "../models/course_models";
import { Faculty } from "../models/faculty_model";
import { RegCourses } from "../models/registeredCourses_models";
import { Student } from "../models/student_models";
import { StudentTimetable } from "../models/student_timetable";
import { Timings } from "../models/timings_models";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "123456",
  database: "ffcs",
  port: 3307,
  logging: false,
  models: [Faculty, Student, Course, RegCourses, Timings, StudentTimetable],
});

export default connection;