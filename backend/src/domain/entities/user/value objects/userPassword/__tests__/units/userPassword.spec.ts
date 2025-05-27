import { UserError } from "../../../../errors/userError";
import { UserPassword } from "../../userPassword";

describe("UserPassword", () => {
	it("should create a valid password", () => {
		const password = new UserPassword("12345678");
		expect(password.value).toBe("12345678");
	});

	it("should throw error for empty password", () => {
		expect(() => new UserPassword("")).toThrow(UserError);
	});

	it("should throw error for short password", () => {
		expect(() => new UserPassword("123")).toThrow(UserError);
	});

	it("should throw error for non-string", () => {
		expect(() => new UserPassword({} as any)).toThrow(UserError);
	});
});
