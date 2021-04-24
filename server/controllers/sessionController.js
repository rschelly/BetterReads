// const session = require('express-session');
const Session = require('../models/sessionModel');
const userController = require('./userController');

const sessionController = {};


/*
 isLoggedIn - find the appropriate session for this request in the 
 database, then verify whether or not the session is still valid.
*/

sessionController.isLoggedIn = (req, res, next) => {
    Session.findOne({
        cookieId: req.cookie.ssid
    })
    .then((response) => {
        if(response === null) res.redirect('/signup');
        else next();
    })
    .catch(() => res.render('/signup'))
}

/**
* startSession - create and save a new Session into the database.
*/

sessionController.startSession = (req, res, next) => {
    Session.create({
        cookieId: res.locals.id
    })
    return next();
};

module.exports = sessionController
