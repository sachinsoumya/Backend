const express = require("express");

const app = express();

// app.use((rq, res) => {
//   res.send("Hello form / route");
// });

// app.use("/test", (req, res) => {
//   console.log(res);

//   res.send("Hello from express");
// });

// app.use("/test/123", (req, res) => {
//   res.send("Hello from route /test/123");
// });

// app.use("/test2", (req, res) => {
//   res.send("Hello from express 2");

// });

// app.use((rq, res) => {
//   res.send("Hello form / route");
// });

// app.use("/test3", (req, res) => {
//   res.send("Hello from express 3");
// });

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Getting the user fromm db");
// });
// app.get("/user/u1", (req, res) => {
//   console.log(req.params);
//   res.send("Getting 2 the user fromm db");
// });

// app.post("/user/:id/:name", (req, res) => {
//     console.log(req.params);
//   res.send("User created successfully");
// });

// app.delete("/user", (req, res) => {
//   res.send("user deleted successfully");
// });

app.use(
  "/",
  (req, res, next) => {
    console.log("This is the request handler 1");
    res.send("Hello from express 1");

    next();
  },
  (req, res) => {
    console.log("This is the request handler 2");
    res.send("Hello from express 2");
  },
);

app.listen(5555, (req, res) => {
  console.log("Server is running on port 5555");
});

// console.log(app);

// console.log(express);
