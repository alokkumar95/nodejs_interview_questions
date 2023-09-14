const request = require("supertest");

const {spinServer,app} = require("../app");
const db = require("../models")

const {sequelize} = db;

let server;
beforeAll(done => {
    server = spinServer(3001);
    done()
  })
  
  afterAll( (done) =>  {
    // Closing the server allows Jest to exit successfully.
     server.close()
     async function close(){
      // Closing the DB connection allows Jest to exit successfully.
        await sequelize.close()
     }
     close();
     
    done()
  })

describe("GET /signup - get signup page", () => {
  it("response with text/html", async () => {
    // this expect is from supertest
    const response = await request(app).get("/signup").expect("Content-Type","text/html; charset=utf-8")
    // this expect is from jest
    expect(response.status).toEqual(200);
  });
});


