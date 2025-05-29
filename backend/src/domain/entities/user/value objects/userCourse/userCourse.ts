import { CourseComment } from "../courseComment/courseComment";
import { CourseId } from "../courseId/courseId";
import { CourseName } from "../courseName/courseName";
import { CourseRate } from "../courseRate/courseRate";

export type RawUserCourse = {
	courseId: string;
	name: string;
	comment?: string;
	rate?: number;
};

export class UserCourse {
	constructor(public readonly value?: RawUserCourse) {
		if (value !== undefined && value !== null) {
			value.courseId = new CourseId(value.courseId).value;
			value.name = new CourseName(value.name).value;

			if (value.comment) value.comment = new CourseComment(value.comment).value;
			if (value.rate) value.rate = new CourseRate(value.rate).value;
		}
	}
}
