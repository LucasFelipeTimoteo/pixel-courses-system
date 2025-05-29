import type { Request } from "express";

export interface RegisterBody {
	firstName: string;
	lastName: string;
	age: number;
	gender?: string;
	email: string;
	password: string;
}

export interface RegisterHandlerRequest extends Request {
	body: RegisterBody;
}
