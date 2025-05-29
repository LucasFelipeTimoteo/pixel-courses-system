import { UserError } from "../../errors/userError";

export class CourseComment {
	static readonly MAX_LENGTH = 500;
	constructor(public readonly value: string) {
		if (typeof value !== "string" || value.trim().length === 0) {
			throw new UserError("course comment must be a non-empty string");
		}
		if (value.length > CourseComment.MAX_LENGTH) {
			throw new UserError(
				`course comment must be less than ${CourseComment.MAX_LENGTH} characters`,
			);
		}
	}
}
