import type { CourseId } from "../../../../../domain/entities/user/value objects/courseId/courseId";
import type { User } from "../../../../../domain/interfaces/user/user";

export type UsersWithCourseReport = Pick<
	User,
	"id" | "age" | "gender" | "courses"
>[];

const getAverageAgeReport = (
	usersWithCourse: UsersWithCourseReport,
	subscriptionsQuantity: number,
) => {
	if (subscriptionsQuantity === 0) {
		return 0;
	}

	const rawAverage =
		usersWithCourse.reduce((sum, user) => sum + user.age, 0) /
		subscriptionsQuantity;
	const roudedAverage = Math.round(rawAverage);

	return roudedAverage;
};

export const generateCourseReport = (
	usersWithCourse: UsersWithCourseReport,
	courseId: CourseId,
) => {
	const subscriptionsQuantity = usersWithCourse.length;
	const subscriptionAverageAge = getAverageAgeReport(
		usersWithCourse,
		subscriptionsQuantity,
	);

	const subscriptionsPerMaleGender = usersWithCourse.filter(
		(user) => user.gender === "M",
	).length;
	const subscriptionsPerFemaleGender = usersWithCourse.filter(
		(user) => user.gender === "F",
	).length;
	const subscriptionsPerUndefinedGender = usersWithCourse.filter(
		(user) => !user.gender,
	).length;

	return {
		subscriptionsQuantity,
		subscriptionAverageAge,
		subscriptionsPerMaleGender,
		subscriptionsPerFemaleGender,
		subscriptionsPerUndefinedGender,
	};
};
