//API.spec.js

const supertest = require("supertest")
const app = require("../../server/server")

describe("GET /api/users", () => {
    it("Usual", async () => {
        const response = await supertest(app).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
    });

    it("Only since", async () => {
        const response = await supertest(app).get("/api/users?per_page=10");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
    });

    it("Only per_page", async () => {
        const response = await supertest(app).get("/api/users?since=5");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
    });

    it("Both since and per_page positives", async () => {
        const response = await supertest(app).get("/api/users?since=5&per_page=10");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
    });

    it("Negative since", async () => {
        const response = await supertest(app).get("/api/users?since=-84");
        expect(response.status).toBe(400);
    });

    it("Negative per_page", async () => {
        const response = await supertest(app).get("/api/users?per_page=-45");
        expect(response.status).toBe(400);
    });
    
    it("Both since and per_page negative", async () => {
        const response = await supertest(app).get("/api/users?since=-1&per_page=-45");
        expect(response.status).toBe(400);
    });
});

describe("GET /api/users/:username/details", () => {
    it("Usual", async () => {
        const response = await supertest(app).get("/api/users/scarpel/details");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
    });

    it("Undefined username", async () => {
        const response = await supertest(app).get("/api/users//details");
        expect(response.status).toBe(400);
    });

    it("Possible inexistent", async () => {
        const response = await supertest(app).get("/api/users/gshcapeI/details");
        expect(response.status).toBe(404);
    });
});

describe("GET /api/users/:username/repos", () => {
    it("Usual", async () => {
        const response = await supertest(app).get("/api/users/scarpel/repos");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
    });

    it("Undefined username", async () => {
        const response = await supertest(app).get("/api/users//repos");
        expect(response.status).toBe(400);
    });

    it("Possible inexistent", async () => {
        const response = await supertest(app).get("/api/users/gshcapeI/repos");
        expect(response.status).toBe(404);
    });
});

describe("GET /api/*", () => {
    it("Anything", async () => {
        const response = await supertest(app).get("/api/sjdjkde*6ew");
        expect(response.status).toBe(400);
    });
});