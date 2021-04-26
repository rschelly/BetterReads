import axios from "axios";
import React, { useState, useEffect } from "react";
import Book from "./Book.jsx";

// Displays books that are in DB as "To Be Read"

export default function ToBeRead() {
  const [books, setBooks] = useState([]);

  // initial fetch request to pull books from db
  useEffect(() => {
    axios.get("/db/tbr").then((data) => setBooks(data.data.rows));
  });

  // function that runs once books have been succesfully fetched
  const renderBooks = () => {
    const newBooks = [];
    for (let i = 0; i < books.length; i += 1) {
      newBooks.push(
        <Book
          result={books[i]}
          removeBook={removeBook}
          updateStatus={updateStatus}
          key={books[i].book_id}
        />
      );
    }
    return newBooks;
  };

  // event handler to change status from 'to be read' to 'in progress', will move book to MyBooks after reload
  const updateStatus = (bookID, userID) => {
    const body = { bookID, userID };
    axios.post("/db/updateStatus", body);
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
