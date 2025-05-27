import { UserError } from "../../errors/userError";

export class userId {
	constructor(public readonly value: string) {
		if (!value) {
			throw new UserError(`ID is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new UserError(`ID should be a string, but received: ${value}`);
		}
	}
}
