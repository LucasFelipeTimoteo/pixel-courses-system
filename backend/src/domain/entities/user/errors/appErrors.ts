import type { ApiError } from "./apiError";
import type { ServerError } from "./serverError";
import type { UserError } from "./userError";

export type appErrors =
  | Error
  | ServerError
  | ApiError
  | UserError