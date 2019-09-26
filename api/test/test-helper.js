process.env.ENV = "test";

const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { connectDatabase } = require("../src/server");

chai.use(chaiHttp);

setTimeout(() => {
  before(async function() {
    this.database = await connectDatabase("lab4-peopledb-test");
  });

  after(async function() {
    await this.database.connection.dropDatabase();
    await this.database.connection.close();
  });
});