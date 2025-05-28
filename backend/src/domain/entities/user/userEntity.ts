import { UserAge } from "./value objects/userAge/userAge";
import { type Course, UserCourse } from "./value objects/userCourse/userCourse";
import { UserEmail } from "./value objects/userEmail/userEmail";
import { UserFirstName } from "./value objects/userFirstName/userFirstName";
import { UserGender } from "./value objects/userGender/userGender";
import type { userId } from "./value objects/userId/userId";
import { UserLastName } from "./value objects/userLastName/userLastName";
import { UserPassword } from "./value objects/userPassword/userPassword";

export class userEntity {
	id: userId;
	firstName: UserFirstName;
	lastName: UserLastName;
	email: UserEmail;
	age: UserAge;
	password: UserPassword;
	gender?: UserGender;
	courses?: UserCourse[];

	constructor(
		id: string,
		firstName: string,
		lastName: string,
		email: string,
		age: number,
		password: string,
		gender?: string,
		courses?: Course[],
	) {
		this.id = new UserId(id);
		this.firstName = new UserFirstName(firstName);
		this.lastName = new UserLastName(lastName);
		this.email = new UserEmail(email);
		this.password = new UserPassword(password);
		this.gender = new UserGender(gender);
		this.age = new UserAge(age);
		this.courses = courses?.map((course) => new UserCourse(course));
	}
}
