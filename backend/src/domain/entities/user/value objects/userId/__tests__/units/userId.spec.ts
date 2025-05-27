import { UserError } from "../../../../errors/userError";
import { userId } from "../../userId";

describe("userId", () => {
	it("should create a valid Id", () => {
		const id = new userId("abc123");
		expect(id.value).toBe("abc123");
	});

	it("should throw error for empty ID", () => {
		expect(() => new userId("")).toThrow(UserError);
	});

	it("should throw error for non-string ID", () => {
		expect(() => new userId(123 as any)).toThrow(UserError);
	});
});
