import axios from 'axios';
import React from 'react';
import Review from './Review.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
    };
  }
  renderRatings() {
    const reviews = [];
    for (let i = 0; i < this.state.ratings.length; i += 1) {
      reviews.push(<Review result={this.state.ratings[i]} />);
    }
    return reviews;
  }
  componentDidMount() {
    axios
      .get('/db/ratings')
      .then((data) => this.setState({ ratings: data.data.rows }));
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
