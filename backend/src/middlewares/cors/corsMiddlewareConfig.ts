import cors from "cors";
import { appEnv } from "../../global/env/appEnv/appEnv";

export const corsWhitelist = () => {
  const rawWhitelist = appEnv.CORS_WHITELIST
  if (!rawWhitelist) throw new Error("invalid cors whitelist")

  const whitelist = rawWhitelist
    .trim()
    .split(",")
    .map((str) => str.trim());

  return whitelist;
};

export const corsConfigMiddleware = () => {
  const whitelist = corsWhitelist();

  return cors({
    origin: (origin, callback) => {
      if (
        (origin && whitelist.indexOf(origin) !== -1) ||
        whitelist.includes("*")
      ) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS ERROR: origin [${origin}] is not whitelisted`),
        );
      }
    },
  });
};
