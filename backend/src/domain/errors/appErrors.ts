import type { JsonWebTokenError } from "jsonwebtoken";
import type { UserError } from "../entities/user/errors/userError";
import type { ApiError } from "./apiError";
import type { ServerError } from "./serverError";

export type appErrors =
  | Error
  | ServerError
  | JsonWebTokenError
  | ApiError
  | UserError