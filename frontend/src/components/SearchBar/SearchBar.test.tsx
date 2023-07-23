import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar component', () => {
  it('should call the onChange function with the input value when the user types in the search input', () => {
    // mock the onChange function
    const onChangeMock = jest.fn();

    // render the SearchBar component
    render(<SearchBar onChange={onChangeMock} />);

    const searchInput = screen.getByTestId('search-input');

    // simulate user typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Test Value' } });

    // check if the onChange function was called with the correct input value
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('Test Value');
  });
});
