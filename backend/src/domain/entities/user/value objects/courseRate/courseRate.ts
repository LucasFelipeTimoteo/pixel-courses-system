import { UserError } from "../../errors/userError";

export class CourseRate {
  constructor(public readonly value: number) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 0 ||
      value > 5
    ) {
      throw new UserError("course rate must be an integer between 0 and 5");
    }
  }
}