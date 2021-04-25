import axios from 'axios';
import React from 'react';
import Book from './Book.jsx';

export default class ToBeRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  renderBooks() {
    const books = [];
    for (let i = 0; i < this.state.books.length; i += 1) {
      books.push(<Book result={this.state.books[i]} />);
    }
    return books;
  }
  componentDidMount() {
    axios
      .get('/db/tbr')
      .then((data) => this.setState({ books: data.data.rows }));
  }
  // fetch /db/tbr
  // [
  //   {
  //     book_id: 2,
  //     status: 'to be read',
  //     title: 'second title',
  //     author: 'second author',
  //     page_count: 25,
  //     cover_url: 'cover_url',
  //     isbn: 54321
  //   }
  // ]
  render() {
    return (
      <div>
        {this.state.books.length > 0 ? this.renderBooks() : <h2>Loading...</h2>}
      </div>
    );
  }
}
