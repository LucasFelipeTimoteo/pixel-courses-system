import { UserError } from "../../errors/userError";

export class UserLastName {
	constructor(public readonly value: string) {
		if (!value) {
			throw new UserError(`lastName is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new UserError(
				`lastName should be a string, but received: ${value}`,
			);
		}

		if (value.length < 2) {
			throw new UserError(
				`lastName should have a length of at least 2, but received ${value.length} with value: ${value}`,
			);
		}
	}
}
