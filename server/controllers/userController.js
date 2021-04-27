const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const db = require("../models/libraryModel");
const userController = {};

/*  getAllUsers middleware =  retrieve all users from the database and store them in res.locals
 */

userController.getAllUsers = (req, res, next) => {
  //search through the user controller object to find all instances of users
  userController.find({}, (err, users) => {
    //handel any errors that arise while searching for users
    if (error)
      return next(
        "Error in userController at getAllUsers middleware: " +
          JSON.stringify(error)
      );
    //if no error, assign res.locals.users to the users parameter
    res.locals.users = users;
    //move on to next middleware;
    return next();
  });
};

/* create user middleware creates a user and saves their info to the database */

userController.createUser = (req, res, next) => {
  //create a new user and store their username and password to the request bosy
  //user.find({}).then(data => console.log(data));
  console.log(req.body.username, req.body.password);
  user
    .create({
      username: req.body.username,
      password: req.body.password,
    },
    (err, newUser) => {
      //if an erorr occurs, redirect back to the sign up page
      if (err) next(err);
      //then take the cookie object id and turn it into a number. Basically change the ugly ssid number into something legible.
      res.locals.username = req.body.username;
      res.locals.id = newUser._id.toHexString();
      return next();
    })
      //then take the cookie object id and turn it into a number. Basically change the ugly ssid number into something legible.
      // .then((response) => {
      //   console.log("inside create user");
      //   console.log(`this is res.locals: ${res.locals}`)
      //     res.locals.username = req.body.username;
      //     res.locals.id = response._doc._id.toHexString();
      //     return next();
      //   })
      //   //if an erorr occurs, redirect back to the sign up page
      //   .catch(() => res.send("error in create user"));
      // },
};

// needs to go after create user //
userController.addToSQL = (req, res, next) => {
  const querySelector = "INSERT INTO users (username) VALUES ($1)";
  const username = [res.locals.username];
  console.log(username)
  db.query(querySelector, username)
    .then((res) => next())
    .catch((err) => console.log(err));
};

/* verifyUser */

userController.verifyUser = (req, res, next) => {
  //see if
  console.log(req.body.username)
  user.findOne({ username: req.body.username },
    (err, response) => {
      console.log('inside first cB')
      if(err) {
        console.log(err.message, 'coming from user Verify');
        res.render("./../client/html-scss/login");
      }
      res.locals.id = response._doc._id.toHexString();
      console.log(response.password);
      bcrypt.compare(req.body.password, response.password, (err, result) => {
        if (result) {
          return next();
        } else {
          return res.redirect("/login");
        }
      });
  })
};

module.exports = userController;

// mongodb+srv://rschelly:mongopassword@cluster0.b5qc7.mongodb.net/BetterReads?retryWrites=true&w=majority
