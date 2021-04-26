import React, { useState, useEffect } from "react";
import Book from "./Book.jsx";
import axios from "axios";
import "../../html-scss/styles.scss";

// Displays books that are currently in database as "In Progress"

export default function CurrentlyReading() {
  const [books, setBooks] = useState([]);

  // initial fetch request to database
  useEffect(() => {
    axios.get("/db/current").then((data) => {
      setBooks(data.data.rows);
    });
  });

  // function that runs once books have been succesfully fetched
  const renderBooks = () => {
    const newBooks = [];
    for (let i = 0; i < books.length; i += 1) {
      newBooks.push(
        <Book
          result={books[i]}
          submitRating={submitRating}
          updatePageNum={updatePageNum}
          removeBook={removeBook}
          key={books[i].book_id}
        />
      );
    }
    return newBooks;
  };

  // event handler for book being marked complete and sending rating to database
  const submitRating = (bookID, userID, stars, review) => {
    const body = { bookID, userID, stars, review };
    axios.post("/db/submitRating", body);
  };

  // event handler for page number to be updated and sent to database
  const updatePageNum = (bookID, userID, newPageNum) => {
    const body = { bookID, userID, newPageNum };
    axios.post("/db/updatePageNum", body);
  };

  // event handler to remove book from list and send to database
  const removeBook = (bookID, userID) => {
    const body = { bookID, userID };
    axios.delete("/db/removeBook", { data: body });
  };
  return (
    <div className="bodyDiv">
      {books.length > 0 ? renderBooks() : <h2>Loading...</h2>}
    </div>
  );
}
