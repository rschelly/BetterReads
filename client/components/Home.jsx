import React from 'react';
import Header from './Header.jsx';
import NavBar from './NavBar.jsx';

// access username

export default Home = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <div className='home'>
        <h1>Welcome, username!</h1>
      </div>
    </div>
  );
};
