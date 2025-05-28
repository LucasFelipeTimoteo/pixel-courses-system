import { z } from 'zod'
import type { EnvValues } from "../types";

class EnvValidator {
  validate(env: EnvValues): EnvValues {
    env.PORT = Number(env.PORT);
    env.DOCUMENTATION_APP_PORT = Number(env.DOCUMENTATION_APP_PORT);
    env.MONGO_PORT = Number(env.MONGO_PORT);
    env.SALT = Number(env.SALT);
    env.ACCESS_TOKEN_TTL_MINUTES = Number(env.ACCESS_TOKEN_TTL_MINUTES);
    env.REFRESH_TOKEN_TTL_DAYS = Number(env.REFRESH_TOKEN_TTL_DAYS);

    const schema = z.object({
      NODE_ENV: z.enum(["development", "production", "test"]),
      APP_LOCAL: z.enum(["docker", "local_machine"]),
      PORT: z.number().min(1),
      DOCUMENTATION_APP_PORT: z.number().min(1),
      CORS_WHITELIST: z.string().min(1),
      ACCESS_TOKEN_JWT_SECRET: z.string().min(1),
      ACCESS_TOKEN_TTL_MINUTES: z.number().min(1),
      REFRESH_TOKEN_JWT_SECRET: z.string().min(1),
      REFRESH_TOKEN_TTL_DAYS: z.number().min(1),
      SALT: z.number().min(1),
      MONGO_DATABASE: z.string().min(1),
      MONGO_PORT: z.number().min(1),
      MONGO_URL: z.string().min(1).optional(),
      MONGO_USER_COLLECTION: z.string().min(1)
    });

    const validatedEnv = schema.parse(env);
    return validatedEnv;

  }
}

export const envValidator = new EnvValidator();
