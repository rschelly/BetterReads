import React from 'react';
import { useState } from 'react';

export default function Book(props) {
  const [complete, setComplete] = useState(false);
  const [pageNumber, setPageNumber] = useState(false);

  const updateStatus = () => {
    setComplete({ complete: true });
  };

  const updatePageNum = () => {
    setPageNumber({ pageNumber: true });
  };

  const displayUpdate = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.updatePageNum(props.result.book_id, e.target[0].value);
        }}
      >
        <label>Please update new page number</label>
        <br />
        <input type='number' min='0' />
        <br />
        <input type='submit' />
      </form>
    );
  };

  const displayReview = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.submitRating(
            props.result.book_id,
            e.target[0].value,
            e.target[1].value
          );
        }}
      >
        <label>Please rate this book from 1 to 5 stars</label>
        <br />
        <input type='number' max='5' min='1' />
        <br />
        <label>Please write a brief review</label>
        <br />
        <input type='text' />
        <br />
        <input type='submit' value='Submit Rating' />
      </form>
    );
  };
  return (
    <div className='book'>
      <img src={props.result.coverurl} />
      <h1>
        {props.result.title} by {props.result.author}
      </h1>
      <h2>{props.result.page_count} pages</h2>
      {props.result.status === 'in progress' ? (
        <div>
          <h2>On page {props.result.page_number}</h2>
          <button onClick={updateStatus}>Complete</button>{' '}
          <button onClick={updatePageNum}>Update Page Number</button>{' '}
          <button onClick={() => props.removeBook(props.result.book_id)}>
            Remove
          </button>
          {complete ? displayReview() : ''}
          {pageNumber ? displayUpdate() : ''}
        </div>
      ) : (
        ''
      )}
      {props.result.status === 'to be read' ? (
        <div>
          <button onClick={() => props.updateStatus(props.result.book_id)}>
            Mark as Reading
          </button>{' '}
          <button onClick={() => props.removeBook(props.result.book_id)}>
            Remove
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
