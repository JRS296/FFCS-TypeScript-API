"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ffcs_1 = require("../controller/ffcs");
const router = (0, express_1.Router)();
// GET Types (Common)
router.get("/faculty/:id", ffcs_1.getFaculties);
router.get("/course/:id", ffcs_1.getCourse);
// Student Functions (Only Student)
router.post("/register", ffcs_1.registerCourse);
router.get("/timetable", ffcs_1.getTimetable);
exports.default = router;
