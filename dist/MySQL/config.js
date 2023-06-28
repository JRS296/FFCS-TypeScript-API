"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const course_models_1 = require("../models/course_models");
const faculty_model_1 = require("../models/faculty_model");
const registeredCourses_models_1 = require("../models/registeredCourses_models");
const student_models_1 = require("../models/student_models");
const student_timetable_1 = require("../models/student_timetable");
const timings_models_1 = require("../models/timings_models");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "123456",
    database: "ffcs",
    port: 3307,
    logging: false,
    models: [faculty_model_1.Faculty, student_models_1.Student, course_models_1.Course, registeredCourses_models_1.RegCourses, timings_models_1.Timings, student_timetable_1.StudentTimetable],
});
exports.default = connection;
