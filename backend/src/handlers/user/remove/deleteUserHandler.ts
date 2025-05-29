import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { usersRepositoryMongoose } from "../../../repository/mongoose/mongooseRepository";

export const deleteUserHandler = async (
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
		const deletedUser = await usersRepositoryMongoose.deleteUserById(userId);

		if (!deletedUser) {
			return res
				.status(404)
				.json({ message: `Cannot find user ${userId.value}` });
		}

		return res
			.status(200)
			.json({ message: `Successfully deleted user ${deletedUser._id}` });
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
