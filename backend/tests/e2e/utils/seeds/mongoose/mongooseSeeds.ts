// import crypto from 'node:crypto';
// import userFixture from '../../fixtures/userFixture.json'

// export class MongooseSeeds {
//   nonHashedUserPassword: string

//   constructor(public defaultUser = userFixture) {
//     this.nonHashedUserPassword = defaultUser.password
//     const salt = hashPassword.genSaltSync(Number(appEnv.salt))
//     defaultUser.password = hashPassword.hashSync(defaultUser.password, salt)
//   }
//   mongooseClient = new MongooseService(pinoLogger, "test_usersService").connect();
//   mongooseSchema = usersSchemaMongoose

//   async configCollectionAndGetModel() {
//     const randomTestCollectionName = "user_" + crypto.randomBytes(5).toString('hex')
//     const usersModel = UsersModel(randomTestCollectionName, this.mongooseSchema)
//     await usersModel.create(this.defaultUser)

//     return usersModel
//   }

//   async finishDatabase() {
//     const client = await this.mongooseClient
//     await client.connection.dropDatabase()
//     await client.disconnect()
//   }
// }