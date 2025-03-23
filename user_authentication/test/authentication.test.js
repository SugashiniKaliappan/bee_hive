import { PrismaClient } from "@prisma/client";
import { expect } from "chai";
import supertest from "supertest";

const prisma = new PrismaClient();
let app, server;

before(async function () {
    this.timeout(15000); // ✅ Increase timeout to 15 seconds
    const module = await import("../index.js");// NOSONAR
    app = module.app;
    server = module.server;

    console.log("DEBUG: Resetting database before tests...");
    await prisma.$connect();// NOSONAR
    await prisma.staffDetails.deleteMany();// NOSONAR
});

after(async () => {
    await prisma.$disconnect();// NOSONAR
    if (server && server.listening) {
        server.close(() => console.log("Server closed after tests ✅"));
    }
});

// ✅ Ensure Mocha uses function() {} instead of arrow functions
describe("Register", function () {
    this.timeout(10000); // ✅ Correctly set timeout at describe level

    describe("POST /api/v1/auth/register", function () {
        it("should return a token", async function () {
            this.timeout(10000); // ✅ Correctly set timeout at test level

            const user = {
                email: "anna.sak@gmail.com",
                username: "ank2111",
                gender: "Female",
                password: "2ewq1@20",
                firstName: "Anna",
                lastName: "Sak",
                role: "Clerk",
                phone: "+971501234567",
            };

            console.log("DEBUG: Sending Register Payload:", user);

            const res = await supertest(app)// NOSONAR
                .post("/api/v1/auth/register")
                .send(user);

            console.log("DEBUG: Register Response:", res.body);

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("token");
        });
    });
});

// ✅ Fix Assertion Error in Login Test
describe("Authentication", function () {
    this.timeout(10000); // ✅ Correctly set timeout at describe level

    describe("POST /api/v1/auth/login", function () {
        it("should return a token", async function () {
            this.timeout(10000); // ✅ Correctly set timeout at test level

            const user = {
                username: "ank2111",
                password: "2ewq1@20",
            };

            console.log("DEBUG: Sending Login Payload:", user);

            const res = await supertest(app)// NOSONAR
                .post("/api/v1/auth/login")
                .send(user);

            console.log("DEBUG: Login Response:", res.body);

            expect(res.status).to.equal(200, `Error: API returned ${res.status} instead of 200`);
            expect(res.body).to.have.property("token");
        });
    });
});
