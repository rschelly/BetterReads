const express = require('express');
const { library } = require('webpack');
const libraryRouter = express.Router();
const libraryController = require('../controllers/libraryController.js');

// name something different? idk
libraryRouter.get('/tbr', libraryController.getToBeRead, (req, res) => {
  res.status(200).json(res.locals.toberead);
});

libraryRouter.get(
  '/current',
  libraryController.getCurrentlyReading,
  (req, res) => {
    res.status(200).json(res.locals.current);
  }
);

libraryRouter.get('/completed', libraryController.getCompleted, (req, res) => {
  res.status(200).json(res.locals.complete);
});

libraryRouter.get('/ratings', libraryController.getRatings, (req, res) => {
  res.status(200).json(res.locals.ratings);
});

libraryRouter.post(
  '/updateStatus',
  libraryController.updateStatus,
  (req, res) => {
    res.status(200).json();
  }
);

libraryRouter.post(
  '/submitRating',
  libraryController.submitRating,
  (req, res) => {
    res.status(200);
  }
);

libraryRouter.post(
  '/updatePageNum',
  libraryController.updatePageNum,
  (req, res) => {
    res.status(200);
  }
);

libraryRouter.delete('/removeBook', libraryController.removeBook, (req, res) =>
  res.status(200)
);

module.exports = libraryRouter;
