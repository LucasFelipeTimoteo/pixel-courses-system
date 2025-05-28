import request from 'supertest'
import { ExpressApp } from '../../src/app'
import { MongooseSeeds } from './utils/seeds/mongoose/mongooseSeeds'

const app = new ExpressApp().exec()
const mongooseSeeds = new MongooseSeeds()

beforeEach(async () => {
	await mongooseSeeds.setupCollection();
})

afterAll(async () => {
	await mongooseSeeds.finishDatabase()
})

describe("User", () => {

	describe("POST /register", () => {
		const validRegisteruser = {
			firstName: "John",
			lastName: "Does",
			age: 30,
			gender: "M",
			email: "johnmain@mail.com",
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
		// UNHAPPY PATH
		// it("should send an erro if firstName is invalid", async () => {
		// 	await request(app)
		// 		.post("/register")
		// 		.send({ ...validRegisteruser, firstName: "" })
		// 		.expect(201)

		// })

	});

})