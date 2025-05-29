import httpCompress from "compression";
import express, { type Response } from "express";
import helmet from "helmet";
import { corsConfigMiddleware } from "./middlewares/cors/corsMiddlewareConfig";
import { ExpressErrorHandlerMiddleware } from "./middlewares/error/errorhandling";
import { coursesRouter } from "./router/courses/coursesRouter";
import { userRouter } from "./router/user/userRouter";
import { generateDefaultCourses } from "./services/database/mongoose/generateDefaults/generateDefaultCourses/generateDefaultCourses";

export class ExpressApp {
	exec() {
		const app = express();

		app.use(express.json());
		app.use(helmet());
		app.use(httpCompress());
		app.use(corsConfigMiddleware());
		app.use(userRouter);
		app.use(coursesRouter);
		new ExpressErrorHandlerMiddleware(app).exec();

		app.get("/health", this.#healthCheck);

		return app;
	}

	async generateDefaultData() {
		await generateDefaultCourses();
	}

	#healthCheck(_: unknown, res: Response) {
		res.sendStatus(200);
	}
}
