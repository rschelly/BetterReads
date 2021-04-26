const express = require("express");
const libraryRouter = express.Router();
const libraryController = require("../controllers/libraryController.js");

// Router for To Be Read books
libraryRouter.get("/tbr", libraryController.getToBeRead, (req, res) => {
  res.status(200).json(res.locals.toberead);
});

// Router for books currently in progress
libraryRouter.get(
  "/current",
  libraryController.getCurrentlyReading,
  (req, res) => {
    res.status(200).json(res.locals.current);
  }
);

// Router for books Completed
libraryRouter.get("/completed", libraryController.getCompleted, (req, res) => {
  res.status(200).json(res.locals.complete);
});

// Router to populate Ratings/Reviews page
libraryRouter.get("/reviews", libraryController.getReviews, (req, res) => {
  res.status(200).json(res.locals.reviews);
});

// Router to update book from TBR to In Progress
libraryRouter.post(
  "/updateStatus",
  libraryController.updateStatus,
  (req, res) => {
    res.status(200).json();
  }
);

// Router to mark book as complete and submit the star rating and review
libraryRouter.post(
  "/submitRating",
  libraryController.submitRating,
  (req, res) => {
    res.status(200);
  }
);

// Router to update page number for In Progress books
libraryRouter.post(
  "/updatePageNum",
  libraryController.updatePageNum,
  (req, res) => {
    res.status(200);
  }
);

// Router to add from API
libraryRouter.post("/addTBR", libraryController.addToTBR, (req, res) => {
  res.status(200);
});

// Router to remove book from either TBR or Current books
libraryRouter.delete("/removeBook", libraryController.removeBook, (req, res) =>
  res.status(200)
);

module.exports = libraryRouter;
