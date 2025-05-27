import { UserError } from "../../errors/userError";

export class UserPassword {
	constructor(public readonly value: string) {
		if (!value) {
			throw new UserError(`password is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new UserError(
				`password should be a string, but received: ${value}`,
			);
		}

		if (value.length < 8) {
			throw new UserError(
				`password should have at least 8 characters, but received ${value.length}`,
			);
		}
	}
}
