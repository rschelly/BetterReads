const express = require('express');
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