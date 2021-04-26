import React from "react";
import { useState } from "react";

export default function Book(props) {
  const [complete, setComplete] = useState(false);
  const [pageNumber, setPageNumber] = useState(false);

  // if the Status for Complete is true, the DisplayReview form will render allowing user to submit a review and star rating
  const updateStatus = () => {
    setComplete(true);
  };

  // if the status for pageNum is true, the DisplayUpdate form will render allowing user to update page number
  const updatePageNum = () => {
    setPageNumber(true);
  };

  // Form to update the page number on an in progress book
  const displayUpdate = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.updatePageNum(
            props.result.book_id,
            props.result.user_id,
            e.target[0].value
          );
        }}
      >
        <label>Please update new page number</label>
        <br />
        <input type="number" min="0" max={props.result.page_count} />
        <br />
        <input type="submit" />
      </form>
    );
  };

  // Form to submit review and star rating on completed book
  const displayReview = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.submitRating(
            props.result.book_id,
            props.result.user_id,
            e.target[0].value,
            e.target[1].value
          );
        }}
      >
        <label>Please rate this book from 1 to 5 stars</label>
        <br />
        <input type="number" max="5" min="1" />
        <br />
        <label>Please write a brief review</label>
        <br />
        <input type="text" />
        <br />
        <input type="submit" value="Submit Rating" />
      </form>
    );
  };
  return (
    // Renders the book element.
    <div className="book">
      <img src={props.result.coverurl} />
      <h1>
        {props.result.title} by {props.result.author}
      </h1>
      <h2>{props.result.page_count} pages</h2>
      {/* If the status of the book is in progress, the below will render */}
      {props.result.status === "in progress" ? (
        <div>
          <h2>On page {props.result.page_number}</h2>
          <button onClick={updateStatus}>Complete</button>{" "}
          <button onClick={updatePageNum}>Update Page</button>{" "}
          <button
            onClick={() =>
              props.removeBook(props.result.book_id, props.result.user_id)
            }
          >
            Remove
          </button>
          {complete ? displayReview() : ""}
          {pageNumber ? displayUpdate() : ""}
        </div>
      ) : (
        ""
      )}
      {/* If the status of the book is to be read, the below will render */}
      {props.result.status === "to be read" ? (
        <div>
          <button
            onClick={() =>
              props.updateStatus(props.result.book_id, props.result.user_id)
            }
          >
            Mark as Reading
          </button>{" "}
          <button
            onClick={() =>
              props.removeBook(props.result.book_id, props.result.user_id)
            }
          >
            Remove
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
