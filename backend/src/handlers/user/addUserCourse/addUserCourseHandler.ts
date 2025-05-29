import type { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { usersRepositoryMongoose } from "../../../repository/mongoose/users/usersRepositoryMongoose";
import type { addUserCourseHandlerRequest } from "./types";

export const addUserCourseHandler = async (
	req: addUserCourseHandlerRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { courseId } = req.body;
		if (!courseId) {
			return res.status(400).json({ message: "courseId should be provided" });
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

		const userId = new UserId(validateAccessToken.userId);
		const addedUserCourse = await usersRepositoryMongoose.addUserCourse(
			userId,
			courseId,
		);

		if ("message" in addedUserCourse) {
			return res.status(404).json(addedUserCourse);
		}

		return res
			.status(200)
			.json({
				message: `Successfully added course to user ${addedUserCourse._id}`,
			});
	} catch (error) {
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
