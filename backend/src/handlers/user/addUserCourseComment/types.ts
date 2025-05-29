import type { Request } from "express";

export interface addUserCourseCommentBody {
	courseId: string;
	comment: string;
}

export interface addUserCourseCommentHandlerRequest extends Request {
	body: addUserCourseCommentBody;
}
