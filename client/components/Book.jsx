import React from 'react';

export default function Book(props) {
  return (
    <div>
      <img src={props.result.coverurl} />
      <h1>{props.result.title}</h1>
      <h2>{props.result.author}</h2>
      <h2>{props.result.status}</h2>
      <h2>{props.result.page_count}</h2>
    </div>
  );
}
