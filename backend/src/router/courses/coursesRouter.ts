import { Router } from "express";
import { getCoursesHandler } from "../../handlers/courses/getCourses/getCoursesHandler";
import { getCoursesReportHandler } from "../../handlers/courses/getCoursesReport/getCoursesReportHandler";

const router = Router();

router.get("/courses", getCoursesHandler);
router.get("/courses/report/:courseId", getCoursesReportHandler);

export const coursesRouter = router;
