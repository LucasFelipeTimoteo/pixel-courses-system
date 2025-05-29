import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { ServerError } from "../../../domain/errors/serverError";
import type { UserToken } from "../../../domain/interfaces/userToken/userToken";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { pinoLogger } from "../../../global/logger/pino/pinoLogger";

export const refreshHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const invalidTokenResponse = { message: "Invalid token" };
		const refreshToken = req.header("X-Pixel-Refresh-Token");

		if (typeof refreshToken !== "string" || !refreshToken) {
			return res.status(400).json(invalidTokenResponse);
		}

		const validatedrefreshToken = jwt.verify(
			refreshToken,
			appEnv.REFRESH_TOKEN_JWT_SECRET,
		) as UserToken;

		if (!("userId" in validatedrefreshToken)) {
			return res.status(400).json(invalidTokenResponse);
		}

		const newTokenPayload: UserToken = {
			userId: validatedrefreshToken.userId,
		};

		const accessTokenTTL = appEnv.ACCESS_TOKEN_TTL_MINUTES * 60;
		const newToken = jwt.sign(newTokenPayload, appEnv.ACCESS_TOKEN_JWT_SECRET, {
			expiresIn: accessTokenTTL,
		});
		pinoLogger.debug("Successfully generated a new accessToken");

		return res.status(200).json({ accessToken: newToken });
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			return next(error);
		}

		throw new ServerError("Unexpected Error on refreshhandler");
	}
};
