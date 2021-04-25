const { library } = require('webpack');
const db = require('../models/libraryModel');

const libraryController = {};

// TO DO!
// Somehow get user ID? Cookie maybe? Ensure user is being added to sql db when being created
// Decide how to return results to front end

libraryController.getToBeRead = (req, res, next) => {
  const querySelector = `
  SELECT book_list.book_id, book_list.user_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn 
  FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id 
  WHERE status = 'to be read' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id
  const tbrResults = db.query(querySelector, userID);
  tbrResults
    .then((data) => {
      res.locals.toberead = data;
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
  SELECT book_list.book_id, book_list.status, book_list.user_id, books.title, books.author, books.page_count, books.cover_url, books.isbn, book_list.page_number 
  FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id 
  WHERE status = 'in progress' AND book_list.user_id = $1`;
  const userID = ['1']; // needs updated to reflect real user id

  const currentResults = db.query(querySelector, userID);
  currentResults
    .then((data) => {
      res.locals.current = data;
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

  const ratingsResults = db.query(querySelector, userID);
  ratingsResults.then((data) => {
    res.locals.ratings = data;
    next();
  });
};

libraryController.addToTBR = (req, res, next) => {
  const querySelector = `INSERT INTO book_list (book_id, user_id, status, page_number) VALUES ($1, $2, 'to be read', 0)`;
  // query Vars: BookID, UserID
  const queryVars = ['1'];

  const addedResults = db.query(querySelector, queryVars);
  addedResults
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
  const querySelector = `UPDATE book_list
  SET status = 'in progress'
  WHERE book_id = $1 AND user_id = $2`;
  const queryVars = [req.body.bookID, req.body.userID];

  const updateResults = db.query(querySelector, queryVars);
  updateResults.then(next());
};

// add Review or Stars
libraryController.submitRating = (req, res, next) => {
  // book ID, user ID, stars, review
  console.log(req.body.book_id);
  const querySelectorInsert = `INSERT INTO review_list (book_id, user_id, stars, review)
  VALUES ($1, $2, $3, $4)`;
  const queryVarsInsert = [
    req.body.bookID,
    req.body.userID,
    req.body.stars,
    req.body.review,
  ];

  const querySelectorUpdate = `UPDATE book_list 
  SET status = 'completed'
  WHERE book_id = $1 AND user_id = $2`;
  const queryVarsUpdate = [req.body.bookID, req.body.userID];

  const updateRecords = db.query(querySelectorInsert, queryVarsInsert);
  updateRecords
    .then(() => {
      db.query(querySelectorUpdate, queryVarsUpdate)
        .then(next())
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

libraryController.updatePageNum = (req, res, next) => {
  const querySelector = `UPDATE book_list
  SET page_number = $1
  WHERE book_id = $2 AND user_id = $3`;
  const queryVars = [req.body.newPageNum, req.body.bookID, req.body.userID];

  const pageNumResults = db.query(querySelector, queryVars);
  pageNumResults.then(next());
};

libraryController.removeBook = (req, res, next) => {
  const querySelector = `DELETE FROM book_list
  WHERE book_id = $1 and user_id = $2`;
  const queryVars = [req.body.bookID, req.body.userID];

  const removeResults = db.query(querySelector, queryVars);
  removeResults.then(next());
};

module.exports = libraryController;
