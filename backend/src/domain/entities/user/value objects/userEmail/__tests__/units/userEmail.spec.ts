import { UserError } from "../../../../errors/userError";
import { UserEmail } from "../../userEmail";

describe("UserEmail", () => {
	it("should create a valid email", () => {
		const email = new UserEmail("lucas@example.com");
		expect(email.value).toBe("lucas@example.com");
	});

	it("should throw error for empty email", () => {
		expect(() => new UserEmail("")).toThrow(UserError);
	});

	it("should throw error for invalid format", () => {
		expect(() => new UserEmail("invalid-email")).toThrow(UserError);
	});

	it("should throw error for non-string", () => {
		expect(() => new UserEmail(42 as any)).toThrow(UserError);
	});
});
