import { Router } from "express";
import { getCoursesReportHandler } from "../../handlers/courses/getCoursesReport/getCoursesReportHandler";

const router = Router();

router.get("/courses/report/:courseId", getCoursesReportHandler);

export const coursesRouter = router;
