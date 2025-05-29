import type { UserEntity } from "../../../domain/entities/user/userEntity";
import type { CourseComment } from "../../../domain/entities/user/value objects/courseComment/courseComment";
import type { CourseRate } from "../../../domain/entities/user/value objects/courseRate/courseRate";
import type { RawUserCourse } from "../../../domain/entities/user/value objects/userCourse/userCourse";
import type { UserId } from "../../../domain/entities/user/value objects/userId/userId";
import type { User } from "../../../domain/interfaces/user/user";
import type { RegisterBody } from "../../../handlers/user/register/types";
import { CoursesModel } from "../../../services/database/mongoose/model/coursesModel";
import { UsersModel } from "../../../services/database/mongoose/model/usersModel";

class UsersRepositoryMongoose {
	async register(user: RegisterBody) {
		const newUser: Omit<User, "id"> = { ...user, courses: [] };
		const usersModel = UsersModel();

		const emailAlreadyExists = await usersModel.find({ email: newUser.email });

		if (emailAlreadyExists.length > 0) {
			return { message: "Email already registered" };
		}

		const insertedUser = await usersModel.insertOne(newUser);

		return insertedUser;
	}

	async getUserByEmail(userLogin: Pick<User, "email" | "password">) {
		const usersModel = UsersModel();
		const user = await usersModel.findOne({ email: userLogin.email });

		return user;
	}

	async deleteUserById(userId: UserId) {
		const userModel = UsersModel();
		const user = await userModel.findByIdAndDelete(userId.value);

		return user;
	}

	async editUser(
		userId: UserId,
		userEdition: Partial<Omit<UserEntity, "id" | "courses">>,
	) {
		const updateData: Partial<Omit<User, "id">> = {};
		const usersModel = UsersModel();

		if (userEdition.firstName !== undefined)
			updateData.firstName = userEdition.firstName.value;
		if (userEdition.lastName !== undefined)
			updateData.lastName = userEdition.lastName.value;
		if (userEdition.password !== undefined)
			updateData.password = userEdition.password.value;
		if (userEdition.age !== undefined) updateData.age = userEdition.age.value;
		if (userEdition.gender !== undefined)
			updateData.gender = userEdition.gender.value;

		if (userEdition.email !== undefined) {
			const emailAlreadyExists = await usersModel.find({
				email: userEdition.email.value,
			});

			if (emailAlreadyExists.length > 0) {
				return { message: "Email already registered" };
			}

			updateData.email = userEdition.email.value;
		}

		const editedUser = await usersModel.findByIdAndUpdate(
			userId.value,
			{ $set: updateData },
			{ new: true },
		);

		return editedUser;
	}

	async getUserCourses(userId: UserId) {
		const usersModel = UsersModel();
		const userCourses = await usersModel.findById(userId.value, { courses: 1, _id: 0 })

		if (!userCourses) {
			return { message: `Cannot find user ${userId.value}` };
		}

		const courses = userCourses.courses || []
		return courses
	}

	async addUserCourse(userId: UserId, courseId: string) {
		const coursesModel = CoursesModel();
		const usersModel = UsersModel();

		const course = await coursesModel.findById(courseId);
		if (!course) {
			return { message: `course ${courseId} does not exists` };
		}

		const user = await usersModel.findById(userId.value, { courses: 1 });
		if (!user) {
			return { message: `Cannot find user ${userId.value}` };
		}
		const alreadyHasCourse = user.courses?.some(
			(c) => c.courseId?.toString() === courseId
		);
		if (alreadyHasCourse) {
			return { message: `User already has course ${courseId}` };
		}

		const userCourses: RawUserCourse = {
			courseId: course._id.toString(),
			name: course.name,
		};
		const added = await usersModel.findOneAndUpdate(
			{ _id: userId.value },
			{
				$push: {
					courses: userCourses,
				},
			},
		);

		if (!added) {
			return { message: `Cannot find user ${userId.value}` };
		}

		return added;
	}

	async addUserCourseRate(userId: UserId, courseId: string, rate: CourseRate) {
		const coursesModel = CoursesModel();
		const usersModel = UsersModel();

		const course = await coursesModel.findById(courseId);
		if (!course) {
			return { message: `course ${courseId} does not exists` };
		}

		const added = await usersModel.findOneAndUpdate(
			{ _id: userId.value },
			{
				$set: {
					"courses.$[elem].rate": rate.value,
				},
			},
			{
				arrayFilters: [{ "elem.courseId": courseId }],
				new: true,
			},
		);

		if (!added) {
			return {
				message: `Cannot add rate to course ${courseId}. Maybe user do not have this course`,
			};
		}

		return added;
	}

	async addUserCourseComment(
		userId: UserId,
		courseId: string,
		comment: CourseComment,
	) {
		const coursesModel = CoursesModel();
		const usersModel = UsersModel();

		const course = await coursesModel.findById(courseId);
		if (!course) {
			return { message: `course ${courseId} does not exists` };
		}

		const added = await usersModel.findOneAndUpdate(
			{ _id: userId.value },
			{
				$set: {
					"courses.$[elem].comment": comment.value,
				},
			},
			{
				arrayFilters: [{ "elem.courseId": courseId }],
				new: true,
			},
		);

		if (!added) {
			return {
				message: `Cannot add rate to course ${courseId}. Maybe user do not have this course`,
			};
		}

		return added;
	}
}

export const usersRepositoryMongoose = new UsersRepositoryMongoose();
