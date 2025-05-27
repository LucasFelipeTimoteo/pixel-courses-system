import { UserError } from "../../errors/userError";

export class UserAge {
	constructor(public age: number) {
		if (typeof age !== "number") {
			throw new UserError(
				`Invalid age. It must be a number, but received type: ${typeof age}`,
			);
		}

		if (age < 6) {
			throw new UserError(
				`Invalid age. It must be a number greater than 6, but received: ${age}`,
			);
		}

		if (age > 200) {
			throw new UserError(
				`Invalid age. It must be a number less than 200, but received: ${age}`,
			);
		}
	}
}
