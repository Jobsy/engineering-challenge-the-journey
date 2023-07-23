
import React from 'react';

interface SearchBarProps {
  onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Type a search query to filter"
        onChange={handleInputChange} />
    </div>
  );
};


export default SearchBar;
