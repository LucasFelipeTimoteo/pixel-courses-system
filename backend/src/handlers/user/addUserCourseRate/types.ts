import type { Request } from "express";

export interface addUserCourseRateBody {
  courseId: string;
  rate: number;
}

export interface addUserCourseRateHandlerRequest extends Request {
  body: addUserCourseRateBody
}