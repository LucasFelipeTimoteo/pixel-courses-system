import bcrypt from "bcryptjs";
import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserAge } from "../../../domain/entities/user/value objects/userAge/userAge";
import { UserEmail } from "../../../domain/entities/user/value objects/userEmail/userEmail";
import { UserFirstName } from "../../../domain/entities/user/value objects/userFirstName/userFirstName";
import { UserGender } from "../../../domain/entities/user/value objects/userGender/userGender";
import { UserLastName } from "../../../domain/entities/user/value objects/userLastName/userLastName";
import { UserPassword } from "../../../domain/entities/user/value objects/userPassword/userPassword";
import type { User } from "../../../domain/interfaces/user/user";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { pinoLogger } from "../../../global/logger/pino/pinoLogger";
import { usersRepositoryMongoose } from "../../../repository/mongoose/mongooseRepository";
import type { RegisterHandlerRequest } from "./types";

export const registerHandler = async (
	req: RegisterHandlerRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user: Omit<User, "id" | "courses"> = {
			firstName: new UserFirstName(req.body.firstName).value,
			lastName: new UserLastName(req.body.lastName).value,
			email: new UserEmail(req.body.email).value,
			age: new UserAge(req.body.age).value,
			password: new UserPassword(req.body.password).value,
			gender: new UserGender(req.body.gender).value,
		};

		const hashSalt = await bcrypt.genSalt(appEnv.SALT);
		const hashedPassword = await bcrypt.hash(user.password, hashSalt);

		const userData = {
			...user,
			password: hashedPassword,
			courses: [],
		};

		const newUser = await usersRepositoryMongoose.register(userData);

		if ("message" in newUser) {
			return res.status(400).json(newUser);
		}

		pinoLogger.debug(`Successfully registered user: ${newUser._id}`);

		const accessTokenTTLInSeconds = appEnv.ACCESS_TOKEN_TTL_MINUTES * 60;
		const refreshTokenTTLInSeconds =
			appEnv.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60;

		const tokenPayload = { userId: newUser._id };
		const accessToken = jwt.sign(tokenPayload, appEnv.ACCESS_TOKEN_JWT_SECRET, {
			expiresIn: accessTokenTTLInSeconds,
		});
		const refreshToken = jwt.sign(
			tokenPayload,
			appEnv.REFRESH_TOKEN_JWT_SECRET,
			{ expiresIn: refreshTokenTTLInSeconds },
		);

		return res.status(201).json({ accessToken, refreshToken });
	} catch (error) {
		next(error);
	}
};
