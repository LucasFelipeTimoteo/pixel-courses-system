import type { NextFunction, Request, Response } from 'express';
import { UserError } from '../../../domain/entities/user/errors/userError';
import { UserId } from '../../../domain/entities/user/value objects/userId/userId';
import { ServerError } from '../../../domain/errors/serverError';
import { usersRepositoryMongoose } from '../../../repository/mongoose/mongooserepository';


export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: "id should be provided to delete an user" });
    }

    const userId = new UserId(id)
    const deletedUser = await usersRepositoryMongoose.deleteUserById(userId)

    if (!deletedUser) {
      return res.status(404).json({ message: `Cannot find user ${id}` });
    }

    return res.status(200).json({ message: `Successfully deleted user ${id}` });
  }
  catch (error) {
    if (!(error instanceof Error)) {
      throw new ServerError("Unexpected server error")
    }

    if (error instanceof UserError) {
      return next(error)
    }

    if (error.name.includes("CastError")) {
      return next(new UserError("Invalid user ID"))
    }

    throw error
  }
};