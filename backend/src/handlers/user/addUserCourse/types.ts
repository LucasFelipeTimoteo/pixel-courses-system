import type { Request } from "express";

export interface addUserCourseBody {
	courseId: string;
}

export interface addUserCourseHandlerRequest extends Request {
	body: addUserCourseBody;
}
