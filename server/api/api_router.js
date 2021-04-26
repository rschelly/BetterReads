const express = require("express");
const api_router = express.Router();
const fetch = require("node-fetch");

//Search Google Books API for user-input queries.
api_router.get(
  "/:books",
  async (req, res, next) => {
    

    try {
      const googleBooksAPI = "https://www.googleapis.com/books/v1/volumes?q=";
      const userRequestURI = encodeURI(googleBooksAPI.concat(req.params.books));
      
      
      //request specific items from API: ISBN-identifiers 13 & 10, Author, Title, Description, pageCount, imageLinks and a previewLink.
      //max return results set to 10
      
      const requestBooks = await fetch(
        userRequestURI.concat(
            "&maxResults=10&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/authors,volumeInfo/industryIdentifiers/identifier,volumeInfo/pageCount,volumeInfo/imageLinks,volumeInfo/previewLink)"
            )
      );
       const booksFromAPI = await requestBooks.json();
      

      //place API search results on res.locals object
      res.locals.books = booksFromAPI;
      

      next();
      // Check terminal for log messages from error handler, if necessary
    } catch (err) {
      if (err) {
        return next({
          Error: err.message,
          log: `Error in request to books API. Check route handling ${err.message}`,
        });
      }
    }
  },
  (req, res) => {
    
    res.status(200).send(res.locals.books);
  }
);

module.exports = api_router;
