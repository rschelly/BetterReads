const express = require('express');
const libraryRouter = express.Router();
const libraryController = require('../controllers/libraryController.js');

// name something different? idk
libraryRouter.get('/tbr', libraryController.getToBeRead, (req, res) => {
  res.status(200).json();
});

libraryRouter.get(
  '/current',
  libraryController.getCurrentlyReading,
  (req, res) => {
    res.status(200).json();
  }
);

libraryRouter.get('/completed', libraryController.getCompleted, (req, res) => {
  res.status(200).json();
});

libraryRouter.post(
  '/updatestatus',
  libraryController.updateStatus,
  (req, res) => {
    res.status(200).json();
  }
);

libraryRouter.post('/addRating', libraryController.addRating, (req, res) => {
  res.status(200).json();
});

libraryRouter.post('/addReview', libraryController.addReview, (req, res) => {
  res.status(200).json();
});

module.exports = libraryRouter;
