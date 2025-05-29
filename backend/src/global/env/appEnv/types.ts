export type EnvValues = {
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
  MONGO_COURSES_COLLECTION: string;
  MONGO_PORT: number;
  MONGO_URL?: string;

};

export type NodeEnvs = "production" | "development" | "test";
export type AppMachineType = "docker" | "local_machine";
