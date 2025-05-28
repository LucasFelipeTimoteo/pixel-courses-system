import request from 'supertest';
import { ExpressApp } from '../../src/app';
import { MongooseService } from '../../src/services/database/mongoose/mongooseService';
import { MongooseSeeds } from './utils/seeds/mongoose/mongooseSeeds';
import userFixture from "./utils/fixtures/userFixture.json";
import jwt from 'jsonwebtoken'
import { appEnv } from '../../src/global/env/appEnv/appEnv';

const conectionPromise = new MongooseService("test_users").connect()
const app = new ExpressApp().exec()
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
	const accessTokenHeader = "X-Pixel-Access-Token"
	const refreshTokenHeader = "X-Pixel-Refresh-Token"
	const validAccessToken = jwt.sign({ userId: userFixture._id }, appEnv.ACCESS_TOKEN_JWT_SECRET)
	const invalidToken = jwt.sign({ userId: userFixture._id }, 'invalidSignature')
	const validUnexistToken = jwt.sign({ userId: "68375b85edf8563b94cb79e4" }, appEnv.ACCESS_TOKEN_JWT_SECRET)

	// describe("POST /register", () => {
	// 	const validRegisteruser = {
	// 		firstName: "John",
	// 		lastName: "Does",
	// 		age: 30,
	// 		gender: "M",
	// 		email: "johnmail@mail.com",
	// 		password: "12345678",
	// 	}
	// 	// HAPPY PATH
	// 	it("Should register a new user successfully and return tokens", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send(validRegisteruser)
	// 			.expect(201)
	// 			.expect((res) => {
	// 				expect(res.body).toHaveProperty("accessToken")
	// 				expect(res.body).toHaveProperty("refreshToken")
	// 			})
	// 	})
	// 	it("Should register a new user successfully and return tokens if optional field [gender] is undefined", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, gender: undefined })
	// 			.expect(201)
	// 			.expect((res) => {
	// 				expect(res.body).toHaveProperty("accessToken")
	// 				expect(res.body).toHaveProperty("refreshToken")
	// 			})
	// 	})
	// 	// UNHAPPY PATH
	// 	it("Should get an error if trying to register and email that already exists", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, email: mongooseSeeds.defaultUser.email })
	// 			.expect(400)
	// 			.expect({ message: 'Email already registered' })
	// 	})

	// 	it("should get an error if firstName is empty string", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, firstName: "" })
	// 			.expect(400)
	// 			.expect({ message: 'firstName is required, but received: ' })

	// 	})
	// 	it("should get an error if firstName length is to short", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, firstName: "s" })
	// 			.expect(400)
	// 			.expect({ message: 'firstName should have a length of at least 2, but received 1 with value: s' })
	// 	})
	// 	it("should get an error if firstName type is incorrect", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, firstName: true })
	// 			.expect(400)
	// 			.expect({ message: 'firstName should be a string, but received: true' })
	// 	})

	// 	it("should get an error if lastName is empty string", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, lastName: "" })
	// 			.expect(400)
	// 			.expect({ message: 'lastName is required, but received: ' })
	// 	})
	// 	it("should get an error if lastName length is to short", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, lastName: "s" })
	// 			.expect(400)
	// 			.expect({ message: 'lastName should have a length of at least 2, but received 1 with value: s' })
	// 	})
	// 	it("should get an error if lastName type is incorrect", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, lastName: true })
	// 			.expect(400)
	// 			.expect({ message: 'lastName should be a string, but received: true' })
	// 	})

	// 	it("should get an error if email length is empty", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, email: "" })
	// 			.expect(400)
	// 			.expect({ message: 'email is required, but received: ' })
	// 	})
	// 	it("should get an error if email is invalid", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, email: "invalidmail" })
	// 			.expect(400)
	// 			.expect({ message: 'email should be valid, but received: invalidmail' })
	// 	})

	// 	it("should get an error if password is empty", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, password: "" })
	// 			.expect(400)
	// 			.expect({ message: 'password is required, but received: ' })
	// 	})
	// 	it("should get an error if password is to short", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, password: "1234567" })
	// 			.expect(400)
	// 			.expect({ message: 'password should have at least 8 characters, but received 7' })
	// 	})
	// 	it("should get an error if password do not have correct type", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, password: 1234567 })
	// 			.expect(400)
	// 			.expect({ message: 'password should be a string, but received: 1234567' })
	// 	})

	// 	it("should get an error if gender is empty", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, gender: "" })
	// 			.expect(400)
	// 			.expect({ message: "gender must be 'F', 'M' or undefined, but received: " })
	// 	})
	// 	it("should get an error if gender is invalidy", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, gender: "m" })
	// 			.expect(400)
	// 			.expect({ message: "gender must be 'F', 'M' or undefined, but received: m" })
	// 	})

	// 	it("should get an error if age is empty", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, age: undefined })
	// 			.expect(400)
	// 			.expect({ message: 'Invalid age. It must be a number, but received type: undefined' })
	// 	})
	// 	it("should get an error if age is empty string", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, age: '' })
	// 			.expect(400)
	// 			.expect({ message: 'Invalid age. It must be a number, but received type: string' })
	// 	})
	// 	it("should get an error if age is empty string", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, age: '' })
	// 			.expect(400)
	// 			.expect({ message: 'Invalid age. It must be a number, but received type: string' })
	// 	})
	// 	it("should get an error if age is to short", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, age: 1 })
	// 			.expect(400)
	// 			.expect({ message: 'Invalid age. It must be a number greater than 6, but received: 1' })
	// 	})
	// 	it("should get an error if age is to long", async () => {
	// 		await request(app)
	// 			.post("/register")
	// 			.send({ ...validRegisteruser, age: 201 })
	// 			.expect(400)
	// 			.expect({ message: 'Invalid age. It must be a number less than 200, but received: 201' })
	// 	})

	// });

	// describe("POST /login", () => {
	// 	const validLogin = {
	// 		email: userFixture.email,
	// 		password: userFixture.password
	// 	}
	// 	// HAPPY PATH
	// 	test('should successfully login an user', async () => {
	// 		await request(app)
	// 			.post('/login')
	// 			.send(validLogin)
	// 			.expect(200)
	// 			.expect(res => {
	// 				expect(res.body).toHaveProperty("accessToken")
	// 				expect(res.body).toHaveProperty("refreshToken")
	// 			})
	// 	})
	// 	// UNHAPPY PATH
	// 	test('should get an error if user email do not exist', async () => {
	// 		await request(app)
	// 			.post('/login')
	// 			.send({ ...validLogin, email: "nonexistentemail@email.com" })
	// 			.expect(400)
	// 			.expect({ message: 'Incorrect email or password' })
	// 	})
	// 	test('should get an error if user password is incorrect', async () => {
	// 		await request(app)
	// 			.post('/login')
	// 			.send({ ...validLogin, password: "incorrectpass" })
	// 			.expect(400)
	// 			.expect({ message: 'Incorrect email or password' })
	// 	})

	// 	it("should get an error if email length is empty", async () => {
	// 		await request(app)
	// 			.post("/login")
	// 			.send({ ...validLogin, email: "" })
	// 			.expect(400)
	// 			.expect({ message: 'email is required, but received: ' })
	// 	})
	// 	it("should get an error if email is invalid", async () => {
	// 		await request(app)
	// 			.post("/login")
	// 			.send({ ...validLogin, email: "invalidmail" })
	// 			.expect(400)
	// 			.expect({ message: 'email should be valid, but received: invalidmail' })
	// 	})

	// 	it("should get an error if password is empty", async () => {
	// 		await request(app)
	// 			.post("/login")
	// 			.send({ ...validLogin, password: "" })
	// 			.expect(400)
	// 			.expect({ message: 'password is required, but received: ' })
	// 	})
	// 	it("should get an error if password is to short", async () => {
	// 		await request(app)
	// 			.post("/login")
	// 			.send({ ...validLogin, password: "1234567" })
	// 			.expect(400)
	// 			.expect({ message: 'password should have at least 8 characters, but received 7' })
	// 	})
	// 	it("should get an error if password do not have correct type", async () => {
	// 		await request(app)
	// 			.post("/login")
	// 			.send({ ...validLogin, password: 1234567 })
	// 			.expect(400)
	// 			.expect({ message: 'password should be a string, but received: 1234567' })
	// 	})

	// });

	// describe("POST /refresh", () => {
	// 	const validRefreshToken = jwt.sign({ userId: userFixture._id }, appEnv.REFRESH_TOKEN_JWT_SECRET)
	// 	const invalidRefreshToken = jwt.sign({ userId: userFixture._id }, 'invalidSignature')

	// 	// HAPPY PATH
	// 	it("should get a new access token using the refresh token", async () => {
	// 		await request(app)
	// 			.post("/refresh")
	// 			.set(refreshTokenHeader, validRefreshToken)
	// 			.expect(200)
	// 			.expect(res => {
	// 				expect(res.body).toHaveProperty("accessToken")
	// 			})
	// 	})

	// 	//UNHAPPY PATH
	// 	it("should get an error if token is invalid", async () => {
	// 		await request(app)
	// 			.post("/refresh")
	// 			.set(refreshTokenHeader, invalidRefreshToken)
	// 			.expect(400)
	// 			.expect({ message: 'invalid signature' })
	// 	})
	// 	it("should get an error if token is malformed", async () => {
	// 		await request(app)
	// 			.post("/refresh")
	// 			.set(refreshTokenHeader, 'malformed_token')
	// 			.expect(400)
	// 			.expect({ message: 'jwt malformed' })
	// 	})

	// });


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

	// describe("PUT /users?id", () => {
	// 	// HAPPY PATH
	// 	it("should edit all user info successfully", async () => {
	// 		await request(app)
	// 			.put(`/users/?=${userFixture._id}`)
	// 			.
	// 	})
	// });

});