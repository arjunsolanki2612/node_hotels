const mongoose = require("mongoose");

//Creating Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // the name value cannot be null it is required
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//Creating Person Model
const Persons = mongoose.model("Persons", personSchema);

module.exports = Persons;
