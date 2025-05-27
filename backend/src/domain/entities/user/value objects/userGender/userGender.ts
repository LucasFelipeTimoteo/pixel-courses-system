import { UserError } from "../../errors/userError";

export class UserGender {
	constructor(public readonly value?: string) {
		if (
			value !== undefined &&
			(typeof value !== "string" || (value !== "F" && value !== "M"))
		) {
			throw new UserError(
				`gender must be 'F', 'M' or undefined, but received: ${value}`,
			);
		}
	}
}
