const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PeopleController = require("./controllers/people.controller");

// Express application
const app = express();

// Middleware
app.use(cors());
/* istanbul ignore if */
if(process.env.ENV !== "test") app.use(morgan("tiny"));
app.use(express.json());

// Controllers
app.use("/people", PeopleController);

// Helper functions
const connectDatabase = async (databaseName="lab4-peopledb") => {
  const database = await mongoose.connect(
    `mongodb://localhost/${databaseName}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  );

  return database;
}
const startServer = (port=8000, host="localhost") => {
  app.listen(port, host, async () => {
    await connectDatabase();

    console.log(`Listening at ${host}:${port}...`);
  })
}

module.exports = {
  app,
  connectDatabase,
  startServer,
};