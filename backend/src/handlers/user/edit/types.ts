import type { Request } from "express";

export interface EditUserBody {
  firstName: string;
  lastName: string;
  age: number;
  gender?: string;
  email: string;
  password: string;
}

export interface EditUserHandlerRequest extends Request {
  body: EditUserBody
}