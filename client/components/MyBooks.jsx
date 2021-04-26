import React from 'react';
import Book from './Book.jsx';
import axios from 'axios';
import "../../html-scss/styles.scss";

// Displays books that are currently in database as "In Progress"

export default class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.submitRating = this.submitRating.bind(this);
    this.updatePageNum = this.updatePageNum.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }
  // initial fetch request to database
  componentDidMount() {
    axios.get('/db/current').then((data) => {
      this.setState({ books: data.data.rows });
    });
  }

  // function that runs once books have been succesfully fetched
  renderBooks() {
    const books = [];
    for (let i = 0; i < this.state.books.length; i += 1) {
      books.push(
        <Book
          result={this.state.books[i]}
          submitRating={this.submitRating}
          updatePageNum={this.updatePageNum}
          removeBook={this.removeBook}
          key={this.state.books[i].book_id}
        />
      );
    }
    return books;
  }

  // event handler for book being marked complete and sending rating to database
  submitRating(bookID, userID, stars, review) {
    const body = { bookID, userID, stars, review };
    axios.post('/db/submitRating', body).then((res) => console.log(res));
  }

  // event handler for page number to be updated and sent to database
  updatePageNum(bookID, userID, newPageNum) {
    const body = { bookID, userID, newPageNum };
    axios.post('/db/updatePageNum', body).then((data) => console.log(data));
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
      <div className='bodyDiv'>
        {this.state.books.length > 0 ? this.renderBooks() : <h2>Loading...</h2>}
      </div>
    );
  }
}
