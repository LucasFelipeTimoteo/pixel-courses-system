import { UserError } from "../../errors/userError";

export type Course = {
	courseId: string;
	name: string;
	comment: string;
	rate: number;
};

export class UserCourse {
	constructor(public readonly value?: Course) {
		if (value !== undefined && value !== null) {
			this.validateCourse(value);
		}
	}

	private validateCourse(course: Course): void {
		if (
			typeof course.comment !== "string" ||
			course.comment.trim().length === 0
		) {
			throw new UserError("course comment must be a non-empty string");
		}

		if (
			typeof course.courseId !== "string" ||
			course.comment.trim().length === 0
		) {
			throw new UserError("course id must be a non-empty string");
		}

		if (typeof course.name !== "string" || course.comment.trim().length === 0) {
			throw new UserError("course name must be a non-empty string");
		}

		if (
			typeof course.rate !== "number" ||
			!Number.isInteger(course.rate) ||
			course.rate < 0 ||
			course.rate > 5
		) {
			throw new UserError("course rate must be an integer between 0 and 5");
		}

		const MAX_COMMENT_LENGTH = 500;
		if (course.comment.length > MAX_COMMENT_LENGTH) {
			throw new UserError(
				`course comment must be less than ${MAX_COMMENT_LENGTH} characters`,
			);
		}
	}
}
