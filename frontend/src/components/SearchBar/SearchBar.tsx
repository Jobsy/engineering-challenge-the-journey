import React from 'react';


/**
 * Props interface for the SearchBar component.
 * @interface SearchBarProps
 */
interface SearchBarProps {
  /**
   * Callback function to be invoked when the search query changes.
   * @param {string} query - The new search query.
   * @returns {void}
   */
  onChange: (query: string) => void;
}

/**
 * Functional component representing a search bar.
 * @param {SearchBarProps} props - The props object containing onChange function.
 * @returns {JSX.Element} - A JSX element representing the search bar.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  /**
   * Event handler to handle changes in the input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   * @returns {void}
   */
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
