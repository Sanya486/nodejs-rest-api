/*
1. Response must hanve status 200
2. Response must have token
3. Response must have object with 2 key: email and subscription with type String
*/

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { DB_HOST } = process.env;

describe("test user authentication", () => {
    let server;

    beforeEach(async () => {
        await mongoose.connect(DB_HOST);
        server = await app.listen(3001, () => {
            console.log("Server running. Use our API on port: 3000");
        });
    });
    afterEach(async () => {
        await mongoose.connection.close();
        server.close();
    });

    test("Response must have status 200", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({ email: "alex@gmail.com", password: "test12345" });
        expect(response.statusCode).toBe(200);
    });
    test("Response must have token", async () => {
        const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
        const response = await request(app)
            .post("/users/login")
            .send({ email: "alex@gmail.com", password: "test12345" });
        expect(typeof response.body.token).toBe("string");
        expect(response.body.token).toMatch(jwtRegex);
    });
    test("Response must have object with 2 key: email and subscription with type String", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({ email: "alex@gmail.com", password: "test12345" });
        expect(typeof response.body.user.email).toBe("string");
        expect(typeof response.body.user.subscription).toBe("string");
    })
});
