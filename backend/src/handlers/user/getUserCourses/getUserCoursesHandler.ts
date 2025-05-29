import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { usersRepositoryMongoose } from "../../../repository/mongoose/users/usersRepositoryMongoose";

export const getUserCoursesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.header("X-Pixel-Access-Token");
    const invalidTokenResponse = { message: "Invalid token" };

    if (typeof accessToken !== "string" || !accessToken) {
      return res.status(400).json(invalidTokenResponse);
    }

    const validateAccessToken = jwt.verify(
      accessToken,
      appEnv.ACCESS_TOKEN_JWT_SECRET,
    ) as UserToken;

    if (!("userId" in validateAccessToken)) {
      return res.status(400).json(invalidTokenResponse);
    }

    const userId = new UserId(validateAccessToken.userId);
    const userCourses = await usersRepositoryMongoose.getUserCourses(userId);

    if ("message" in userCourses) {
      return res.status(404).json(userCourses);
    }

    return res
      .status(200)
      .json(userCourses);
  }
  catch (error) {
    if (!(error instanceof Error)) {
      throw new ServerError("Unexpected server error");
    }

    if (error instanceof UserError || error instanceof JsonWebTokenError) {
      return next(error);
    }

    if (error.name.includes("CastError")) {
      return next(new UserError("Invalid ID"));
    }

    throw error;
  }
};
