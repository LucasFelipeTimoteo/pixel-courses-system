import { UserError } from "../../../../errors/userError";
import { UserId } from "../../userId";

describe("userId", () => {
	it("should create a valid Id", () => {
		const id = new UserId("abc123");
		expect(id.value).toBe("abc123");
	});

	it("should throw error for empty ID", () => {
		expect(() => new UserId("")).toThrow(UserError);
	});

	it("should throw error for non-string ID", () => {
		expect(() => new UserId(123 as any)).toThrow(UserError);
	});
});
