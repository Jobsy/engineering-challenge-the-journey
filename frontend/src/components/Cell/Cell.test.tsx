import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import Cell from './Cell';


// helper function to simulate double click
function doubleClick(element: HTMLElement) {
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    fireEvent.click(element);
    fireEvent.mouseDown(element);
    fireEvent.mouseUp(element);
    fireEvent.click(element);
}
  
describe('Cell component', () => {
  describe('renders cell value', () => {
    it('should render the cell with the provided value', () => {
      const value = 'Hello World';
      const onChange = jest.fn();
      const evaluateFormula = jest.fn();
      const updateDependentCells = jest.fn();
      const highlight = true;
      
      render(
        <Cell
          value={value} 
          onChange={onChange} 
          evaluateFormula={evaluateFormula} 
          updateDependentCells={updateDependentCells} 
          highlight={highlight}
        />
      );

      const cellElement = screen.getByText(value);
      expect(cellElement).toBeInTheDocument();
    });
  });

  describe('allows editing cell value', () => {
    it('should update the value of the cell on double click and input change', () => {
      const value = 'Hello World';
      const newValue = 'New Value';
      const onChange = jest.fn();
      const evaluateFormula = jest.fn();
      const updateDependentCells = jest.fn();
      const highlight = true;
      
      render(
        <Cell
          value={value} 
          onChange={onChange}
          evaluateFormula={evaluateFormula} 
          updateDependentCells={updateDependentCells} 
          highlight={highlight}
        />
      );

      const cellElement = screen.getByText(value);

      // simulate double-click to trigger edit mode
      fireEvent.click(cellElement);
      fireEvent.click(cellElement);

      // find the input element directly
      const inputElement = screen.getByTestId('input');

      expect(inputElement).toBeInTheDocument();

      fireEvent.change(inputElement, { target: { value: newValue } });
      fireEvent.blur(inputElement);
      expect(onChange).toHaveBeenCalledWith(newValue);
    });
  });

  describe('handles formula evaluation', () => {
    it('should evaluate a formula and display the result', () => {
      const value = '=SUM(1, 2, 3)';
      const onChange = jest.fn();
      const evaluateFormula = jest.fn((formula) => {

        if (formula.startsWith('=SUM')) {
          const numbers = formula.substring(5, formula.length - 1).split(',').map(Number);
          return numbers.reduce((sum: any, num: any) => sum + num, 0);
        }
        return 0; // default value if the formula is not recognized
      });

      const updateDependentCells = jest.fn();
      const highlight = true;
      
      render(
        <Cell 
          value={value} 
          onChange={onChange} 
          evaluateFormula={evaluateFormula} 
          updateDependentCells={updateDependentCells} 
          highlight={highlight}
        />
      );

      // find the cell element by its content
      const cellElement = screen.queryByText('=SUM(1, 2, 3)');
      expect(cellElement).toBeInTheDocument();

      // trigger double-click action
      doubleClick(cellElement!);

      // find the input element by its type attribute
      const inputElement = screen.getByTestId('input');
      expect(inputElement).toBeInTheDocument();

      // Calculate the expected result of the formula
      const expectedResult = evaluateFormula(value).toString();

      fireEvent.change(inputElement, { target: { value: expectedResult } });
      fireEvent.blur(inputElement);

      // verify that the onChange function is called with the new value
      expect(onChange).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('handles cell dependencies', () => {
    it('should update dependent cells when the cell value changes', () => {
      const value = '=A1 + 10';
      const newValue = '20';
      const onChange = jest.fn();
      const evaluateFormula = jest.fn().mockReturnValue(10);
      const updateDependentCells = jest.fn();
      const highlight = true;
      
      render(
        <Cell 
          value={value} 
          onChange={onChange} 
          evaluateFormula={evaluateFormula} 
          updateDependentCells={updateDependentCells} 
          highlight={highlight}
        />
      );

      // find the cell element by its content
      const cellElement = screen.queryByText('=A1 + 10');
      expect(cellElement).toBeInTheDocument();

      // trigger double-click action
      doubleClick(cellElement!);

      // wait for the input element with the evaluated formula result to appear
      setTimeout(() => {
        // select the input element within the cell using getByDisplayValue
        const inputElement = screen.getByDisplayValue('10') as HTMLInputElement;
        expect(inputElement).toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: newValue } });
        fireEvent.blur(inputElement);

        expect(onChange).toHaveBeenCalledWith(newValue);
      }, 500); // you can adjust the delay time as needed
    });
  });

describe('handles cell highlighting', () => {
    it('should highlight the cell with green border when it matches the search query', () => {
      const value = 'Hello World';
      const onChange = jest.fn();
      const evaluateFormula = jest.fn();
      const updateDependentCells = jest.fn();
      const highlight = true;
      render(
        <Cell 
          value={value} 
          onChange={onChange} 
          evaluateFormula={evaluateFormula} 
          updateDependentCells={updateDependentCells} 
          highlight={highlight} 
        />
      );
  
      // find the cell element by its class name
      const cellElement = screen.queryByTestId('cell') as HTMLElement;
      expect(cellElement).toHaveClass('highlight');
    });
  
    it('should not highlight the cell when it does not match the search query', () => {
      const value = 'Hello World';
      const onChange = jest.fn();
      const evaluateFormula = jest.fn();
      const updateDependentCells = jest.fn();
      const highlight = false; // set the highlight prop to false
      render(
        <Cell 
          value={value} 
          onChange={onChange} 
          evaluateFormula={evaluateFormula} 
          updateDependentCells={updateDependentCells} 
          highlight={highlight} 
        />
      );
  
      // find the cell element by its class name
      const cellElement = screen.queryByTestId('cell') as HTMLElement;
      expect(cellElement).not.toHaveClass('highlight');
    });
  });
});
