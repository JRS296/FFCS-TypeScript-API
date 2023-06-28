"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ffcs_1 = require("../controller/ffcs");
const router = (0, express_1.Router)();
//POST Types
router.post("/faculty", ffcs_1.addFaculty);
router.post("/student", ffcs_1.addStudent);
// router.post("/admin/course", addCourse);
// router.get("/", getAllToDo);
// router.get("/:id", getTodoById);
// router.put("/:id", updateTodo);
// router.delete("/:id", deleteToDo);
exports.default = router;
