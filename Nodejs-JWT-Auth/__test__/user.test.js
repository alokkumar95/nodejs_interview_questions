const request = require("supertest");

const { spinServer, app } = require("../app");
const db = require("../models");

const { sequelize } = db;

let server;
beforeAll((done) => {
  server = spinServer(3001);
  done();
});

afterAll((done) => {
  // Closing the server allows Jest to exit successfully.
  server.close();
  async function close() {
    // Closing the DB connection allows Jest to exit successfully.
    await sequelize.close();
  }
  close();

  done();
});

describe("GET /signup - get signup view page", () => {
  it("response with text/html", async () => {
    // this expect is from supertest
    const response = await request(app)
      .get("/signup")
      .expect("Content-Type", "text/html; charset=utf-8");
    // this expect is from jest
    expect(response.status).toEqual(200);
  });
});

describe("GET /login - get login view page", () => {
  it("response with text/html", async () => {
    // this expect is from supertest
    const response = await request(app)
      .get("/login")
      .expect("Content-Type", "text/html; charset=utf-8");
    // this expect is from jest
    expect(response.status).toEqual(200);
  });
});

describe("POST /signup -- unsuccessfull", () => {
  it("already registered username --", async () => {
    const data = {
      email: "new@email.com",
      password: "1a2b3c",
    };
    const expectedResponse = {
      email: "This username is already taken.",
      password: "",
    };
    const response = await request(app)
      .post("/signup")
      .send(data)
      .set("Accept", "application/json")
      .expect(400);
    expect(response.body.errors).toEqual(expectedResponse);
  });
});

// New user signup with empty email field
describe("POST /signup -- unsuccessfull - non valid email", () => {
  it("New user signup with empty email field", async () => {
    const data = {
      email: "",
      password: "1a2b3c",
    };
    const expectedResponse = {
      email: "Provide Valid email!",
      password: "",
    };

    const response = await request(app)
      .post("/signup")
      .send(data)
      .set("Accept", "application/json")
      .expect(400);

    expect(response.body.errors).toEqual(expectedResponse);
  });
});

// New user signup and then login - edit
describe("POST /signup - successful then POST /login", () => {
  const data = {
    email: "sidhart2@email.com",
    password: "1a2b3c",
  };
  it("Successful user signup", async () => {
    const response = await request(app)
      .post("/signup")
      .send(data)
      .set("Accept", "application/json")
      .expect(201);
    expect(response.body).toEqual(
      expect.objectContaining({ user: expect.any(Number) })
    );
  });

  it("Successful user login", async () => {
    const response = await request(app)
      .post("/login")
      .send(data)
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ user: expect.any(Number) })
    );
  });
});

// login before signup - edit
describe("POST /login - with unregistered user", () => {
  it("unsuccessful user login", async () => {
    const data = {
      email: "ritwik2@email.com",
      password: "1a2b3c",
    };

    const expectedResult = {
      email: "This Email is not registered",
      password: "",
    };
    const response = await request(app)
      .post("/login")
      .send(data)
      .set("Accept", "application/json")
      .expect(400);
    expect(response.body.errors).toEqual(expectedResult);
  });
});

describe('GET /logout',()=>{
  it('logout with 302 status with no cookies',async ()=>{
    const response = await request(app).get("/logout").expect(302);
    expect(response.cookies).toBeUndefined()
  })
})
