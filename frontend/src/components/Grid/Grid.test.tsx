import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';

import Grid from './Grid';


describe('Grid component', () => {
  describe('renders grid with correct number of cells', () => {
    it('should render grid with 3 rows and 3 columns', () => {
      const rows = 3;
      const columns = 3;

      render(<Grid rows={rows} columns={columns} />);
      const cellElements = screen.getAllByTestId('cell');

      expect(cellElements.length).toBe(rows * columns);
    });
  });

  describe('handles cell value change', () => {
    it('should update the value of the first cell on input change', () => {
      const rows = 3;
      const columns = 3;

      render(<Grid rows={rows} columns={columns} />);

      const cellElements = screen.getAllByTestId('cell');
      const firstCell = cellElements[0];
      fireEvent.click(firstCell);

      // get the row element which contains the input element
      const inputElement = screen.getByTestId('input');

      if (inputElement) {
        fireEvent.change(inputElement, { target: { value: 'New Value' } });
        fireEvent.blur(inputElement);
      } else {
        throw new Error('Input element not found.');
      }

      // get the updated value from the first cell
      const updatedValue = firstCell.textContent;

      // assert the updated value matches the expected value
      expect(updatedValue).toBe('New Value');
    });
  });

  describe('handles search', () => {
    it('should show only matching rows when searching', () => {
      const rows = 3;
      const columns = 3;
      render(<Grid rows={rows} columns={columns} />);
      
      const cellElements = screen.getAllByTestId('cell');
  
      // set a value in the first cell
      const firstCell = cellElements[0];
      fireEvent.click(firstCell);
      const inputElement = screen.getByTestId('input');
      fireEvent.change(inputElement, { target: { value: 'New Value' } });
      fireEvent.blur(inputElement);
  
      // simulate entering the search query
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'New Value' } });
  
      // get all row elements
      const headerRow = screen.getByTestId('header-row');
      const allRows = screen.getAllByTestId((testId) => testId.startsWith('row-'));
  
      // get the row elements containing cells with the search query
      const matchingRows = allRows.filter((row) => {
        const cellElements = screen.getAllByTestId('cell');
        return cellElements.some((cell) => cell.textContent === 'New Value');
      });
  
      // ensure that only matching rows are displayed
      expect(matchingRows.length).toBe(1);
      matchingRows.forEach((row) => {
        expect(row).toBeVisible();
      });
  
      // ensure that other rows are not displayed
      const otherRows = allRows.filter((row) => row !== headerRow && !matchingRows.includes(row));
      otherRows.forEach((row) => {
        expect(row).not.toBeVisible();
      });
    });
  
    it('should display a message when no matching cells found', () => {
      const rows = 3;
      const columns = 3;

      render(<Grid rows={rows} columns={columns} />);
      const searchInput = screen.getByTestId('search-input');;
      fireEvent.change(searchInput, { target: { value: 'NonExistentValue' } });
  
      // check if the "No matching cells found" message is displayed
      const message = screen.queryByText('No matching cells found.');
      expect(message).toBeInTheDocument();
    });
  });
});
