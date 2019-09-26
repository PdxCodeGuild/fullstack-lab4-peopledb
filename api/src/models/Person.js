const mongoose = require("mongoose");

const { Schema } = mongoose;

const personSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;