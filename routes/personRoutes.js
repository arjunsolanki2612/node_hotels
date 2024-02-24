const express = require("express");
const router = express.Router();
const Persons = require("./../models/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
//POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //Create a new Person document using the Mongoose model
    const newPerson = new Persons(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log("Token is: ", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//Login route

router.post("/login", async (req, res) => {
  try {
    //Extract username and password from request body
    const { username, password } = req.body;

    //Find the user by username
    const user = await Persons.findOne({ username: username });

    //If user does not exist or password does not match, return error

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username of password" });
    }
    //generate token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    //return token as response;
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// **** GET METHOD TO GET THE PERSON and Giving this route authentication
router.get("/", jwtAuthMiddleware, async (req, res) => {
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

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data", userData);
    const userId = userData.id;
    const user = await Persons.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
