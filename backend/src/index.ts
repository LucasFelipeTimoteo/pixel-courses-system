import { ExpressApp } from "./app";
import { appEnv } from "./global/env/appEnv/appEnv";
import { pinoLogger } from "./global/logger/pino/pinoLogger";
import { MongooseService } from "./services/database/mongoose/mongooseService";


const expressApp = new ExpressApp()
const app = expressApp.exec()

const mongooseClient = new MongooseService().connect()
mongooseClient
  .then(client => {
    app.listen(appEnv.PORT, () => pinoLogger.info(`Running server on port ${appEnv.PORT}`))
  })
  .catch(err => { throw err })