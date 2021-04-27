const db = require("../models/libraryModel");

const libraryController = {};

// ****************
// At time of comment, user log in/authentication not currently operational.
// All control methods below have been tested using dummy information that can be found
// in the libraryModel. All instances of "userID" hardcoded to '1' will need to be updated
// to reflect true user ID once authentication is operational.
// ****************

// Takes in user id. Queries DB for that user and returns all books marked as "to be read"
// Stores data in res.locals
libraryController.getToBeRead = (req, res, next) => {
  const querySelector = `
  SELECT book_list.book_id, book_list.user_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn 
  FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id 
  WHERE status = 'to be read' AND book_list.user_id = $1`;
  const userID = ["1"]; // TO DO!!!!! needs updated to reflect real user id
  const tbrResults = db.query(querySelector, userID);
  tbrResults
    .then((data) => {
      res.locals.toberead = data;
      next();
    })
    .catch((err) => {
      return next({
        log:
          "libraryController.getToBeRead: ERROR: Error getting list from database",
        message: {
          err:
            "Error occurred in libraryController.getToBeRead. Check server logs for more details",
        },
      });
    });
};

// Takes in user id. Queries DB for that user and returns all books marked as "in progress"
// Stores data in res.locals
libraryController.getCurrentlyReading = (req, res, next) => {
  const querySelector = `
  SELECT book_list.book_id, book_list.status, book_list.user_id, books.title, books.author, books.page_count, books.cover_url, books.isbn, book_list.page_number 
  FROM "book_list" INNER JOIN "books" ON book_list.book_id = books._id 
  WHERE status = 'in progress' AND book_list.user_id = $1`;
  const userID = ["1"]; // needs updated to reflect real user id

  const currentResults = db.query(querySelector, userID);
  currentResults
    .then((data) => {
      res.locals.current = data;
      next();
    })
    .catch((err) => {
      return next({
        log:
          "libraryController.getCurrentlyReading: ERROR: Error getting list from database",
        message: {
          err:
            "Error occurred in libraryController.getCurrentlyReading. Check server logs for more details",
        },
      });
    });
};

// Takes in user id. Queries DB for that user and returns all books marked as "completed"
// Stores data in res.locals
libraryController.getCompleted = (req, res, next) => {
  const querySelector = `
  SELECT book_list.book_id, book_list.status, books.title, books.author, books.page_count, books.cover_url, books.isbn 
  FROM "book_list" 
  INNER JOIN "books" 
  ON book_list.book_id = books._id 
  WHERE status = 'completed' AND book_list.user_id = $1`;
  const userID = ["1"]; // needs updated to reflect real user id

  const completedResults = db.query(querySelector, userID);
  completedResults
    .then((data) => {
      res.locals.complete = data;
      next();
    })
    .catch((err) => {
      return next({
        log:
          "libraryController.getCompleted: ERROR: Error getting list from database",
        message: {
          err:
            "Error occurred in libraryController.getCompleted. Check server logs for more details",
        },
      });
    });
};

// Takes in user id. Queries DB for that user and returns all reviews/ratings from review_list
// Stores data in res.locals
libraryController.getReviews = (req, res, next) => {
  const querySelector = `SELECT *
  FROM "review_list"
  INNER JOIN "books"
  ON review_list.book_id = books._id 
  WHERE review_list.user_id = $1`;
  const userID = ["1"]; // needs updated to reflect real user id

  const reviewResults = db.query(querySelector, userID);
  reviewResults
    .then((data) => {
      res.locals.reviews = data;
      next();
    })
    .catch((err) => {
      return next({
        log:
          "libraryController.getRatings: ERROR: Error getting list from database",
        message: {
          err:
            "Error occurred in libraryController.getRatings. Check server logs for more details",
        },
      });
    });
};

