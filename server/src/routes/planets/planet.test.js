const app = require("../../app");
const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Planets API", () => {
  beforeAll(async () => {
    return await mongoConnect();
  });

  afterAll(async () => {
    return await mongoDisconnect();
  });

  describe("Test GET /v1/planets", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
