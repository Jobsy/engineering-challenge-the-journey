import React from 'react';


/**
 * Represents the properties passed to the CellInput component.
 *
 * @interface CellInputProps
 * @property {string} value - the current value of the input.
 * @property {(newValue: string) => void} onChange - a function to handle changes to the input value.
 * @property {() => void} onBlur - a function to handle the blur event when the input loses focus.
 * @property {boolean} [autoFocus] - indicates whether the input should be auto-focused when rendered.
 */
interface CellInputProps {
  value: string;
  onChange: (newValue: string) => void;
  onBlur: () => void;
  autoFocus?: boolean;
}

/**
 * CellInput component is used to render an input element for cell editing in a spreadsheet grid.
 *
 * @component
 * @param CellInputProps props - the props for the CellInput component.
 * @returns JSX.Element a React JSX element representing the CellInput component.
 * 
 * @example
 * // Example usage of CellInput component in a React component
 * import React, { useState } from 'react';
 * import CellInput from './CellInput';
 *
 * const MySpreadsheet = () => {
 *   const [cellValue, setCellValue] = useState('Initial Value');
 *
 *   const handleChange = (newValue) => {
 *     // Handle input value change logic
 *     setCellValue(newValue);
 *   };
 *
 *   const handleBlur = () => {
 *     // Handle input blur event logic
 *     console.log('Input blurred.');
 *   };
 *
 *   return (
 *     <div>
 *       <CellInput
 *         value={cellValue} // the value of the input
 *         onChange={handleChange} // function to handle input value change
 *         onBlur={handleBlur} // function to handle input blur event
 *         autoFocus={true} // input will be auto-focused when rendered
 *       />
 *     </div>
 *   );
 * };
 *
 * export default MySpreadsheet;
 */
const CellInput: React.FC<CellInputProps> = ({ 
    value, 
    onChange, 
    onBlur, 
    autoFocus 
  }) => {
  /**
   * Handle the change event of the input element.
   * This function is used to handle changes in the input value and call the onChange callback with the new value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - the change event object generated by the input element.
   * @returns {void} - This function does not return anything.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type='text'
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      data-testid='input'
    />
  );
};

export default CellInput;
