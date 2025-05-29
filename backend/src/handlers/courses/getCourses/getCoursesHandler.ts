import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import { ServerError } from "../../../domain/errors/serverError";
import { coursesRepositoryMongoose } from "../../../repository/mongoose/courses/coursesRepositoryMongoose";

export const getCoursesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courses =
      await coursesRepositoryMongoose.getCourses();

    if(courses.length === 0) {
      return {message: "courses not found"}
    }
    return res.status(200).json(courses);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ServerError("Unexpected server error");
    }

    if (error instanceof UserError || error instanceof JsonWebTokenError) {
      return next(error);
    }

    if (error.name.includes("CastError")) {
      return next(new UserError("Invalid user ID"));
    }

    throw error;
  }
};
