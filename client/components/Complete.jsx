import React, { useState, useEffect } from "react";
import Book from "./Book.jsx";
import axios from "axios";

// Displays books marked as "Completed" in database

export default function Complete() {
  const [books, setBooks] = useState([]);

  // Initial fetch to db
  useEffect(() => {
    axios.get("/db/completed").then((data) => setBooks(data.data.rows));
  }, []);

  // Once fetch is complete, renderBooks runs and returns array of books
  const renderBooks = () => {
    const newBooks = [];
    for (let i = 0; i < books.length; i += 1) {
      newBooks.push(<Book result={books[i]} key={books[i].book_id}/>);
    }
    return newBooks;
  };

  return (
    <div className="bodyDiv">
      {books.length > 0 ? renderBooks() : <h2>Loading...</h2>}
    </div>
  );
}
