import React from 'react';
import Book from './Book.jsx';
import axios from 'axios';

// Displays books marked as "Completed" in database

export default class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  // initial fetch req to pull books from db
  componentDidMount() {
    axios
      .get('/db/completed')
      .then((data) => this.setState({ books: data.data.rows }));
  }
  // function that runs once books have loaded
  renderBooks() {
    const books = [];
    for (let i = 0; i < this.state.books.length; i += 1) {
      books.push(
        <Book result={this.state.books[i]} key={this.state.books[i].book_id} />
      );
    }
    return books;
  }
  render() {
    return (
      <div>
        {this.state.books.length > 0 ? this.renderBooks() : <h2>Loading...</h2>}
      </div>
    );
  }
}
