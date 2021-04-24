
import React, { useState } from 'react';
import SearchResults from './SearchResults.jsx';


const Search = () => {
  const [searchBar, setSearchBar] = useState('');
  const [searchDisply, setSearchDisplay] = useState([]);

  const handleSearch = (e) => {
    setSearchBar(e.target.value);
  };
  const getBooks = async () => {
    const retreiveBooks = await fetch('/api/' + searchBar);
    console.log(retreiveBooks);
    retreiveBooks.map
  
  };

  return (
    <div className='searchBar'>
      <form name='bookSearch' onSubmit={getBooks}>
        <input
          type='text'
          onChange={(e) => handleSearch(e)}
          value={searchBar}
        ></input>
        <input type='submit' value='Search'></input>
      </form>
      {/* <br>

      </br> */}
      {seachDisplay.length >= 1 ? <SearchResults/> : 'Query to your hearts content'}

    </div>
  );
};

export default Search;
