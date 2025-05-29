import { UserError } from "../../errors/userError";

export class UserEmail {
	constructor(public readonly value: string) {
		if (!value) {
			throw new UserError(`email is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new UserError(`email should be a string, but received: ${value}`);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			throw new UserError(`email should be valid, but received: ${value}`);
		}
	}
}
