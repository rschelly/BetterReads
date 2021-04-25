import axios from 'axios';
import React from 'react';
import Review from './Review.jsx';

// Displays Reviews/Ratings from Review_list in database
// Ratings/reviews used interchangeably. Initial plan was to handle stars and comments separately, but
// ultimately they got merged together. Sorry for the poor naming convention, will refactor if there's time

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
    };
  }

  // initial fetch from db for ratings/reviews
  componentDidMount() {
    axios
      .get('/db/ratings')
      .then((data) => this.setState({ ratings: data.data.rows }));
  }

  // function that runs once ratings/reviews have populated
  renderRatings() {
    const reviews = [];
    for (let i = 0; i < this.state.ratings.length; i += 1) {
      reviews.push(
        <Review
          result={this.state.ratings[i]}
          key={this.state.ratings[i].book_id}
        />
      );
    }
    return reviews;
  }
  render() {
    return (
      <div>
        {this.state.ratings.length > 0 ? (
          this.renderRatings()
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    );
  }
}
