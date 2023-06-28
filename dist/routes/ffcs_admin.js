"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ffcs_1 = require("../controller/ffcs");
const router = (0, express_1.Router)();
//POST Types (admin)
router.post("/faculty", ffcs_1.addFaculty);
router.post("/student", ffcs_1.addStudent);
router.post("/timings", ffcs_1.addTiming);
router.post("/course", ffcs_1.addCourse);
router.post("/slot", ffcs_1.addSlot);
//GET Types (Common to all)
router.get("/timings/:fkey", ffcs_1.getTiming);
router.get("/faculties/:id", ffcs_1.getFaculties);
exports.default = router;
