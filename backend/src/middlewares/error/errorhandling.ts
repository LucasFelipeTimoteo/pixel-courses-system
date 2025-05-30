import type { Express, NextFunction, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { UserError } from "../../domain/entities/user/errors/userError";
import { ApiError } from "../../domain/errors/apiError";
import type { appErrors } from "../../domain/errors/appErrors";
import { ServerError } from "../../domain/errors/serverError";
import { pinoLogger } from "../../global/logger/pino/pinoLogger";

export class ExpressErrorHandlerMiddleware {
	constructor(public app: Express) {}

	exec() {
		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof ServerError) {
					// pinoLogger.debug(err);
					res.status(err.statusCode || 500).json({
						message: "Server error. Cannot process the request",
					});

					if (!err.operational) return process.exit(1);
					return;
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof ApiError) {
					// pinoLogger.debug(err);

					res.status(err.statusCode || 500).json({
						message: `${err.name}: ${err.message}`,
					});

					if (!err.operational) return process.exit(1);
					return;
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof UserError || err instanceof JsonWebTokenError) {
					// pinoLogger.debug(err);
					return res.status(400).json({
						message: err.message,
					});
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				pinoLogger.debug(err);
				if(err.message.includes("age: Cast to Number failed")){return res.status(400).json({
					message: 'Invalid age. It must be a number',
				});}
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				// pinoLogger.debug(err);
				return res.status(500).json({
					message: "Unexpected unknown error. Cannot process request",
				});
			},
		);

		return this.app;
	}
}
