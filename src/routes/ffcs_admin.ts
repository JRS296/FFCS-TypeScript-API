import { Router } from "express";

import {
  addFaculty,
  addStudent,
  addCourse,
  addSlot,
  addTiming,
  getTiming,
  getFaculties
} from "../controller/ffcs";

const router = Router();

//POST Types (admin)
router.post("/faculty", addFaculty);
router.post("/student", addStudent);
router.post("/timings", addTiming);
router.post("/course", addCourse);
router.post("/slot", addSlot);


//GET Types (Common to all)
router.get("/timings/:fkey", getTiming);
router.get("/faculties/:id", getFaculties);


export default router;