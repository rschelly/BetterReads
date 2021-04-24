const db = require('../models/libraryModel');

const libraryController = {};

// TO DO!
<<<<<<< HEAD
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
=======
// Somehow get user ID? Cookie maybe? Ensure user is being added to sql db when being created
// Decide how to return results to front end

libraryController.getToBeRead = (req, res, next) => {
  const querySelector = `SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id WHERE status = 'to be read' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id

  const tbrResults = db.query(querySelector, userID);
  tbrResults
    .then((data) => {
      console.log(data.rows);
      // decide how results are being returned to front end?
      next();
    })
    .catch((err) => {
      return next({
        log:
          'libraryController.getToBeRead: ERROR: Error getting list from database',
        message: {
          err:
            'Error occurred in libraryController.getToBeRead. Check server logs for more details',
        },
      });
    });
};

libraryController.getCurrentlyReading = (req, res, next) => {
  const querySelector = `SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id WHERE status = 'in progress' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id

  const currentResults = db.query(querySelector, userID);
  currentResults
    .then((data) => {
      console.log(data.rows);
      // decide how results are being returned to front end?
      next();
    })
    .catch((err) => {
      return next({
        log:
          'libraryController.getCurrentlyReading: ERROR: Error getting list from database',
        message: {
          err:
            'Error occurred in libraryController.getCurrentlyReading. Check server logs for more details',
        },
      });
    });
};

libraryController.getCompleted = (req, res, next) => {
  const querySelector = `SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id WHERE status = 'completed' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id

  const completedResults = db.query(querySelector, userID);
  completedResults
    .then((data) => {
      console.log(data.rows);
      // decide how results are being returned to front end?
      next();
    })
    .catch((err) => {
      return next({
        log:
          'libraryController.getToBeRead: ERROR: Error getting list from database',
        message: {
          err:
            'Error occurred in libraryController.getToBeRead. Check server logs for more details',
        },
      });
    });
};

module.exports = libraryController;
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
