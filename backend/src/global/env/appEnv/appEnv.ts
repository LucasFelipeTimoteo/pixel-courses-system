
import dotenv from 'dotenv'
import type { AppMachineType, EnvValues, NodeEnvs } from "./types";
import { envValidator } from "./utils/envValidator";

export class AppEnv {
	APP_LOCAL: AppMachineType;
	PORT: number;
	DOCUMENTATION_APP_PORT: number;
	NODE_ENV: NodeEnvs;
	CORS_WHITELIST: string;
	ACCESS_TOKEN_JWT_SECRET: string;
	REFRESH_TOKEN_JWT_SECRET: string;
	REFRESH_TOKEN_TTL_DAYS: number;
	ACCESS_TOKEN_TTL_MINUTES: number;
	SALT: number;
	MONGO_DATABASE: string;
	MONGO_USER_COLLECTION: string;
	MONGO_COURSES_COLLECTION: string
	MONGO_PORT: number;
	MONGO_URL?: string;

	constructor(
		public envValues: EnvValues,
	) {
		const validEnv = envValidator.validate(envValues);

		this.APP_LOCAL = validEnv.APP_LOCAL
		this.PORT = validEnv.PORT
		this.DOCUMENTATION_APP_PORT = validEnv.DOCUMENTATION_APP_PORT
		this.NODE_ENV = validEnv.NODE_ENV
		this.CORS_WHITELIST = validEnv.CORS_WHITELIST
		this.ACCESS_TOKEN_JWT_SECRET = validEnv.ACCESS_TOKEN_JWT_SECRET
		this.ACCESS_TOKEN_TTL_MINUTES = validEnv.ACCESS_TOKEN_TTL_MINUTES
		this.REFRESH_TOKEN_JWT_SECRET = validEnv.REFRESH_TOKEN_JWT_SECRET
		this.REFRESH_TOKEN_TTL_DAYS = validEnv.REFRESH_TOKEN_TTL_DAYS
		this.SALT = validEnv.SALT
		this.MONGO_DATABASE = validEnv.MONGO_DATABASE
		this.MONGO_PORT = validEnv.MONGO_PORT
		this.MONGO_URL = validEnv.MONGO_URL
		this.MONGO_USER_COLLECTION = validEnv.MONGO_USER_COLLECTION
		this.MONGO_COURSES_COLLECTION = validEnv.MONGO_COURSES_COLLECTION
	}

	getValidatedEnvValues() {
		const { envValues: _, ...validatedValues } = this;

		return validatedValues;
	}
}

// it Is not a problem to use type casting because it will be validated
const parsedEnvObj = dotenv.config().parsed as unknown as EnvValues;

export const appEnv = new AppEnv(
	parsedEnvObj,
).getValidatedEnvValues();
