import jwt from 'jsonwebtoken';
import request from 'supertest';
import { ExpressApp } from '../../src/app';
import { appEnv } from '../../src/global/env/appEnv/appEnv';
import { MongooseService } from '../../src/services/database/mongoose/mongooseService';
import coursesFixture from "./utils/fixtures/coursesFixture.json";
import userFixture from "./utils/fixtures/userFixture.json";
import { MongooseSeeds } from './utils/seeds/mongoose/mongooseSeeds';
import defaultCourses from '../../src/services/database/mongoose/generateDefaults/generateDefaultCourses/defaultCourses.json'

const conectionPromise = new MongooseService("test_users").connect()
const expressApp = new ExpressApp()
const app = expressApp.exec()
let mongooseSeeds: MongooseSeeds

beforeAll(async () => {
	const connection = await conectionPromise
	mongooseSeeds = new MongooseSeeds(connection)
})

beforeEach(async () => {
	await mongooseSeeds.setupCollection()
})

afterAll(async () => {
	await mongooseSeeds.finishDatabase()
})

describe("User", () => {
	const courseFixture = coursesFixture[1]
	const accessTokenHeader = "X-Pixel-Access-Token"
	const refreshTokenHeader = "X-Pixel-Refresh-Token"
	const validAccessToken = jwt.sign({ userId: userFixture._id }, appEnv.ACCESS_TOKEN_JWT_SECRET)
	const invalidToken = jwt.sign({ userId: userFixture._id }, 'invalidSignature')
	const validUnexistToken = jwt.sign({ userId: "68375b85edf8563b94cb79e4" }, appEnv.ACCESS_TOKEN_JWT_SECRET)
	const validUnexistedId = "683779608824cc9164b88b89"

	describe("POST /register", () => {
		const validRegisteruser = {
			firstName: "John",
			lastName: "Does",
			age: '30',
			gender: "M",
			email: "johnmail@mail.com",
			password: "12345678",
		}
		// HAPPY PATH
		it("Should register a new user successfully and return tokens", async () => {
			await request(app)
				.post("/register")
				.send(validRegisteruser)
				.expect(201)
				.expect((res) => {
					expect(res.body).toHaveProperty("accessToken")
					expect(res.body).toHaveProperty("refreshToken")
				})
		})
		it("Should register a new user successfully and return tokens if optional field [gender] is undefined", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, gender: undefined })
				.expect(201)
				.expect((res) => {
					expect(res.body).toHaveProperty("accessToken")
					expect(res.body).toHaveProperty("refreshToken")
				})
		})
		// UNHAPPY PATH
		it("Should get an error if trying to register and email that already exists", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, email: mongooseSeeds.defaultUser.email })
				.expect(400)
				.expect({ message: 'Email already registered' })
		})

		it("should get an error if firstName is empty string", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, firstName: "" })
				.expect(400)
				.expect({ message: 'firstName is required, but received: ' })

		})
		it("should get an error if firstName length is to short", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, firstName: "s" })
				.expect(400)
				.expect({ message: 'firstName should have a length of at least 2, but received 1 with value: s' })
		})
		it("should get an error if firstName type is incorrect", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, firstName: true })
				.expect(400)
				.expect({ message: 'firstName should be a string, but received: true' })
		})

		it("should get an error if lastName is empty string", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, lastName: "" })
				.expect(400)
				.expect({ message: 'lastName is required, but received: ' })
		})
		it("should get an error if lastName length is to short", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, lastName: "s" })
				.expect(400)
				.expect({ message: 'lastName should have a length of at least 2, but received 1 with value: s' })
		})
		it("should get an error if lastName type is incorrect", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, lastName: true })
				.expect(400)
				.expect({ message: 'lastName should be a string, but received: true' })
		})

		it("should get an error if email length is empty", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, email: "" })
				.expect(400)
				.expect({ message: 'email is required, but received: ' })
		})
		it("should get an error if email is invalid", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, email: "invalidmail" })
				.expect(400)
				.expect({ message: 'email should be valid, but received: invalidmail' })
		})

		it("should get an error if password is empty", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, password: "" })
				.expect(400)
				.expect({ message: 'password is required, but received: ' })
		})
		it("should get an error if password is to short", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, password: "1234567" })
				.expect(400)
				.expect({ message: 'password should have at least 8 characters, but received 7' })
		})
		it("should get an error if password do not have correct type", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, password: 1234567 })
				.expect(400)
				.expect({ message: 'password should be a string, but received: 1234567' })
		})

		it("should get an error if gender is empty", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, gender: "" })
				.expect(400)
				.expect({ message: "gender must be 'F', 'M' or undefined, but received: " })
		})
		it("should get an error if gender is invalid", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, gender: "m" })
				.expect(400)
				.expect({ message: "gender must be 'F', 'M' or undefined, but received: m" })
		})

		it("should get an error if age is empty", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, age: undefined })
				.expect(400)
				.expect({ message: 'Invalid age. It must be a number' })
		})
		it("should get an error if age is empty string", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, age: '' })
				.expect(400)
				.expect({ message: 'Invalid age. It must be a number greater than 6, but received: 0' })
		})
		it("should get an error if age is to short", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, age: '1' })
				.expect(400)
				.expect({ message: 'Invalid age. It must be a number greater than 6, but received: 1' })
		})
		it("should get an error if age is to long", async () => {
			await request(app)
				.post("/register")
				.send({ ...validRegisteruser, age: '201' })
				.expect(400)
				.expect({ message: 'Invalid age. It must be a number less than 200, but received: 201' })
		})

	});

	describe("POST /login", () => {
		const validLogin = {
			email: userFixture.email,
			password: userFixture.password
		}
		// HAPPY PATH
		test('should successfully login an user', async () => {
			await request(app)
				.post('/login')
				.send(validLogin)
				.expect(200)
				.expect(res => {
					expect(res.body).toHaveProperty("accessToken")
					expect(res.body).toHaveProperty("refreshToken")
				})
		})
		// UNHAPPY PATH
		test('should get an error if user email do not exist', async () => {
			await request(app)
				.post('/login')
				.send({ ...validLogin, email: "nonexistentemail@email.com" })
				.expect(400)
				.expect({ message: 'Incorrect email or password' })
		})
		test('should get an error if user password is incorrect', async () => {
			await request(app)
				.post('/login')
				.send({ ...validLogin, password: "incorrectpass" })
				.expect(400)
				.expect({ message: 'Incorrect email or password' })
		})

		it("should get an error if email length is empty", async () => {
			await request(app)
				.post("/login")
				.send({ ...validLogin, email: "" })
				.expect(400)
				.expect({ message: 'email is required, but received: ' })
		})
		it("should get an error if email is invalid", async () => {
			await request(app)
				.post("/login")
				.send({ ...validLogin, email: "invalidmail" })
				.expect(400)
				.expect({ message: 'email should be valid, but received: invalidmail' })
		})

		it("should get an error if password is empty", async () => {
			await request(app)
				.post("/login")
				.send({ ...validLogin, password: "" })
				.expect(400)
				.expect({ message: 'password is required, but received: ' })
		})
		it("should get an error if password is to short", async () => {
			await request(app)
				.post("/login")
				.send({ ...validLogin, password: "1234567" })
				.expect(400)
				.expect({ message: 'password should have at least 8 characters, but received 7' })
		})
		it("should get an error if password do not have correct type", async () => {
			await request(app)
				.post("/login")
				.send({ ...validLogin, password: 1234567 })
				.expect(400)
				.expect({ message: 'password should be a string, but received: 1234567' })
		})

	});

	describe("POST /refresh", () => {
		const validRefreshToken = jwt.sign({ userId: userFixture._id }, appEnv.REFRESH_TOKEN_JWT_SECRET)
		const invalidRefreshToken = jwt.sign({ userId: userFixture._id }, 'invalidSignature')

		// HAPPY PATH
		it("should get a new access token using the refresh token", async () => {
			await request(app)
				.post("/refresh")
				.set(refreshTokenHeader, validRefreshToken)
				.expect(200)
				.expect(res => {
					expect(res.body).toHaveProperty("accessToken")
				})
		})

		//UNHAPPY PATH
		it("should get an error if token is invalid", async () => {
			await request(app)
				.post("/refresh")
				.set(refreshTokenHeader, invalidRefreshToken)
				.expect(400)
				.expect({ message: 'invalid signature' })
		})
		it("should get an error if token is malformed", async () => {
			await request(app)
				.post("/refresh")
				.set(refreshTokenHeader, 'malformed_token')
				.expect(400)
				.expect({ message: 'jwt malformed' })
		})

	});


	describe("DELETE /users", () => {
		const validUnexistedId = "68375b85edf8563b94cb79e4"
		//HAPPY PATH
		it("Should Delete an user", async () => {
			await request(app)
				.delete(`/users/`)
				.set(accessTokenHeader, validAccessToken)
				.expect(200)
				.expect({ message: `Successfully deleted user ${userFixture._id}` })
		})

		// UNHAPPY PATH
		it("Should get an arror if accessToken is not defined", async () => {
			await request(app)
				.delete('/users')
				.expect(400)
				.expect({ message: 'Invalid token' })
		})
		it("Should get an arror if token is invalid", async () => {
			await request(app)
				.delete('/users')
				.set(accessTokenHeader, invalidToken)
				.expect(400)
				.expect({ message: 'invalid signature' })
		})
		it("Should get an arror if userId provided by accessToken not exists", async () => {
			await request(app)
				.delete('/users')
				.set(accessTokenHeader, validUnexistToken)
				.expect(404)
				.expect({ message: 'Cannot find user 68375b85edf8563b94cb79e4' })
		})

	});


	describe("PUT /users", () => {
		//HAPPY PATH
		it("should edit user successfully", async () => {
			const editData = {
				firstName: "Jane",
				lastName: "Smith",
				email: "janesmith2@mail.com",
				password: "newpassword123",
				age: 28,
				gender: "F"
			}
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send(editData)
				.expect(200)
				.expect({ message: `Successfully update user ${userFixture._id}` })
		})
		it("should edit only one field (firstName)", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ firstName: "OnlyName" })
				.expect(200)
				.expect({ message: `Successfully update user ${userFixture._id}` })
		})

		it("should edit password (and hash it)", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ password: "newpassword123" })
				.expect(200)
				.expect({ message: `Successfully update user ${userFixture._id}` })
		})

		// UNHAPPY PATH
		it("should return 400 if accessToken is not provided", async () => {
			await request(app)
				.put("/users")
				.send({ firstName: "Jane" })
				.expect(400)
				.expect({ message: "Invalid token" })
		})

		it("should return 400 if accessToken is invalid", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, invalidToken)
				.send({ firstName: "Jane" })
				.expect(400)
				.expect({ message: "invalid signature" })
		})

		it("should return 404 if userId in token does not exist", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validUnexistToken)
				.send({ firstName: "Jane" })
				.expect(404)
				.expect({ message: "Cannot find user 68375b85edf8563b94cb79e4" })
		})

		it("should return 400 if trying to edit email to one already registered", async () => {
			const otherUser = {
				firstName: "Other",
				lastName: "User",
				age: 25,
				gender: "M",
				email: userFixture.email,
				password: "12345678"
			}

			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ email: otherUser.email })
				.expect(400)
				.expect({ message: "Email already registered" })
		})

		it("should return 400 if firstName is empty", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ firstName: "" })
				.expect(400)
				.expect({ message: "firstName is required, but received: " })
		})

		it("should return 400 if firstName is too short", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ firstName: "A" })
				.expect(400)
				.expect({ message: "firstName should have a length of at least 2, but received 1 with value: A" })
		})

		it("should return 400 if email is invalid", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ email: "invalidmail" })
				.expect(400)
				.expect({ message: "email should be valid, but received: invalidmail" })
		})

		it("should return 400 if password is too short", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ password: "1234567" })
				.expect(400)
				.expect({ message: "password should have at least 8 characters, but received 7" })
		})

		it("should return 400 if gender is invalid", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ gender: "x" })
				.expect(400)
				.expect({ message: "gender must be 'F', 'M' or undefined, but received: x" })
		})

		it("should return 400 if age is too low", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ age: 1 })
				.expect(400)
				.expect({ message: "Invalid age. It must be a number greater than 6, but received: 1" })
		})

		it("should return 400 if age is too high", async () => {
			await request(app)
				.put("/users")
				.set(accessTokenHeader, validAccessToken)
				.send({ age: 201 })
				.expect(400)
				.expect({ message: "Invalid age. It must be a number less than 200, but received: 201" })
		})
	})

	describe("POST /users/courses", () => {
		//HAPPY PATH
		it("Should successfully add a new course to user", async () => {
			await request(app)
				.post("/users/courses")
				.set(accessTokenHeader, validAccessToken)
				.send({ courseId: courseFixture._id })
				// .expect(200)
				.expect({ message: `Successfully added course to user ${userFixture._id}` })
		})

		//UNHAPPY PATH
		it("Should get an error if courseId does not match any course", async () => {
			await request(app)
				.post("/users/courses")
				.set(accessTokenHeader, validAccessToken)
				.send({ courseId: validUnexistedId })
				.expect(404)
				.expect({ message: `course ${validUnexistedId} does not exists` })
		})
		it("Should get an error if courseId is invalid", async () => {
			await request(app)
				.post("/users/courses")
				.set(accessTokenHeader, validAccessToken)
				.send({ courseId: "invalid" })
				.expect(400)
				.expect({ message: "Invalid ID" })
		})
		it("Should get an error if cannot find user id", async () => {
			await request(app)
				.post("/users/courses")
				.set(accessTokenHeader, validUnexistToken)
				.send({ courseId: courseFixture._id })
				.expect(404)
				.expect({ message: 'Cannot find user 68375b85edf8563b94cb79e4' })
		})
		it("Should get an error if user already have the course", async () => {
			await request(app)
				.post("/users/courses")
				.set(accessTokenHeader, validAccessToken)
				.send({ courseId: userFixture.courses[0].courseId })
				.expect(404)
				.expect({ message: `User already has course ${userFixture.courses[0].courseId}` })
		})
	});

	// describe("POST /users/courses/rate", () => {
	// 	//HAPPY PATH
	// 	test('should add rate to user course', async () => {
	// 		await request(app)
	// 			.post("/users/courses/rate")
	// 			.set(accessTokenHeader, validAccessToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				rate: 5
	// 			})
	// 			.expect(200)
	// 			.expect({ message: `Successfully added course rate to user ${userFixture._id}` })
	// 	})
	// 	// UNHAPPY PATH
	// 	test('should get an error if rate if to large', async () => {
	// 		await request(app)
	// 			.post("/users/courses/rate")
	// 			.set(accessTokenHeader, validAccessToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				rate: 6
	// 			})
	// 			.expect(400)
	// 			.expect({ message: 'course rate must be an integer between 0 and 5' })
	// 	})
	// 	test('should get an error if rate if to short', async () => {
	// 		await request(app)
	// 			.post("/users/courses/rate")
	// 			.set(accessTokenHeader, validAccessToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				rate: -2
	// 			})
	// 			.expect(400)
	// 			.expect({ message: 'course rate must be an integer between 0 and 5' })
	// 	})

	// 	test('should get an error if token is invalid', async () => {
	// 		await request(app)
	// 			.post("/users/courses/rate")
	// 			.set(accessTokenHeader, invalidToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				rate: 5
	// 			})
	// 			.expect(400)
	// 			.expect({ message: 'invalid signature' })
	// 	})
	// 	test('should get an error if token is invalid', async () => {
	// 		await request(app)
	// 			.post("/users/courses/rate")
	// 			.set(accessTokenHeader, validUnexistToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				rate: 5
	// 			})
	// 			.expect(404)
	// 			.expect({ message: `Cannot add rate to course ${courseFixture._id}. Maybe user do not have this course` })
	// 	})

	// });

	// describe("POST /users/courses/comment", () => {
	// 	//HAPPY PATH
	// 	test('should add comment to user course', async () => {
	// 		await request(app)
	// 			.post("/users/courses/comment")
	// 			.set(accessTokenHeader, validAccessToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				comment: "nice course, dude!"
	// 			})
	// 			.expect(200)
	// 			.expect({ message: `Successfully added course comment to user ${userFixture._id}` })
	// 	})
	// 	// UNHAPPY PATH
	// 	test('should get an error if comment is an empty string', async () => {
	// 		await request(app)
	// 			.post("/users/courses/comment")
	// 			.set(accessTokenHeader, validAccessToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				comment: ""
	// 			})
	// 			.expect(400)
	// 			.expect({ message: 'comment should be provided' })
	// 	})
	// 	test('should get an error if comment is not a string', async () => {
	// 		await request(app)
	// 			.post("/users/courses/comment")
	// 			.set(accessTokenHeader, validAccessToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				comment: 3
	// 			})
	// 			.expect(400)
	// 			.expect({ message: 'course comment must be a non-empty string' })
	// 	})

	// 	test('should get an error if token is invalid', async () => {
	// 		await request(app)
	// 			.post("/users/courses/comment")
	// 			.set(accessTokenHeader, invalidToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				comment: "nice"
	// 			})
	// 			.expect(400)
	// 			.expect({ message: 'invalid signature' })
	// 	})
	// 	test('should get an error if token is invalid', async () => {
	// 		await request(app)
	// 			.post("/users/courses/comment")
	// 			.set(accessTokenHeader, validUnexistToken)
	// 			.send({
	// 				courseId: courseFixture._id,
	// 				comment: "nice"
	// 			})
	// 			.expect(404)
	// 			.expect({ message: `Cannot add rate to course ${courseFixture._id}. Maybe user do not have this course` })
	// 	})

	// });

	describe("GET /users/courses", () => {
		// HAPPY PATH
		it("should retun user courses", async () => {
			await request(app)
				.get("/users/courses")
				.set(accessTokenHeader, validAccessToken)
				.expect(200)
				.expect(userFixture.courses)
		})

		// UNHAPPY PATH
		test('should get an error if token is invalid', async () => {
			await request(app)
				.get("/users/courses/")
				.set(accessTokenHeader, invalidToken)
				.expect(400)
				.expect({ message: 'invalid signature' })
		})
		test('should get an error if token is valid but userId do not exist', async () => {
			await request(app)
				.get("/users/courses/")
				.set(accessTokenHeader, validUnexistToken)
				.expect(404)
				.expect({ message: 'Cannot find user 68375b85edf8563b94cb79e4' })
		})

	});

	describe("GET /courses", () => {
		//HAPPY PATH
		it("Should return the default courses", async () => {
			await request(app)
			.get('/courses')
			.expect(defaultCourses)
		})
	})

	describe("GET /courses/report", () => {
		//HAPPY PATH
		it("Should return complete relatory for each course", async () => {
			await request(app)
				.get(`/courses/report/${coursesFixture[0]._id}`)
				.set(accessTokenHeader, validAccessToken)
				.expect(200)
				.expect({
					subscriptionsQuantity: 1,
					subscriptionAverageAge: 30,
					subscriptionsPerMaleGender: 1,
					subscriptionsPerFemaleGender: 0,
					subscriptionsPerUndefinedGender: 0
				})
		})

		// UNHAPPY PATH
		test('should get an error if token is invalid', async () => {
			await request(app)
				.get(`/courses/report/${coursesFixture[0]._id}`)
				.set(accessTokenHeader, invalidToken)
				.expect(400)
				.expect({ message: 'invalid signature' })
		})
	});

});