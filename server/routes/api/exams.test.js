const server = require("../../app.js");
const supertest = require("supertest");

describe("Exams endpoints", () => {
    test("GET /api/exams/1 should return one exam", async () => {
        const response = await supertest(server).get("/api/exams/1");
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                url: expect.any(String),
                level: expect.any(String),
                id: expect.any(Number),
                version: expect.any(Number),
                file_path: expect.any(String),
            })
        )
    });
});
