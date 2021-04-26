import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CurrentlyReading from "./CurrentlyReading.jsx";
import Reviews from "./Reviews.jsx";
import Complete from "./Complete.jsx";
import Profile from "./Profile.jsx";
import Search from "./Search.jsx";
import Main from "./Main.jsx";
import ToBeRead from "./ToBeRead.jsx";

// Displays the profile element and links to other components
// Main is what will display upon initial render
export default function NavBar() {
  return (
    <Router>
      <nav>
        <div id="profileLink">
          <Profile />
        </div>
        <div className="navLinks">
          <Link to="/home">Home</Link>
        </div>
        <div className="navLinks">
          <Link to="/CurrentlyReading">Currently Reading</Link>
        </div>
        <div className="navLinks">
          <Link to="/ToBeRead">To Be Read</Link>
        </div>
        <div className="navLinks">
          <Link to="/Complete">Complete</Link>
        </div>
        <div className="navLinks">
          <Link to="/Reviews">My Reviews</Link>
        </div>
        <div className="navLinks">
          <Link to="/Search">Search</Link>
        </div>
      </nav>
      <Switch>
        <Route exact path="/home" component={Main} />
        <Route path="/CurrentlyReading" component={CurrentlyReading} />
        <Route path="/ToBeRead" component={ToBeRead} />
        <Route path="/Complete" component={Complete} />
        <Route path="/Reviews" component={Reviews} />
        <Route path="/Search" component={Search} />
      </Switch>
    </Router>
  );
}
