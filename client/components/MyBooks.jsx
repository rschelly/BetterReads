import React from 'react';
import Book from './Book.jsx';
import axios from 'axios';

export default class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  // fetch /db/current
  // [
  //   {
  //     book_id: 1,
  //     status: 'in progress',
  //     title: 'test title',
  //     author: 'author',
  //     page_count: 20,
  //     cover_url: 'cover_url',
  //     isbn: 12345
  //   }
  // ]
  renderBooks() {
    const books = [];
    for (let i = 0; i < this.state.books.length; i += 1) {
      books.push(<Book result={this.state.books[i]} />);
    }
    return books;
  }
  componentDidMount() {
    axios.get('/db/current').then((data) => {
      console.log(data.data.rows);
      this.setState({ books: data.data.rows });
    });
  }
  render() {
    return (
      <div className='bodyDiv'>
        {this.state.books.length > 0 ? this.renderBooks() : <h2>Loading...</h2>}
      </div>
    );
  }
}
