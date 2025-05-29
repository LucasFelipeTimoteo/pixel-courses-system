import { UserError } from "../../errors/userError";

export class CourseId {
  constructor(public readonly value: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new UserError("course id must be a non-empty string");
    }
  }
}