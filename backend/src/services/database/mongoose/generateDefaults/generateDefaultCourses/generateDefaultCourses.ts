import { CoursesModel } from "../../model/coursesModel";
import defaultCourses from "./defaultCourses.json";

export const generateDefaultCourses = async () => {
	const cousesModel = CoursesModel();
	await cousesModel.deleteMany({});
	await cousesModel.insertMany(defaultCourses);
};
