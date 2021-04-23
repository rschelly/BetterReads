const User = require('../models/userModel');

const cookieController = {};

/* use an ssid to store user id in a  cookie */

cookieController.setSSIDCookie = (req, res, next) => {
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
