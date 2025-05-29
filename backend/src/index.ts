import { ExpressApp } from "./app";
import { appEnv } from "./global/env/appEnv/appEnv";
import { pinoLogger } from "./global/logger/pino/pinoLogger";
import { MongooseService } from "./services/database/mongoose/mongooseService";

async function bootstrap() {
  try {
    await new MongooseService().connect();

    const expressApp = new ExpressApp();
    await expressApp.generateDefaultData();
    const app = expressApp.exec();

    app.listen(appEnv.PORT, () => pinoLogger.info(`Running server on port ${appEnv.PORT}`));
  } catch (err) {
    pinoLogger.error(err);
    process.exit(1);
  }
}

bootstrap();