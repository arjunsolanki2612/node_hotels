const http = require("http");
const express = require("express");

// clean code than handling everything in node js
const app = express();

app.get("/", (req, res) => {
  return res.send("hello from home page");
});

app.get("/about", (req, res) => {
  return res.send("hello from about page");
});

//short form to create server in express
app.listen(8001, () => console.log("server started"));

// create server in node
// const myServer = http.createServer(app);

// myServer.listen(8001, () => console.log("server started"));
