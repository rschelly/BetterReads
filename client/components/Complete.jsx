import React from 'react';
import Book from './Book.jsx';
import axios from 'axios';

export default class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  renderBooks() {
    const books = [];
    for (let i = 0; i < this.state.books.length; i += 1) {
      books.push(
        <Book result={this.state.books[i]} key={this.state.books[i].book_id} />
      );
    }
    return books;
  }
  // fetch db/completed
  // [
  //   {
  //     book_id: 3,
  //     status: 'completed',
  //     title: 'third title',
  //     author: 'third author',
  //     page_count: 45,
  //     cover_url: 'cover_url',
  //     isbn: 87654
  //   }
  // ]
  componentDidMount() {
    axios
      .get('/db/completed')
      .then((data) => this.setState({ books: data.data.rows }));
  }
  render() {
    return (
      <div>
        {this.state.books.length > 0 ? this.renderBooks() : <h2>Loading...</h2>}
      </div>
    );
  }
}
