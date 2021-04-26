import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyBooks from "./MyBooks.jsx";
import Reviews from "./Reviews.jsx";
import Complete from "./Complete.jsx";
import Profile from "./Profile.jsx";
import Search from "./Search.jsx";
import Main from "./Main.jsx";
import ToBeRead from "./ToBeRead.jsx";

export default function NavBar() {
  return (
    <Router>
      <nav>
      <div id="profileLink">
        <Profile />
        </div>
        <div className="navLinks">
          <Link to="/newHome">Home</Link>
        </div>
        <div className="navLinks">
          <Link to="/MyBooks">My Books</Link>
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
        <Route exact path="/newHome" component={Main} />
        <Route path="/MyBooks" component={MyBooks} />
        <Route path="/ToBeRead" component={ToBeRead} />
        <Route path="/Complete" component={Complete} />
        <Route path="/Reviews" component={Reviews} />
        <Route path="/Search" component={Search} />
      </Switch>
    </Router>
  );
}
