import type { Request } from "express";

export interface LoginBody {
  firstName: string;
  lastName: string;
  age: number;
  gender?: string;
  email: string;
  password: string;
}

export interface LoginHandlerRequest extends Request {
  body: LoginBody
}