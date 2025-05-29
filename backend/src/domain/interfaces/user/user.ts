import type { RawUserCourse } from "../../entities/user/value objects/userCourse/userCourse";

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	password: string;
	gender?: string;
	courses?: RawUserCourse[];
};
