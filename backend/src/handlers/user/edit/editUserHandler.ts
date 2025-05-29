import bcrypt from "bcryptjs";
import type { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../../domain/entities/user/errors/userError";
import type { UserEntity } from "../../../domain/entities/user/userEntity";
import { UserAge } from "../../../domain/entities/user/value objects/userAge/userAge";
import { UserEmail } from "../../../domain/entities/user/value objects/userEmail/userEmail";
import { UserFirstName } from "../../../domain/entities/user/value objects/userFirstName/userFirstName";
import { UserGender } from "../../../domain/entities/user/value objects/userGender/userGender";
import { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import { UserLastName } from "../../../domain/entities/user/value objects/userLastName/userLastName";
import { UserPassword } from "../../../domain/entities/user/value objects/userPassword/userPassword";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { usersRepositoryMongoose } from "../../../repository/mongoose/mongooserepository";
import type { EditUserHandlerRequest } from "./types";

export const editUserHandler = async (
	req: EditUserHandlerRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const accessToken = req.header("X-Pixel-Access-Token");
		const invalidTokenResponse = { message: "Invalid token" };
		const userEdition = req.body;

		if (typeof accessToken !== "string" || !accessToken) {
			return res.status(400).json(invalidTokenResponse);
		}

		const validatedaccessToken = jwt.verify(
			accessToken,
			appEnv.ACCESS_TOKEN_JWT_SECRET,
		) as UserToken;

		if (!("userId" in validatedaccessToken)) {
			return res.status(400).json(invalidTokenResponse);
		}

		const userId = new UserId(validatedaccessToken.userId);

		if (userEdition.password) {
			const unhashedPassword = new UserPassword(userEdition.password).value;
			const salt = bcrypt.genSaltSync(appEnv.SALT);
			userEdition.password = bcrypt.hashSync(unhashedPassword, salt);
		}

		const validatedUserEdition: Partial<Omit<UserEntity, "id" | "courses">> = {
			...(typeof userEdition.firstName === "string" && {
				firstName: new UserFirstName(userEdition.firstName),
			}),

			...(typeof userEdition.lastName === "string" && {
				lastName: new UserLastName(userEdition.lastName),
			}),

			...(typeof userEdition.email === "string" && {
				email: new UserEmail(userEdition.email),
			}),

			...(typeof userEdition.password === "string" && {
				password: new UserPassword(userEdition.password),
			}),

			...(typeof userEdition.gender === "string" && {
				gender: new UserGender(userEdition.gender),
			}),

			...(typeof userEdition.age === "number" && {
				age: new UserAge(userEdition.age),
			}),
		};

		const updatedUser = await usersRepositoryMongoose.editUser(
			userId,
			validatedUserEdition,
		);

		if (!updatedUser) {
			return res
				.status(404)
				.json({ message: `Cannot find user ${userId.value}` });
		}

		if ("message" in updatedUser) {
			return res.status(400).json(updatedUser);
		}

		return res
			.status(200)
			.json({ message: `Successfully update user ${updatedUser._id}` });
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
