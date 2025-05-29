import { UserError } from "../../../../errors/userError";
import { UserFirstName } from "../../userFirstName";

describe("UserFirstName", () => {
	it("should create a valid FirstName", () => {
		const name = new UserFirstName("Lucas");
		expect(name.value).toBe("Lucas");
	});

	it("should throw error for short FirstName", () => {
		expect(() => new UserFirstName("L")).toThrow(UserError);
	});

	it("should throw error for empty FirstName", () => {
		expect(() => new UserFirstName("")).toThrow(UserError);
	});

	it("should throw error for non string FirstName", () => {
		expect(() => new UserFirstName(123 as any as string)).toThrow(UserError);
	});
});
