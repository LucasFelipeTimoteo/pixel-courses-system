import { connect } from "mongoose";
import { appEnv } from "../../../global/env/appEnv/appEnv";
import { pinoLogger } from "../../../global/logger/pino/pinoLogger";

export type MongooseClient = typeof import("mongoose");

export class MongooseService {
  connectionURI = `${appEnv.MONGO_URL || "mongodb://127.0.0.1:27017"}/${this.dbName}`;
  #connection: Promise<MongooseClient>;
  #connectionOptions = {
    autoIndex: appEnv.NODE_ENV !== "production",
  };

  constructor(
    private dbName: string = appEnv.MONGO_DATABASE,
  ) {
    this.#connection = connect(this.connectionURI, this.#connectionOptions);
    this.connect = this.connect.bind(this);
  }

  async connect() {
    const mongoClient = await this.#connection;
    pinoLogger.info("Connected to Mongodb with Mongoose");
    return mongoClient;
  }
}
// export const mongooseClient = new MongooseService().connect()