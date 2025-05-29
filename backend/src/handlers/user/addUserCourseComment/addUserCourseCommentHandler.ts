import type { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import { CourseComment } from "../../../domain/entities/user/value objects/courseComment/courseComment";
import { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { usersRepositoryMongoose } from "../../../repository/mongoose/mongooserepository";
import type { addUserCourseCommentHandlerRequest } from "./types";

export const addUserCourseCommentHandler = async (
	req: addUserCourseCommentHandlerRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { comment, courseId } = req.body;
		if (!comment) {
			return res.status(400).json({ message: "comment should be provided" });
		}
		if (!courseId) {
			return res.status(400).json({ message: "courseId should be provided" });
		}

		const courseComment = new CourseComment(comment);
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
		const addedUserCourse = await usersRepositoryMongoose.addUserCourseComment(
			userId,
			courseId,
			courseComment,
		);

		if ("message" in addedUserCourse) {
			return res.status(404).json(addedUserCourse);
		}

		return res
			.status(200)
			.json({
				message: `Successfully added course comment to user ${addedUserCourse._id}`,
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
