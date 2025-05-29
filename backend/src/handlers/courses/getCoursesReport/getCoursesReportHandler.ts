import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import { CourseId } from "../../../domain/entities/user/value objects/courseId/courseId";
import { UserAge } from "../../../domain/entities/user/value objects/userAge/userAge";
import { UserGender } from "../../../domain/entities/user/value objects/userGender/userGender";
import { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { coursesRepositoryMongoose } from "../../../repository/mongoose/courses/coursesRepositoryMongoose";
import {
	type UsersWithCourseReport,
	generateCourseReport,
} from "./utils/generateCourseReport/generateCourseReport";

export const getCoursesReportHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { courseId } = req.params;
		if (!courseId) {
			return res.status(400).json({ message: "courseId must be provided" });
		}

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

		const validCourseId = new CourseId(courseId);
		const usersWithCourse =
			await coursesRepositoryMongoose.getCourseRelatory(validCourseId);

		if ("message" in usersWithCourse) {
			return res.status(404).json(usersWithCourse);
		}

		const formatterUserToReport: UsersWithCourseReport = usersWithCourse.map(
			(user) => ({
				id: new UserId(user._id.toString()).value,
				age: new UserAge(user.age).value,
				gender: user.gender ? new UserGender(user.gender).value : undefined,
				courses: user.courses,
			}),
		);

		const courseReport = generateCourseReport(
			formatterUserToReport,
			validCourseId,
		);

		return res.status(200).json(courseReport);
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
