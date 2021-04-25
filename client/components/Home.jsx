import React from 'react';
import Header from './Header.jsx';
import NavBar from './NavBar.jsx';
import Search from './Search.jsx';
import '../../html-scss/styles.scss';

// access username

export default function Home() {
  return (
    <main>
      <Header />
      <NavBar />
    </main>
  );
}
