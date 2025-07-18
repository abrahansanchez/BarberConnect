import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, phone, or email"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-sm"
    />
  );
};

export default SearchBar;
