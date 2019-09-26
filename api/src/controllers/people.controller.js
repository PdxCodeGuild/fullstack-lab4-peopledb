const { AsyncRouter } = require("express-async-router");
const Person = require("../models/Person");

const router = AsyncRouter();

//
// CRUD routes for the Person resource
//

// List
router.get("/", async (req, res) => {
  const people = await Person.find();

  res.send(people);
});

// Create
router.post("/", async (req, res) => {
  const person = new Person(req.body);

  try {
    await person.save();
  } catch(e) {
    return res.sendStatus(500);
  }

  res.status(201).send(person);
});

// Retrieve
router.get("/:_id", async (req, res) => {
  const person = await Person.findOne({_id: req.params._id});

  // Short circuit the request response cycle!
  if(!person) return res.sendStatus(404);

  res.send(person);
});

// Update
router.patch("/:_id", async (req, res) => {
  const person = await Person.findOne({_id: req.params._id});

  // Short circuit the request response cycle!
  if(!person) return res.sendStatus(404);

  person.set(req.body);
  try {
    await person.save();
  } catch(e) {
    return res.sendStatus(500);
  }

  res.send(person);
});

// Delete
router.delete("/:_id", async (req, res) => {
  const person = await Person.findOne({_id: req.params._id});

  // Short circuit the request response cycle!
  if(!person) return res.sendStatus(404);

  await person.remove();

  res.send(person);
});

module.exports = router;