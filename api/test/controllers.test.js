const chai = require("chai");

const Person = require("../src/models/Person");
const { app } = require("../src/server");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const { expect } = chai;

const makePerson = async () => {
  const person = new Person({
    firstName: "Mike",
    lastName: "Zentz",
    username: "moikzentz",
    age: 311
  })

  await person.save();

  return person;
}

describe("People CRUD controller", () => {
  afterEach(async () => {
    await Person.deleteMany({});
  });

  it("GET /: Shows all people", async () => {
    let response = await chai
      .request(app)
      .get("/people");

    expect(response.body.length).to.eq(0);

    await makePerson();
    response = await chai
      .request(app)
      .get("/people");

    expect(response.body.length).to.eq(1);
  });

  it("POST /: Create a person", async () => {
    let response = await chai
      .request(app)
      .post("/people")
      .send({
        firstName: "Carl",
        lastName: "Johnson",
        username: "bellatrix",
        age: 12
      });

    expect(response.status).to.eq(201);

    response = await chai
      .request(app)
      .post("/people")
      .send({
        firstName: "Carl",
        lastName: "Johnson",
        username: "bellatrix",
        age: 12
      });

    expect(response.status).to.eq(500);
  });

  it("GET /:_id: Get a specific person", async () => {
    let response = await chai
      .request(app)
      .get(`/people/${new ObjectId()}`);

    expect(response.status).to.eq(404);

    const person = await makePerson();
    response = await chai
      .request(app)
      .get(`/people/${person._id}`);

    expect(response.status).to.eq(200);
  });

  it("PATCH /:_id: Update a specific person", async () => {
    let response = await chai
      .request(app)
      .patch(`/people/${new ObjectId()}`);

    expect(response.status).to.eq(404);

    const person = await makePerson();
    response = await chai
      .request(app)
      .patch(`/people/${person._id}`)
      .send({
        lastName: "Zintz",
      });

    expect(response.status).to.eq(200);
    expect(response.body.lastName).to.eq("Zintz");
  });

  it("DELETE /:_id: Delete a specific person", async () => {
    let response = await chai
      .request(app)
      .delete(`/people/${new ObjectId()}`);

    expect(response.status).to.eq(404);

    const person = await makePerson();
    response = await chai
      .request(app)
      .delete(`/people/${person._id}`);

    expect(response.status).to.eq(200);
  });
});