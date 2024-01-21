const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // stores in req.body

// const Persons = require("./models/person");
// const MenuItem = require("./models/menuItem");
app.get("/", (req, res) => {
  res.send("i am at home page");
});

//********* THIS WILL GIVE US AN ERROR BCZ THIS WAY IS NOT LONGER USED/
// app.post("/person", (req, res) => {
//   const data = req.body; //Assuming the request body contains the person data

//   //Create a new Person document using the Mongoose model

//   //directly pass data to the Persons
//   const newPerson = new Persons(data);
//   //or store like this

//   // newPerson.name = data.name;
//   // newPerson.age = data.age;
//   // newPerson.work = data.work;
//   // newPerson.mobile = data.mobile;
//   // newPerson.email = data.email;
//   // newPerson.address = data.email;

//   //save the new person to the database
//   newPerson.save((error, savedPerson) => {
//     if (error) {
//       console.log("Error saving person", error);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       console.log("data saved successfully");
//       //status 200 = ok status
//       res.status(200).json(savedPerson);
//     }
//   });
// });

// app.get("/chicken", (req, res) => {
//   res.send("i want to eat chicken");
// });
// app.get("/daal", (req, res) => {
//   res.send("i want to eat daal");
// });
// app.get("/idli", (req, res) => {
//   res.send("i want to eat idli");
// });

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is started");
});
