import { UserError } from "../../errors/userError";

export class UserAge {
	constructor(public value: number) {
		if (typeof value !== "number") {
			throw new UserError(
				`Invalid age. It must be a number, but received type: ${typeof value}`,
			);
		}

		if (value < 6) {
			throw new UserError(
				`Invalid age. It must be a number greater than 6, but received: ${value}`,
			);
		}

		if (value > 200) {
			throw new UserError(
				`Invalid age. It must be a number less than 200, but received: ${value}`,
			);
		}
	}
}
