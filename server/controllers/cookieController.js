const User = require('../models/userModel');

<<<<<<< HEAD
const cookieController = {}
=======
const cookieController = {};
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9

/* use an ssid to store user id in a  cookie */

cookieController.setSSIDCookie = (req, res, next) => {
<<<<<<< HEAD
    User.findOne({
        username: req.body.username
    }, '_id')
    .then((response) => {
        console.log(`Cookie controller: res locals = ${res.locals.id}`);
        res.cookie('SSID', res.locals.id, {httpOnly: true, secure: true});
        return next();
    })
    .catch(() => res.render('./../client/html-scss/signup'))
}

module.exports = cookieController;
=======
  User.findOne(
    {
      username: req.body.username,
    },
    '_id'
  )
    .then((response) => {
      console.log(`Cookie controller: res locals = ${res.locals.id}`);
      res.cookie('SSID', res.locals.id, { httpOnly: true, secure: true });
      return next();
    })
    .catch(() => res.render('./../client/html-scss/signup'));
};

module.exports = cookieController;
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
