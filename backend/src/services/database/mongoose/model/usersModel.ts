import { Schema, model } from "mongoose";
import type { User } from "../../../../domain/interfaces/user/user";
import { appEnv } from "../../../../global/env/appEnv/appEnv";
import { CoursesModel } from "./coursesModel";

export const userCousesSchema = new Schema({
	courseId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: CoursesModel().modelName,
	},
	name: { type: "string", required: true, minlength: 1 },
	comment: { type: "string", required: false },
	rate: { type: "number", required: false, min: 0, max: 5 },
}, { _id: false });

export const usersSchemaMongoose = new Schema<Omit<User, "id">>({
	firstName: {
		type: "string",
		required: true,
		minlength: 2,
		maxlength: 30,
		match: /^[a-zA-Z0-9]+$/,
	},
	lastName: {
		type: "string",
		required: true,
		minlength: 2,
		maxlength: 30,
		match: /^[a-zA-Z0-9]+$/,
	},
	age: { type: "number", required: true, min: 6, max: 200 },
	password: { type: "string", required: true, minLength: 1 },
	email: {
		type: "string",
		required: true,
		minLength: 4,
		unique: true,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	gender: { type: "string", required: false, minLength: 1, maxLength: 1 },
	courses: [userCousesSchema],
});

export const UsersModel = (schema = usersSchemaMongoose) =>
	model(
		process.env.NODE_ENV === "test"
			? `test_${appEnv.MONGO_USER_COLLECTION}`
			: appEnv.MONGO_USER_COLLECTION,
		schema,
	);

export type UsersModelType = ReturnType<typeof UsersModel>;
