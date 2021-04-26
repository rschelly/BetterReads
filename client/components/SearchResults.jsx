import React from "react";

export default function SearchResults(props) {
  return (
    <div id="searchResult">
      <br />
      <img
        src={props.result.imageLinks.smallThumbnail}
        width="200px"
        height="269px"
      />
      <h1>
        {props.result.title} by {props.result.author}
      </h1>
      <h2>{props.result.pageCount}</h2>

      <button
        onClick={() =>
          props.addToBeRead(
            props.result.title,
            props.result.authors[0],
            props.result.pageCount,
            props.result.imageLinks.smallThumbnail,
            props.result.industryIdentifiers[0].identifier
          )
        }
      >
        Add to Reading List
      </button>
    </div>
  );
}

// title
// author
// page count
// cover url
