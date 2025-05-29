import { UserError } from "../../../../errors/userError";
import { UserGender } from "../../userGender";

describe("UserGender", () => {
	describe("should create successfully with valid values", () => {
		it("should create with 'F'", () => {
			const gender = new UserGender("F");
			expect(gender.value).toBe("F");
		});

		it("should create with 'M'", () => {
			const gender = new UserGender("M");
			expect(gender.value).toBe("M");
		});

		it("should create with undefined", () => {
			const gender = new UserGender(undefined);
			expect(gender.value).toBeUndefined();
		});

		it("should create with null", () => {
			const nullishValue = null as any as undefined;
			expect(() => new UserGender(nullishValue)).toThrow();
		});
	});

	describe("should throw UserError with invalid values", () => {
		it("should throw for empty string", () => {
			const invalidValue = "" as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});

		it("should throw for lowercase 'f'", () => {
			const invalidValue = "f" as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});

		it("should throw for lowercase 'm'", () => {
			const invalidValue = "m" as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});

		it("should throw for invalid string", () => {
			const invalidValue = "X" as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});

		it("should throw for number", () => {
			const invalidValue = 1 as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});

		it("should throw for boolean", () => {
			const invalidValue = true as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});

		it("should throw for object", () => {
			const invalidValue = {} as any as undefined;
			expect(() => new UserGender(invalidValue)).toThrow(UserError);
		});
	});
});
