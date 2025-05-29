import type { CourseId } from "../../../domain/entities/user/value objects/courseId/courseId";
import { UsersModel } from "../../../services/database/mongoose/model/usersModel";

export class CoursesRepositoryMongoose {
	async getCourseRelatory(courseId: CourseId) {
		const usersModel = UsersModel();
		const usersWithCourse = await usersModel.find(
			{
				courses: {
					$elemMatch: { courseId: courseId.value },
				},
			},
			{ age: 1, gender: 1, courses: 1 },
		);

		if (usersWithCourse.length === 0) {
			return { message: `Cannot find an user with course ${courseId.value}` };
		}

		return usersWithCourse;
	}
}

export const coursesRepositoryMongoose = new CoursesRepositoryMongoose();
