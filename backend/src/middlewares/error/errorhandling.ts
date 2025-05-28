import type { Express, NextFunction, Response } from "express";
import { ApiError } from "../../domain/entities/user/errors/apiError";
import type { appErrors } from "../../domain/entities/user/errors/appErrors";
import { ServerError } from "../../domain/entities/user/errors/serverError";
import { UserError } from "../../domain/entities/user/errors/userError";

export class ExpressErrorHandlerMiddleware {
  constructor(
    public app: Express,
  ) { }

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
        if (
          err instanceof UserError
        ) {
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
        // pinoLogger.debug(err);
        return res.status(500).json({
          message: "Unexpected unknown error. Cannot process request",
        });
      },
    );

    return this.app;
  }
}
