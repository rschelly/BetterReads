import React, { Component } from 'react';
import { render } from 'react-dom';

class TopUI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <p>Welcome back, placeholder!</p>
        <input id='search'></input>
      </header>
    );
  }
}

export default TopUI;
