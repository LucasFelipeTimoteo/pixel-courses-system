import bcrypt from "bcryptjs";
import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserEmail } from "../../../domain/entities/user/value objects/userEmail/userEmail";
import { UserPassword } from "../../../domain/entities/user/value objects/userPassword/userPassword";
import type { User } from "../../../domain/interfaces/user/user";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { pinoLogger } from "../../../global/logger/pino/pinoLogger";
import { usersRepositoryMongoose } from "../../../repository/mongoose/users/usersRepositoryMongoose";
import type { LoginHandlerRequest } from "./types";

export const loginHandler = async (
	req: LoginHandlerRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user: Pick<User, "email" | "password"> = {
			email: new UserEmail(req.body.email).value,
			password: new UserPassword(req.body.password).value,
		};

		const foundUser = await usersRepositoryMongoose.getUserByEmail(user);
		if (!foundUser) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}

		const isCorrectPassword = await bcrypt.compare(
			user.password,
			foundUser.password,
		);

		if (!isCorrectPassword) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}

		pinoLogger.debug(`Successfully login user: ${foundUser._id}`);

		const accessTokenTTLInSeconds = appEnv.ACCESS_TOKEN_TTL_MINUTES * 60;
		const refreshTokenTTLInSeconds =
			appEnv.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60;

		const tokenPayload = { userId: foundUser._id };
		const accessToken = jwt.sign(tokenPayload, appEnv.ACCESS_TOKEN_JWT_SECRET, {
			expiresIn: accessTokenTTLInSeconds,
		});
		const refreshToken = jwt.sign(
			tokenPayload,
			appEnv.REFRESH_TOKEN_JWT_SECRET,
			{ expiresIn: refreshTokenTTLInSeconds },
		);

		return res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		next(error);
	}
};
