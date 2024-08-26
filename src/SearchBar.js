import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by college name..."
      onChange={handleChange}
      className='searchBar'
    />
  );
};

export default SearchBar;
