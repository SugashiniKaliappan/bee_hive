import { PrismaClient } from "@prisma/client";
import { expect } from "chai";
import supertest from "supertest";

const prisma = new PrismaClient();
let app, server;

before(async function () {
    this.timeout(10000); // ✅ Increase timeout to 10 seconds
    const module = await import("../index.js");
    app = module.app;
    server = module.server;

    console.log("DEBUG: Resetting database before tests...");
    await prisma.$connect();
    await prisma.staffDetails.deleteMany();
});

after(async () => {
    await prisma.$disconnect();
    if (server) {
        server.close();
    }
});

// ✅ Database Connection Test
describe("DB Connection", () => {
    it("should connect to the database", async () => {
        await prisma.$connect();
    });
});

// ✅ Register API Test
describe("Register", () => {
    describe("POST /api/v1/auth/register", () => {
        it("should return a token", async () => {
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

            const res = await supertest(app)
                .post("/api/v1/auth/register")
                .send(user);

            console.log("DEBUG: Register Response:", res.body);

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("token");
        });
    });
});

// ✅ Authentication API Test
describe("Authentication", () => {
    describe("POST /api/v1/auth/login", () => {
        it("should return a token", async () => {
            const user = {
                username: "ank2111",
                password: "2ewq1@20",
            };

            console.log("DEBUG: Sending Login Payload:", user);

            const res = await supertest(app)
                .post("/api/v1/auth/login")
                .send(user);

            console.log("DEBUG: Login Response:", res.body);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("token");
        });
    });
});
