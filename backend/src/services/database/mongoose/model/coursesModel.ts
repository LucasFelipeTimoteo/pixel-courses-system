import { Schema, model } from "mongoose";
import { appEnv } from "../../../../global/env/appEnv/appEnv";

export type Course = {
	name: string;
	description: string;
	durationHours: number;
	image: string;
};

export const CoursesSchema = new Schema<Course>({
	name: { type: "string", required: true, minlength: 1 },
	description: { type: "string", required: true },
	durationHours: { type: "number", required: true },
	image: { type: "string", required: true },
});

export const CoursesModel = (schema = CoursesSchema) => {
	const modelName =
		process.env.NODE_ENV === "test"
			? `test_${appEnv.MONGO_COURSES_COLLECTION}`
			: appEnv.MONGO_COURSES_COLLECTION;
	return model(modelName, schema);
};

export type CoursesModelType = ReturnType<typeof CoursesModel>;
