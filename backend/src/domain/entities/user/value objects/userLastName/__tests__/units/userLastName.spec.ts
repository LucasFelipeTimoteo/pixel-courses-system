import { UserError } from "../../../../errors/userError";
import { UserLastName } from "../../userLastName";

describe("UserLastName", () => {
	it("should create a valid last name", () => {
		const lastName = new UserLastName("Timóteo");
		expect(lastName.value).toBe("Timóteo");
	});

	it("should throw error for empty last name", () => {
		expect(() => new UserLastName("")).toThrow(UserError);
	});

	it("should throw error for short last name", () => {
		expect(() => new UserLastName("T")).toThrow(UserError);
	});

	it("should throw error for non-string", () => {
		expect(() => new UserLastName(123 as any)).toThrow(UserError);
	});
});
