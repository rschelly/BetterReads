const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const libraryController = require('../controllers/libraryController.js');

// name something different? idk
router.get('/tbr', libraryController.getToBeRead, (req, res) => {
    res.status(200).json();
})

router.get('/current', libraryController.getCurrentlyReading, (req, res) => {
  res.status(200).json();
})

router.get('/completed', libraryController.getCompleted, (req, res) => {
  res.status(200).json();
})

module.exports = router;
=======
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

module.exports = libraryRouter;
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
