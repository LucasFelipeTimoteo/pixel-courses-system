import { UserError } from "../../errors/userError";

export class CourseName {
	constructor(public readonly value: string) {
		if (typeof value !== "string" || value.trim().length === 0) {
			throw new UserError("course name must be a non-empty string");
		}
	}
}
