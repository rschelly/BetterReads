import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MyBooks from './MyBooks.jsx';
import Reviews from './Reviews.jsx';
import Complete from './Complete.jsx';
import Profile from './Profile.jsx';
import Search from './Search.jsx';

export default function NavBar() {
  return (
    <Router>
      <div>
        <Profile />
        <Link to='/MyBooks'>My Books</Link>
        <Link to='/Complete'>Complete</Link>
        <Link to='/Reviews'>My Reviews</Link>
        <Link to='/Search'>Search</Link>
      </div>
      <Switch>
        <Route path='/MyBooks' component={MyBooks} />
        <Route path='/Complete' component={Complete} />
        <Route path='/Reviews' component={Reviews} />
        <Route path='/Search' component={Search} />
      </Switch>
    </Router>
  );
}
