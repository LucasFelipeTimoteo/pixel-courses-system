import { CourseId } from "../../../../../../../domain/entities/user/value objects/courseId/courseId";
import usersWithCourseFixture from "../../fixtures/usersWithCourseFixture.json";
import { generateCourseReport } from "../../generateCourseReport";

const mockCourseId = new CourseId("6837a88cf6246d98be47bbed");

it("Should have the correct subscriptionsQuantity", () => {
	const courseReport = generateCourseReport(
		usersWithCourseFixture,
		mockCourseId,
	);
	expect(courseReport).toHaveProperty("subscriptionsQuantity", 4);
});

it("Should have the correct subscriptionAverageAge", () => {
	const courseReport = generateCourseReport(
		usersWithCourseFixture,
		mockCourseId,
	);
	expect(courseReport).toHaveProperty("subscriptionAverageAge", 26);
});

it("Should have the correct subscriptionsPerFemaleGender", () => {
	const courseReport = generateCourseReport(
		usersWithCourseFixture,
		mockCourseId,
	);
	expect(courseReport).toHaveProperty("subscriptionsPerFemaleGender", 1);
});

it("Should have the correct subscriptionsPerMaleGender", () => {
	const courseReport = generateCourseReport(
		usersWithCourseFixture,
		mockCourseId,
	);
	expect(courseReport).toHaveProperty("subscriptionsPerMaleGender", 2);
});

it("Should have the correct subscriptionsPerUndefinedGender", () => {
	const courseReport = generateCourseReport(
		usersWithCourseFixture,
		mockCourseId,
	);
	expect(courseReport).toHaveProperty("subscriptionsPerUndefinedGender", 1);
});

it("Should have the correct subscriptionsPerUndefinedGender", () => {
	const courseReport = generateCourseReport(
		usersWithCourseFixture,
		mockCourseId,
	);
	expect(courseReport).toHaveProperty("subscriptionsPerUndefinedGender", 1);
});
