import type { User } from "../../domain/interfaces/user/user";
import type { RegisterBody } from "../../handlers/user/register/types";
import { UsersModel } from "../../services/database/mongoose/model/usersModel";
import { mongooseClient } from "../../services/database/mongoose/mongooseService";

class UsersRepositoryMongoose {
  client = mongooseClient

  async register(user: RegisterBody) {
    const newUser: Omit<User, "id"> = { ...user, courses: [] }
    const usersModel = UsersModel()
    const insertedUser = await usersModel.insertOne(newUser)

    return insertedUser
  }

  async login() { }
}


export const usersRepositoryMongoose = new UsersRepositoryMongoose()