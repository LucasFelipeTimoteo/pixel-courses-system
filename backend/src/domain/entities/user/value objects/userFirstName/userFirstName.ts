import { UserError } from "../../errors/userError";

export class UserFirstName {
	constructor(public readonly value: string) {
		if (!value) {
			throw new UserError(`firstName is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new UserError(
				`firstName should be a string, but received: ${value}`,
			);
		}

		if (value.length < 2) {
			throw new UserError(
				`firstName should have a length of at least 2, but received ${value.length} with value: ${value}`,
			);
		}
	}
}
