import type { NextFunction, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UserError } from '../../../domain/entities/user/errors/userError';
import { CourseRate } from '../../../domain/entities/user/value objects/courseRate/courseRate';
import { UserId } from '../../../domain/entities/user/value objects/userId/userId';
import { ServerError } from '../../../domain/errors/serverError';
import type { UserToken } from '../../../domain/interfaces/userToken/userToken';
import { appEnv } from '../../../global/env/appEnv/appEnv';
import { usersRepositoryMongoose } from '../../../repository/mongoose/mongooserepository';
import type { addUserCourseRateHandlerRequest } from './types';

export const addUserCourseRateHandler = async (req: addUserCourseRateHandlerRequest, res: Response, next: NextFunction) => {
  try {
    const { rate, courseId } = req.body
    if (!rate) {
      return res.status(400).json({ message: "rate should be provided" })
    }
    if (!courseId) {
      return res.status(400).json({ message: "courseId should be provided" })
    }

    const courseRate = new CourseRate(rate)
    const accessToken = req.header("X-Pixel-Access-Token");
    const invalidTokenResponse = { message: "Invalid token" }

    if (typeof accessToken !== 'string' || !accessToken) {
      return res.status(400).json(invalidTokenResponse)
    }

    const validatedaccessToken = jwt.verify(accessToken, appEnv.ACCESS_TOKEN_JWT_SECRET) as UserToken

    if (!("userId" in validatedaccessToken)) {
      return res.status(400).json(invalidTokenResponse)
    }

    const userId = new UserId(validatedaccessToken.userId)
    const addedUserCourse = await usersRepositoryMongoose.addUserCourseRate(userId, courseId, courseRate)

    if ("message" in addedUserCourse) {
      return res.status(404).json(addedUserCourse);
    }

    return res.status(200).json({ message: `Successfully added course to user ${addedUserCourse._id}` });
  }
  catch (error) {
    if (!(error instanceof Error)) {
      throw new ServerError("Unexpected server error")
    }

    if (error instanceof UserError || error instanceof JsonWebTokenError) {
      return next(error)
    }

    if (error.name.includes("CastError")) {
      console.log(error)
      return next(new UserError("Invalid ID"))
    }

    throw error
  }
};