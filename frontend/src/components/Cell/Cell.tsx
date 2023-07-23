import React, { useState } from 'react';

import editIcon from '../../assests/editIcon.svg';
import CellInput from './CellInput';


interface CellProps {
  value: string;
  onChange: (newValue: string) => void;
  evaluateFormula: (formula: string) => number | null;
  updateDependentCells: () => void; 
  highlight: boolean;
}

const Cell: React.FC<CellProps> = ({ 
    value, 
    onChange, 
    evaluateFormula, 
    updateDependentCells, 
    highlight 
  }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setEditing(false);
    const evaluatedValue = evaluateExpression(inputValue);
    onChange(evaluatedValue);
    updateDependentCells();
  };

  const handleClick = () => {
    setEditing(true);
  };

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
  };

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
