const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
const sessionController = require("./controllers/sessionController");
//note from kerri - commented out session controller temp due to node errors


const app = express();
const PORT = 3000;

const mongoURI = "mongodb+srv://rschelly:mongopassword@cluster0.b5qc7.mongodb.net/betterreads?retryWrites=true&w=majority"
mongoose.connect(mongoURI);
const  { connection } = mongoose

connection.once("open", () => {
  console.log('connected to mongoose using once')
})


const apiRouter = require('./api/api_router.js');
const libraryRouter = require('./api/libraryRouter.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, './client/html-scss')));

app.get("/", (req, res) => {
    res.redirect((path.join(__dirname, "../client/html-scss/login")));
})
// note from kerri - commented out cookieController.setCookie temp due to node errors

app.post("/signup", userController.createUser, (req, res) => {
  // what should happen here on successful sign up?
  res.send("new user created");
});

// userController.createUser, cookieController.setSSIDCookie, sessionController.startSession,

// app.get("/login", (res, req) => {
//   console.log('login')
//   res.sendFile(path.resolve(__dirname, "../client/html-scss/login.html"));
//   console.log('login after')
// })

app.post("/login", cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  
  res.send("successful login");
});

// -userController.verifyUser, +cookieController.setSSIDCookie,  +sessionController.startSession

app.get("/home", userController.getAllUsers, sessionController.isLoggedIn, (req, res) => {
  /**
   * The previous middleware has populated `res.locals` with users
   * which we will pass this in to the res.render so it can generate
   * the proper html from the `secret.ejs` template
   */
  res.render("./../client/home");
  //, { users: res.locals.users });
});


// app.use('/api', apiRouter)
app.use('/db', libraryRouter);

// catch all for requests to unknown route

app.use("*", (req, res) => res.status(400).send('Page Not Found'));

// global error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
