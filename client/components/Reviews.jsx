import axios from "axios";
import React, { useState, useEffect } from "react";
import Review from "./Review.jsx";

// Displays Reviews/Ratings from Review_list in database

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  // initial fetch from db for ratings/reviews
  useEffect(() => {
    axios.get("/db/reviews").then((data) => setReviews(data.data.rows));
  });

  // function that runs once ratings/reviews have populated
  const renderReviews = () => {
    const newReviews = [];
    for (let i = 0; i < reviews.length; i += 1) {
      newReviews.push(<Review result={reviews[i]} key={reviews[i].book_id} />);
    }
    return newReviews;
  };
  return (
    <div className="bodyDiv">
      {reviews.length > 0 ? renderReviews() : <h2>Loading...</h2>}
    </div>
  );
}
