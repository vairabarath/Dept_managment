import express from "express";
import { getTeachers } from "../controllers/teacherController";
import { getStudents } from "../controllers/studentsController";
import { getParents } from "../controllers/parentsController";
import { getSubjects } from "../controllers/subjectsController";
import { getClasses } from "../controllers/classesController";
import { getLessons } from "../controllers/lessonsController";
import { getExams } from "../controllers/examsController";
import { getAssignments } from "../controllers/assignmentsController";
import { getResults } from "../controllers/resultsController";
import { getEvents } from "../controllers/eventsController";
import { getAnnouncements } from "../controllers/announcementsController";

const router = express.Router();

router.get("/all-teachers", getTeachers);
router.get("/all-students", getStudents);
router.get("/all-parents", getParents);
router.get("/all-subjects", getSubjects);
router.get("/all-classes", getClasses);
router.get("/all-lessons", getLessons);
router.get("/all-exams", getExams);
router.get("/all-assignments", getAssignments);
router.get("/all-results", getResults);
router.get("/all-events", getEvents);
router.get("/all-announcements", getAnnouncements);

export default router;
