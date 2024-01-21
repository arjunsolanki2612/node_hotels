const express = require("express");
const router = express.Router();
const Persons = require("./../models/person");
//POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Persons(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// **** GET METHOD TO GET THE PERSON
router.get("/", async (req, res) => {
  try {
    const data = await Persons.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// if we want to get the specific information about chef, waiter or the manager we use parameterized API call
// :workType --> colon makes it a variable so that it can hold anything
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work type from the URL parameter

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Persons.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract id from the url parameter
    const updatedPersonData = req.body; //updated data for the person

    const response = await Persons.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // run mongoose valiation (all the required fields)
      }
    );

    // 2nd possibility if we dont find any document of that id
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract id from the url parameter

    const response = await Persons.findByIdAndDelete(personId);

    // 2nd possibility if we dont find any document of that id
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleter");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
