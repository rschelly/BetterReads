const db = require('../models/libraryModel');

const libraryController = {};

// TO DO!
// Somehow get user ID? Cookie maybe? Ensure user is being added to sql db when being created 
// Decide how to return results to front end

libraryController.getToBeRead = (req, res, next) => {
  const querySelector = `SELECT * FROM book_list WHERE user_id = $1 AND status = 'to be read'`
  const userID = 'userID' // needs updated to reflect real user id

  const tbrResults = db.query(querySelector, userID);
  tbrResults.then(data => {
    console.log(data)
    // decide how results are being returned to front end? 
    next()
  }).catch(err => {
    return next({
      log: 'libraryController.getToBeRead: ERROR: Error getting list from database',
      message: {
        err: 'Error occurred in libraryController.getToBeRead. Check server logs for more details'
      }
    })
  })
}

libraryController.getCurrentlyReading = (req, res, next) => {
  const querySelector = `SELECT * FROM book_list WHERE user_id = $1 AND status = 'in progress'`
  const userID = 'userID' // needs updated to reflect real user id

  const currentResults = db.query(querySelector, userID);
  currentResults.then(data => {
    console.log(data)
    // decide how results are being returned to front end?
    next()
  }).catch(err => {
    return next({
      log: 'libraryController.getCurrentlyReading: ERROR: Error getting list from database',
      message: {
        err: 'Error occurred in libraryController.getCurrentlyReading. Check server logs for more details'
  }
})
  })
}

libraryController.getCompleted = (req, res, next) => {
  const querySelector = `SELECT * FROM book_list WHERE user_id = 1 AND status = 'completed'`
  const userID = 'userID' // needs updated to reflect real user id

  const completedResults = db.query(querySelector, userID);
  completedResults.then(data => {
    console.log(data);
    // decide how results are being returned to front end?
    next();
  }).catch(err => {
    return next({
      log: 'libraryController.getToBeRead: ERROR: Error getting list from database',
      message: {
        err: 'Error occurred in libraryController.getToBeRead. Check server logs for more details'
      }
    })
  })
}



module.exports = libraryController;