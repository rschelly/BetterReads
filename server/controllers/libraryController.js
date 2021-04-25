const db = require('../models/libraryModel');

const libraryController = {};

// TO DO!
// Somehow get user ID? Cookie maybe? Ensure user is being added to sql db when being created
// Decide how to return results to front end

libraryController.getToBeRead = (req, res, next) => {
  const querySelector = `
  SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn 
  FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id 
  WHERE status = 'to be read' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id
  const tbrResults = db.query(querySelector, userID);
  tbrResults
    .then((data) => {
      res.locals.toberead = data;
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
  const querySelector = `
  SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn, book_list.page_number 
  FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id 
  WHERE status = 'in progress' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id

  const currentResults = db.query(querySelector, userID);
  currentResults.then((data) => {
    res.locals.current = data;
    // decide how results are being returned to front end?
    next();
  });
  // .catch((err) => {
  //   return next({
  //     log:
  //       'libraryController.getCurrentlyReading: ERROR: Error getting list from database',
  //     message: {
  //       err:
  //         'Error occurred in libraryController.getCurrentlyReading. Check server logs for more details',
  //     },
  //   });
  // });
};

libraryController.getCompleted = (req, res, next) => {
  const querySelector = `
  SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn 
  FROM "book_list" 
  INNER JOIN "books" 
  ON book_list.book_id = books._id 
  WHERE status = 'completed' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id

  const completedResults = db.query(querySelector, userID);
  completedResults
    .then((data) => {
      res.locals.complete = data;
      // decide how results are being returned to front end?
      next();
    })
    .catch((err) => {
      return next({
        log:
          'libraryController.getCompleted: ERROR: Error getting list from database',
        message: {
          err:
            'Error occurred in libraryController.getCompleted. Check server logs for more details',
        },
      });
    });
};

libraryController.getRatings = (req, res, next) => {
  const querySelector = `SELECT *
  FROM "review_list"
  INNER JOIN "books"
  ON review_list.book_id = books._id 
  WHERE review_list.user_id = $1`;
  const userID = ['1'];

  const ratingsResults = db.query(querySelector, userID).then((data) => {
    res.locals.ratings = data;
    next();
  });
};

libraryController.addToTBR = (req, res, next) => {
  const querySelector = `INSERT INTO book_list (book_id, user_id, status, page_number) VALUES ($1, $2, 'to be read', 0)`;
  // query Vars: BookID, UserID
  const queryVars = ['1'];

  const addedResults = db
    .query(querySelector, queryVars)
    .then((data) => {
      console.log(data.rows);
      next();
    })
    .catch((err) => {
      return next({
        log: 'libraryController.addToTBR: ERROR: Error adding to database',
        message: {
          err:
            'Error occurred in libraryController.addToTBR. Check server logs for more details',
        },
      });
    });
};

// update Status
libraryController.updateStatus = (req, res, next) => {
  // bood ID, user ID, status update
};

// add Review or Stars
libraryController.addRating = (req, res, next) => {
  // book ID, user ID, stars
};

libraryController.addReview = (req, res, next) => {
  // book ID, user ID, review
};

module.exports = libraryController;
