// server.js
const http = require("http");
const { getUsers } = require("./users");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("This is the home page");
  } else if (req.url === "/about") {
    const date = new Date().toISOString();
    const response = {
      Status: "success",
      Message: "response success",
      Description: "Exercise #02",
      Date: date,
    };
    res.statusCode = 200;
    res.end(JSON.stringify(response));
  } else if (req.url === "/users") {
    try {
      const users = await getUsers();
      res.statusCode = 200;
      res.end(JSON.stringify(users));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Failed to fetch users" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
