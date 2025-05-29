import { UserError } from "../../../../errors/userError";
import { UserCourse } from "../../userCourse";

describe("UserCourse", () => {
	describe("Valid cases", () => {
		it("should accept undefined value", () => {
			expect(() => new UserCourse()).not.toThrow();
		});

		it("should accept valid course object", () => {
			const validCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: "Great course!",
				rate: 5,
			};
			expect(() => new UserCourse(validCourse)).not.toThrow();
		});
		it("should accepy empty comment", () => {
			const validCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: "",
				rate: 3,
			};
			expect(() => new UserCourse(validCourse)).not.toThrow(UserError);
		});
	});

	describe("Invalid cases", () => {
		it("should reject whitespace-only comment", () => {
			const invalidCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: "   ",
				rate: 4,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject non-string comment", () => {
			const invalidCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: 123 as any,
				rate: 2,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject non-string courseId", () => {
			const invalidCourse = {
				courseId: 123 as any,
				name: "curso javascript",
				comment: "blablabla",
				rate: 2,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject non-string course name", () => {
			const invalidCourse = {
				courseId: "dndw",
				name: 123 as any,
				comment: "blablabla",
				rate: 2,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject rate below 0", () => {
			const invalidCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: "Bad course",
				rate: -1 as any,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject rate above 5", () => {
			const invalidCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: "Bad course",
				rate: 6 as any,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject non-integer rate", () => {
			const invalidCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: "Average course",
				rate: 2.5 as any,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});

		it("should reject too long comment", () => {
			const longComment = "a".repeat(501);
			const invalidCourse = {
				courseId: "swdwidu28",
				name: "curso javascript",
				comment: longComment,
				rate: 1,
			};
			expect(() => new UserCourse(invalidCourse)).toThrow(UserError);
		});
	});
});
