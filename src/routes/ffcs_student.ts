import { Router } from "express";

import {
  getFaculties,
  getCourse,
  registerCourse,
  getTimetable
} from "../controller/ffcs";

const router = Router();

// GET Types (Common)
router.get("/faculty/:id",getFaculties)
router.get("/course/:id",getCourse)


// Student Functions (Only Student)
router.post("/register",registerCourse)
router.get("/timetable",getTimetable)


export default router;