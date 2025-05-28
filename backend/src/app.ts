import httpCompress from "compression";
import express, { type Response } from "express";
import helmet from "helmet";
import { corsConfigMiddleware } from "./middlewares/cors/corsMiddlewareConfig";
import { ExpressErrorHandlerMiddleware } from "./middlewares/error/errorhandling";
import { userRouter } from "./router/user/userRouter";

export class ExpressApp {
  exec() {
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use(httpCompress());
    app.use(corsConfigMiddleware());
    app.use(userRouter);
    new ExpressErrorHandlerMiddleware(app).exec()

    app.get("/health", this.#healthCheck);

    return app;
  }

  #healthCheck(_: unknown, res: Response) {
    res.sendStatus(200);
  }
}
