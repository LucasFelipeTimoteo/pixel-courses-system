import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
// import crypto from 'node:crypto';
import { appEnv } from '../../../../../src/global/env/appEnv/appEnv';
import { UsersModel, usersSchemaMongoose } from '../../../../../src/services/database/mongoose/model/usersModel';
import userFixture from "../../fixtures/userFixture.json";

export class MongooseSeeds {
  nonHashedUserPassword: string

  constructor(public client: typeof mongoose, public defaultUser = userFixture) {
    this.nonHashedUserPassword = defaultUser.password
    const salt = bcrypt.genSaltSync(appEnv.SALT)
    defaultUser.password = bcrypt.hashSync(defaultUser.password, salt)
  }
  mongooseSchema = usersSchemaMongoose


  async setupCollection() {
    await this.client.connection.dropDatabase()
    // const randomTestCollectionName = "user_test_" + crypto.randomBytes(5).toString('hex')
    const usersModel = UsersModel(this.mongooseSchema)
    await usersModel.create(this.defaultUser)

    return usersModel
  }

  async finishDatabase() {
    await this.client.disconnect()
    await mongoose.connection.close();
  }
}