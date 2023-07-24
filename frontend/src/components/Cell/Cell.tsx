import React, { useState } from 'react';

import editIcon from '../../assests/editIcon.svg';
import CellInput from './CellInput';


/**
 * Represents the properties passed to the Cell component.
 *
 * @interface CellProps
 * @property {string} value - the current value of the cell.
 * @property {(newValue: string) => void} onChange - a function to handle changes to the cell's value.
 * @property {(formula: string) => number | null} evaluateFormula - a function to evaluate a formula and return the result.
 * @property {() => void} updateDependentCells - a function to update dependent cells when the current cell's value changes.
 * @property {boolean} highlight - indicates whether the cell is highlighted or not.
 */
interface CellProps {
  value: string;
  onChange: (newValue: string) => void;
  evaluateFormula: (formula: string) => number | null;
  updateDependentCells: () => void; 
  highlight: boolean;
}

/**
 * Cell component is used to display and interact with individual cells in a spreadsheet grid.
 *
 * @component
 * @param CellProps props - the props for the Cell component.
 * @returns JSX.Element a React JSX element representing the Cell component.
 * 
 * @example
 * // Example usage of Cell component in a React component
 * import React from 'react';
 * import Cell from './Cell';
 *
 * const MySpreadsheet = () => {
 *   const handleCellChange = (newValue) => {
 *     // Handle cell value change logic
 *   };
 *
 *   const evaluateFormula = (formula) => {
 *     // Evaluate the formula and return the result
 *   };
 *
 *   const updateDependentCells = () => {
 *     // Update dependent cells logic
 *   };
 *
 *   return (
 *     <div>
 *       <Cell
 *         value="123"  // the value of the cell
 *         onChange={handleCellChange} // function to handle cell value change
 *         evaluateFormula={evaluateFormula} // function to evaluate formula
 *         updateDependentCells={updateDependentCells} // function to update dependent cells
 *         highlight={false} // hhether the cell is highlighted or not
 *       />
 *     </div>
 *   );
 * };
 *
 * export default MySpreadsheet;
 */
const Cell: React.FC<CellProps> = ({ 
    value, 
    onChange, 
    evaluateFormula, 
    updateDependentCells, 
    highlight 
  }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  /**
   * Handles the blur event when the cell input loses focus.
   * Evaluates the cell expression and updates the cell value.
   */
  const handleBlur = () => {
    setEditing(false);
    const evaluatedValue = evaluateExpression(inputValue);
    onChange(evaluatedValue);
    updateDependentCells();
  };

  /**
   * Handles the click event when the cell is clicked for editing.
   */
  const handleClick = () => {
    setEditing(true);
  };

  /**
   * Handles the change event when the cell input value changes during editing.
   *
   * @param {string} newValue - the new value of the cell input.
   */
  const handleChange = (newValue: string) => {
    setInputValue(newValue);
  };

  /**
   * Evaluates a mathematical expression in the cell value, if it starts with '='.
   *
   * @param {string} expression - the expression to evaluate.
   * @returns {string} the evaluated value of the expression or the original expression if not starting with '='.
   * @example
   * const expression = '=2 + 3';
   * const result = evaluateExpression(expression); // Output: '5'
   */
  const evaluateExpression = (expression: string): string => {
    if (expression.startsWith('=')) {
      try {
        const result = evaluateFormula(expression);
        if (result !== null) {
          return result.toString();
        }
      } catch (error) {
        console.error('Error evaluating formula:', error);
        return '#ERROR';
      }
    }
    return expression;
  };

  return (
    <div className={`cell ${highlight ? 'highlight' : ''}`} onClick={handleClick} data-testid="cell">
      {editing ? (
        <CellInput 
          value={inputValue} 
          onChange={handleChange} 
          onBlur={handleBlur} 
          autoFocus 
        />
      ) : (
        <span>
          <span className='value'>{value}</span>
          <img src={editIcon} alt="Edit Icon" />
        </span>
      )}
    </div>
  );
};

export default Cell;

