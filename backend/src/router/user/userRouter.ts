import { Router } from "express";
import { addUserCourseHandler } from "../../handlers/user/addUserCourse/addUserCourseHandler";
import { addUserCourseCommentHandler } from "../../handlers/user/addUserCourseComment/addUserCourseCommentHandler";
import { addUserCourseRateHandler } from "../../handlers/user/addUserCourseRate/addUserCourseRateHandler";
import { editUserHandler } from "../../handlers/user/edit/editUserHandler";
import { getUserCoursesHandler } from "../../handlers/user/getUserCourses/getUserCoursesHandler";
import { loginHandler } from "../../handlers/user/login/loginHandler";
import { refreshHandler } from "../../handlers/user/refresh/refreshHandler";
import { registerHandler } from "../../handlers/user/register/registerHandler";
import { deleteUserHandler } from "../../handlers/user/remove/deleteUserHandler";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/refresh", refreshHandler);
router.delete("/users", deleteUserHandler);
router.put("/users", editUserHandler);
router.get("/users/courses", getUserCoursesHandler);
router.post("/users/courses", addUserCourseHandler);
router.post("/users/courses/rate/", addUserCourseRateHandler);
router.post("/users/courses/comment/", addUserCourseCommentHandler);

export const userRouter = router;