// Takes in book id and user id. Updates status to in progress for that book id and that user.
// Returns no data
// Currently does not rerender the page
libraryController.updateStatus = (req, res, next) => {
  // bood ID, user ID, status update
  const querySelector = `UPDATE book_list
  SET status = 'in progress'
  WHERE book_id = $1 AND user_id = $2`;
  const queryVars = [req.body.bookID, req.body.userID]; 

  const updateResults = db.query(querySelector, queryVars);
  updateResults.then(next()).catch((err) => {
    return next({
      log:
        "libraryController.updateStatus: ERROR: Error updating record in database",
      message: {
        err:
          "Error occurred in libraryController.updateStatus. Check server logs for more details",
      },
    });
  });
};

// Takes in a request body object:
// {
//   bookID,
//   userID,
//   stars,
//   review
// }
// Two db queries in this controller. First, review is inserted into the review list (querySelectorInsert, queryVarsInsert)
// After review successfully inserted, book_list is updated to reflect "completed" status for book id and user id (querySelectorUpdate, queryVarsUpdate).
// Returns no data
// Currently does not re render page
libraryController.submitRating = (req, res, next) => {
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
        .catch((err) => {
          return next({
            log:
              "libraryController.submitRating: ERROR: Error updating record in database",
            message: {
              err:
                "Error occurred in libraryController.submitRating. Check server logs for more details",
            },
          });
        });
    })
    .catch((err) => {
      return next({
        log:
          "libraryController.submitRating: ERROR: Error updating record in database",
        message: {
          err:
            "Error occurred in libraryController.submitRating. Check server logs for more details",
        },
      });
    });
};

// Takes in a request body
// {
//   newPageNum,
//   bookID,
//   userID
// }
// Updates page number value in db for book id and user id.
// Returns no data
// Currently does not re render page
libraryController.updatePageNum = (req, res, next) => {
  const querySelector = `UPDATE book_list
  SET page_number = $1
  WHERE book_id = $2 AND user_id = $3`;
  const queryVars = [req.body.newPageNum, req.body.bookID, req.body.userID];

  const pageNumResults = db.query(querySelector, queryVars);
  pageNumResults.then(next()).catch((err) => {
    return next({
      log:
        "libraryController.updatePageNum: ERROR: Error updating record in database",
      message: {
        err:
          "Error occurred in libraryController.updatePageNum. Check server logs for more details",
      },
    });
  });
};

// Takes in a request body
// {
//   bookID,
//   userID
// }
// Deletes record from book list for book id and user id
// Returns no data
// Currently does not re render page
libraryController.removeBook = (req, res, next) => {
  const querySelector = `DELETE FROM book_list
  WHERE book_id = $1 and user_id = $2`;
  const queryVars = [req.body.bookID, req.body.userID];

  const removeResults = db.query(querySelector, queryVars);
  removeResults.then(next());
};

// ***UNFINISHED! Need to link up with API Calls.***
// Will also potentially need to create add book to DB ? idk
libraryController.addToTBR = (req, res, next) => {
  console.log(req.body);
  const querySelectorBookAdd = `
  INSERT INTO books (title, author, page_count, cover_url, isbn) 
  VALUES ($1, $2, $3, $4, $5) 
  RETURNING _id
  `;
  const queryVars = [
    req.body.title,
    req.body.author,
    req.body.pageCount,
    req.body.url,
    req.body.ISBN,
  ];

 // In query below, second array element needs updated to reflect true user ID 
  const addedResults = db.query(querySelectorBookAdd, queryVars);
  addedResults
    .then((data) => {
      console.log(data);
      const addTBRqueryString = `
      INSERT INTO book_list (book_id, user_id, status, page_number) 
      VALUES ($1, $2, $3, $4)
      `;
      const TBRqueryVars = [
        data.rows[0]._id,
        1,
        'to be read',
        0
      ]
      db.query(addTBRqueryString, TBRqueryVars)
        .then((data) => {
          console.log(data);
          next();
        })
        .catch((err) => {
          return next({
            log: "libraryController.addToTBR: ERROR:" + err.message,
            message: {
              err: 
                "Error occurred in libraryController.addToTBR. Check server logs for more details"
            }
          })
        })
    })
    .catch((err) => {
      return next({
        log: "libraryController.addToTBR: ERROR: Error adding to books",
        message: {
          err:
            "Error occurred in libraryController.addToTBR. Check server logs for more details",
        },
      });
    });
};

module.exports = libraryController;
