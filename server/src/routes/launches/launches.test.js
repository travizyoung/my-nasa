const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    return await mongoConnect();
  });

  afterAll(async () => {
    return await mongoDisconnect();
  });

  describe("Test GET /v1/launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 109-01",
      target: "Kepler-62 f",
      launchDate: "January 4, 2025",
    };

    const launchDataWithoutDate = {
      ...completeLaunchData,
      launchDate: undefined,
    };

    const launchDataWithInvalidDate = {
      ...completeLaunchData,
      launchDate: "haha",
    };

    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/);

      expect(response.body).toMatchObject({
        mission: "USS Enterprise",
        rocket: "NCC 109-01",
        target: "Kepler-62 f",
        launchDate: "January 4, 2025",
      });
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Missing required properties.",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Invalid launchDate",
      });
    });
  });
});
