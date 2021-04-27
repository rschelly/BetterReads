const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const userController = require("./controllers/userController");
// const cookieController = require("./controllers/cookieController");
// const sessionController = require("./controllers/sessionController");

const app = express();
const PORT = 3000;

//mongo database log in: username: rschelly, password: mongopassword
const mongoURI =
  "mongodb+srv://rschelly:mongopassword@cluster0.b5qc7.mongodb.net/BetterReads?retryWrites=true&w=majority";
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
const { connection } = mongoose;

connection.once("open", () => {
  console.log("connected to mongoose using once");
});

const apiRouter = require("./api/api_router.js");
const libraryRouter = require("./api/libraryRouter.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/home");
});

//paths for static files
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../html-scss/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../html-scss/signup.html"));
});

//signup and login paths
app.post(
  "/signup",
  userController.createUser,
  userController.addToSQL,
  (req, res) => {
    console.log("clicked signup button");
    res.redirect("/home");
    //res.sendFile(path.join(__dirname, "../html-scss/index.html"));
  }
);

app.post("/login", userController.verifyUser, (req, res) => {
  console.log("clicked login button");
  res.redirect("/home");
  //res.sendFile(path.join(__dirname, "../html-scss/index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../html-scss/index.html"));
});

//router paths
app.use("/api/", apiRouter);

app.use("/db/", libraryRouter);

//signup and login paths
// app.post(
//   "/signup",
//   userController.createUser,
//   userController.addToSQL,
//   (req, res) => {
//     res.redirect("/home");
//   }
// );

// app.post("/login", userController.verifyUser, (req, res) => {
//   res.redirect("home");
// });

// catch all for requests to unknown route

app.use("*", (req, res) => res.status(400).send("Page Not Found"));

// global error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
