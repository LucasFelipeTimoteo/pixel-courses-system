import type { UserId } from "../../domain/entities/user/value objects/userId/userId";
import type { User } from "../../domain/interfaces/user/user";
import type { RegisterBody } from "../../handlers/user/register/types";
import { UsersModel } from "../../services/database/mongoose/model/usersModel";

class UsersRepositoryMongoose {
  async register(user: RegisterBody) {
    const newUser: Omit<User, "id"> = { ...user, courses: [] }
    const usersModel = UsersModel()

    const emailAlreadyExists = await usersModel.find({ email: newUser.email })

    if (emailAlreadyExists.length > 0) {
      return { message: "Email already registered" }
    }

    const insertedUser = await usersModel.insertOne(newUser)

    return insertedUser
  }

  async getUserByEmail(userLogin: Pick<User, "email" | "password">) {
    const usersModel = UsersModel()
    const user = await usersModel.findOne({ email: userLogin.email })

    return user
  }

  async deleteUserById(userId: UserId) {
    const userModel = UsersModel()
    const user = await userModel.findByIdAndDelete(userId.value);

    return user
  }
}


export const usersRepositoryMongoose = new UsersRepositoryMongoose()