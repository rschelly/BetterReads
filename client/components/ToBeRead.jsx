import axios from 'axios';
import React from 'react';
import Book from './Book.jsx';

// Displays books that are in DB as "To Be Read"

export default class ToBeRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.removeBook = this.removeBook.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  // initial fetch request to pull books from db
  componentDidMount() {
    axios
      .get('/db/tbr')
      .then((data) => this.setState({ books: data.data.rows }));
  }

  // function that runs once books have been succesfully fetched
  renderBooks() {
    const books = [];
    for (let i = 0; i < this.state.books.length; i += 1) {
      books.push(
        <Book
          result={this.state.books[i]}
          removeBook={this.removeBook}
          updateStatus={this.updateStatus}
          key={this.state.books[i].book_id}
        />
      );
    }
    return books;
  }

  // event handler to change status from 'to be read' to 'in progress', will move book to MyBooks after reload
  updateStatus(bookID, userID) {
    const body = { bookID, userID };
    axios.post('/db/updateStatus', body).then((data) => console.log(data));
  }

  // event handler to remove book from list and send to database
  removeBook(bookID, userID) {
    const body = { bookID, userID };
    axios
      .delete('/db/removeBook', { data: body })
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div>
        {this.state.books.length > 0 ? this.renderBooks() : <h2>Loading...</h2>}
      </div>
    );
  }
}
