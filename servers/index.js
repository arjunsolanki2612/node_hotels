//creating server
const http = require("http");
const fs = require("fs");
const url = require("url");
// const formattedUrl = url.format({
//   protocol: "https:",
//   hostname: "www.example.com",
//   pathname: "/path/to/resource",
//   query: { param1: "value1", param2: "value2" },
// });

// console.log("Formatted URL:", formattedUrl);
//creating a server

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} : ${req.method} ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url, true);
  // console.log(myUrl);
  //non blocking operation
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("Homepage");

        break;
      case "/about":
        const username = myUrl.query.name;
        const id = myUrl.query.userId;
        res.end(`Hi ${username}, ${id}`);
        break;
      default:
        res.end("404 Not Found");
    }
    // res.end("hello from server");
  });
  // console.log(req);
  // console.log("new req rec.");
});

// server listen to this post number
myServer.listen(8000, () => console.log("server started..."));
