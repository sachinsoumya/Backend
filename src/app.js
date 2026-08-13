const express = require("express");

const app = express();

app.use((rq, res) => {
  res.send("Hello form / route");
});

app.use("/test", (req, res) => {
  console.log(res);

  res.send("Hello from express");
});

app.use("/test/123", (req, res) => {
  res.send("Hello from route /test/123");
});

app.use("/test2", (req, res) => {
  res.send("Hello from express 2");

  //   req.body = {
  //     name: "john",
  //   };

  //   console.log(req);
});

app.use((rq, res) => {
  res.send("Hello form / route");
});

app.use("/test3", (req, res) => {
  res.send("Hello from express 3");
});

app.listen(5555, (req, res) => {
  console.log("Server is running on port 5555");
});

// console.log(app);

// console.log(express);
