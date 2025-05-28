import type { UserEntity } from "../../domain/entities/user/userEntity";
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

  async editUser(userId: UserId, userEdition: Partial<Omit<UserEntity, "id" | "courses">>) {
    const updateData: Partial<Omit<User, "id">> = {};
    const usersModel = UsersModel()


    if (userEdition.firstName !== undefined)
      updateData.firstName = userEdition.firstName.value;
    if (userEdition.lastName !== undefined)
      updateData.lastName = userEdition.lastName.value;
    if (userEdition.password !== undefined)
      updateData.password = userEdition.password.value;
    if (userEdition.age !== undefined)
      updateData.age = userEdition.age.value;
    if (userEdition.gender !== undefined)
      updateData.gender = userEdition.gender.value;

    if (userEdition.email !== undefined) {
      const emailAlreadyExists = await usersModel.find({ email: userEdition.email.value })

      if (emailAlreadyExists.length > 0) {
        return { message: "Email already registered" }
      }

      updateData.email = userEdition.email.value;
    }

    const editedUser = await usersModel.findByIdAndUpdate(
      userId.value,
      { $set: updateData },
      { new: true }
    );

    return editedUser
  }
}


export const usersRepositoryMongoose = new UsersRepositoryMongoose()