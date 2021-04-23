const express = require('express');
const api_router = express.Router()

api_router.get('/:books', async (req,res,next) => {
    try {
        const googleBooksAPI = 'https://www.googleapis.com/books/v1/volumes/'
        const userBookRequestURI = encodeURIComponent('gooleBooksAPI'+ req.params.books)
        const requestBooks = await fetch(userBookRequestURI)
        const booksFromApi = await requestBooks.json();
        res.locals.books = booksFromApi;
    } catch (err) {
        if (err) {return next({
            Error : err,
            log: 'Error in request to books API. Check route handling'
            })
        };
    };
});



module.exports = api_router;