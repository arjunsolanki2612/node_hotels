const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // stores in req.body

// const MenuItem = require("./models/menuItem");

//Middleware function
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()}}`);
  next(); //move on to the next phase
};
//to use this middleware on all the routes
app.use(logRequest);

//Password and username authentication

//to authenticate routes
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is started");
});
