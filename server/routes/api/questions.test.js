const server = require("../../app.js");
const supertest = require("supertest");

describe("Questions endpoints", () => {
    test("GET /api/questions should return questions", async () => {
        const response = await supertest(server).get("/api/questions");
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(Array.isArray(data)).toBe(true);
        data.forEach(element => {
            expect(element).toEqual(
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

    test("GET /api/questions/1 should return one question", async () => {
        const response = await supertest(server).get("/api/questions/1");
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
        );
    });
});
