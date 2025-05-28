import crypto from 'node:crypto';
import userFixture from "../../fixtures/userFixture.json"
import bcrypt from "bcryptjs"
import { appEnv } from '../../../../../src/global/env/appEnv/appEnv';
import { UsersModel, usersSchemaMongoose } from '../../../../../src/services/database/mongoose/model/usersModel';
import { MongooseService } from '../../../../../src/services/database/mongoose/mongooseService';
import mongoose from 'mongoose';

export class MongooseSeeds {
  nonHashedUserPassword: string

  constructor(public defaultUser = userFixture) {
    this.nonHashedUserPassword = defaultUser.password
    const salt = bcrypt.genSaltSync(appEnv.SALT)
    defaultUser.password = bcrypt.hashSync(defaultUser.password, salt)
  }
  mongooseClient = new MongooseService("test_users").connect();
  mongooseSchema = usersSchemaMongoose

  async setupCollection() {
    const randomTestCollectionName = "user_" + crypto.randomBytes(5).toString('hex')
    const usersModel = UsersModel(randomTestCollectionName, this.mongooseSchema)
    await usersModel.create(this.defaultUser)

    return usersModel
  }

  async finishDatabase() {
    const client = await this.mongooseClient
    await client.connection.dropDatabase()
    await client.disconnect()
    await mongoose.connection.close();
  }
}