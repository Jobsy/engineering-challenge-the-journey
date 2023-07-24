import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { evaluateFormula } from '../../utils/formulas';
import SearchBar from '../SearchBar/SearchBar';
import Cell from '../Cell/Cell';


/**
 * Represents the properties passed to the Grid component.
 *
 * @interface GridProps
 * @property {number} rows - the number of rows in the grid.
 * @property {number} columns - the number of columns in the grid.
 */
interface GridProps {
  rows: number;
  columns: number;
}

/**
 * Represents the data structure for each cell in the grid.
 *
 * @interface CellData
 * @property {string} value - the current value of the cell.
 * @property {string[]} dependencies - an array of cell references that this cell depends on.
 */
interface CellData {
  value: string;
  dependencies: string[];
}

/**
 * Grid component is used to display and manage a spreadsheet-like grid.
 *
 * @component
 * @param GridProps props - the props for the Grid component.
 * @returns JSX.Element a React JSX element representing the Grid component.
 * 
 * @example
 * // Example usage of Grid component in a React component
 * import React from 'react';
 * import Grid from './Grid';
 *
 * const MySpreadsheetApp = () => {
 *   return (
 *     <Grid rows={10} columns={5} />
 *   );
 * };
 *
 * export default MySpreadsheetApp;
 */
const Grid: React.FC<GridProps> = ({ rows, columns }) => {
  const [gridData, setGridData] = useState<CellData[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ value: '', dependencies: [] }))
    )
  );
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [processingDoneAt, setProcessingDoneAt] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initialGridData = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ value: '', dependencies: [] }))
    );
    setGridData(initialGridData);
  }, [rows, columns]);

  /**
   * Handles the change of cell value in the grid.
   *
   * @param {number} rowIndex - the row index of the cell being changed.
   * @param {number} columnIndex - the column index of the cell being changed.
   * @param {string} value - The new value of the cell.
   * @returns {void}
   */
  const handleCellValueChange = (rowIndex: number, columnIndex: number, value: string) => {
    const updatedGridData = [...gridData];
    const dependencies = findCellDependencies(value); // find dependencies in the new value
    updatedGridData[rowIndex][columnIndex] = { value, dependencies };
    setGridData(updatedGridData);
    updateDependentCells(rowIndex, columnIndex); // update dependent cells
  };

  /**
   * Updates the dependent cells in the grid.
   *
   * @param {number} rowIndex - the row index of the cell that triggered the update.
   * @param {number} columnIndex - the column index of the cell that triggered the update.
   * @returns {void}
   */
  const updateDependentCells = (rowIndex: number, columnIndex: number) => {
    const updatedGridData = [...gridData];
    const dependentCells = findDependentCells(rowIndex, columnIndex);
    dependentCells.forEach(([depRowIndex, depColumnIndex]) => {
      const cellData = updatedGridData[depRowIndex][depColumnIndex];
      const evaluatedValue = evaluateExpression(cellData.value);
      if (evaluatedValue !== cellData.value) {
        cellData.value = evaluatedValue;
        updateDependentCells(depRowIndex, depColumnIndex); // recursive update for dependent cells
      }
    });
    setGridData(updatedGridData);
  };

  /**
   * Evaluates the expression in a cell value.
   *
   * @param {string} expression - the expression to be evaluated.
   * @returns {string} the evaluated value of the expression.
   */
  const evaluateExpression = (expression: string): string => {
    if (expression.startsWith('=')) {
      try {
        const result = evaluateFormula(expression, gridData.map(row => row.map(cell => cell.value)));

        if (result !== null) {
          return result.toString();
        }
      } catch (error) {
        console.error('Error evaluating formula:', error);
        setError(`${error}`);
        return '#ERROR';
      }
    }
    return expression;
  };

  /**
   * Evaluates the value of a cell that starts with an equals sign (=).
   * It replaces cell references with their corresponding values and evaluates the expression.
   *
   * @param {string} value - the value of the cell to evaluate.
   * @returns {string} the evaluated value of the cell.
   */
  const evaluateCellValue = (value: string): string => {
    if (value.startsWith('=')) {
      const expression = value.slice(1);
      try {
        const evaluatedValue = evaluateFormula(expression, gridData.map(row => row.map(cell => cell.value)));
        if (evaluatedValue !== null) {
          return evaluatedValue.toString();
        }
      } catch (error) {
        console.error('Error evaluating formula:', error);
        setError(`${error}`);
        return '#ERROR';
      }
    }
    return value;
  };

  /**
   * Evaluates a formula in a cell value with headers (e.g., A1, B2).
   * It replaces cell references with their corresponding values from the grid.
   *
   * @param {string} formula - the formula to evaluate.
   * @param {CellData[][]} gridData - the 2D array representing the grid data.
   * @returns {number|null} the evaluated result of the formula, or null if an error occurs.
   */
  const evaluateFormulaWithHeaders = (formula: string, gridData: CellData[][]): number | null => {
    const columnHeaders = Array.from({ length: columns }, (_, index) => String.fromCharCode(65 + index));
    const rowHeaders = Array.from({ length: rows }, (_, index) => index + 1);

    const columnRefs = columnHeaders.map((header) => rowHeaders.map((row) => `${header}${row}`)).flat();
    const columnRefRegex = new RegExp(`(${columnRefs.join('|')})`, 'g');

    const evaluatedFormula = formula.replace(columnRefRegex, (match) => {
      const columnIndex = columnHeaders.indexOf(match[0]);
      const rowIndex = parseInt(match.slice(1)) - 1;
      return gridData[rowIndex] && gridData[rowIndex][columnIndex] ? gridData[rowIndex][columnIndex].value : '';
    });

    try {
      return evaluateFormula(evaluatedFormula, gridData.map(row => row.map(cell => cell.value)));
    } catch (error) {
      console.error('Error evaluating formula:', error);
      setError(`${error}`);
      return null;
    }
  };

  /**
   * Finds cell dependencies from a given value that contains cell references (e.g., A1, B2).
   *
   * @param {string} value - the value to search for cell references.
   * @returns {string[]} an array of cell references found in the value.
   */
  const findCellDependencies = (value: string): string[] => {
    const cellRefs = value.match(/[A-Z]+\d+/g) || [];
    return cellRefs;
  };

  /**
   * Finds dependent cells in the grid for a given cell position.
   *
   * @param {number} rowIndex - the row index of the cell to find dependent cells for.
   * @param {number} columnIndex - the column index of the cell to find dependent cells for.
   * @returns {[number, number][]} an array of [rowIndex, columnIndex] pairs representing dependent cells.
   */
  const findDependentCells = (rowIndex: number, columnIndex: number): [number, number][] => {
    const updatedGridData = [...gridData];
    const dependentCells: [number, number][] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellData = updatedGridData[i][j];
        if (cellData.dependencies.includes(`${String.fromCharCode(65 + columnIndex)}${rowIndex + 1}`)) {
          dependentCells.push([i, j]);
        }
      }
    }

    return dependentCells;
  };

  /**
   * Handles the change of cell value in the grid and saves the spreadsheet.
   *
   * @param {number} rowIndex - the row index of the cell being changed.
   * @param {number} columnIndex - the column index of the cell being changed.
   * @param {string} value - the new value of the cell.
   * @returns {void}
   */
  const handleCellChange = (rowIndex: number, columnIndex: number, value: string) => {
    handleCellValueChange(rowIndex, columnIndex, value);
    saveSpreadsheet();
  };

  /**
   * Saves the current grid data as a CSV file via an API endpoint.
   * Displays success, error, and processing messages based on the API response.
   *
   * @returns {void}
   */
  const saveSpreadsheet = async () => {
    try {
      setProcessing(true);
      const response = await axios.post('http://localhost:8082/save', { data: convertGridToCSV() });

      if (response.status === 200) {
        if (response.data.status === 'DONE') {
          setProcessing(false);
          setDone(true);
          setProcessingDoneAt('');
        } else if (response.data.status === 'IN_PROGRESS') {
          setProcessingDoneAt(response.data.done_at);
          pollStatus(response.data.id);
        }
      }
    } catch (error) {
      setError(`${error}`);
      setProcessing(false);
      setDone(false);
      setProcessingDoneAt('');
    }
  };

  /**
   * Polls the status of the API request for saving the spreadsheet.
   * Handles processing and completion messages.
   *
   * @param {string} id - the ID of the API request.
   * @returns {void}
   */
  const pollStatus = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8082/get-status?id=${id}`);

      if (response.status === 200) {
        if (response.data.status === 'DONE') {
          setProcessing(false);
          setDone(true);
          setProcessingDoneAt('');
        } else if (response.data.status === 'IN_PROGRESS') {
          setProcessingDoneAt(response.data.done_at);
          setTimeout(() => pollStatus(id), 2000); // Poll every 2 seconds
        }
      }
    } catch (error) {
      setError(`Error polling status ${error}`);
      setProcessing(false);
      setDone(false);
      setProcessingDoneAt('');
    }
  };

  /**
   * Converts the grid data to a CSV string.
   *
   * @returns {string} the CSV string representing the grid data.
   */
  const convertGridToCSV = () => {
    let csv = '';
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const value = gridData[i][j].value;
        csv += value + ',';
      }
      csv += '\n';
    }
    return csv;
  };
  
  /**
   * Renders the cells in the grid based on the search query.
   *
   * @returns {JSX.Element[]} an array of JSX elements representing the cells in the grid.
   */
  const renderCells = () => {
    const cells = [];
    const columnHeaders = Array.from({ length: columns }, (_, index) =>
      String.fromCharCode(65 + index)
    ); // A, B, ...
    cells.push(
      <div className="row" key="header" data-testid="header-row">
        {columnHeaders.map((header, index) => (
          <div className="cell header" key={index}>
            {header}
          </div>
        ))}
      </div>
    );
  
    // filter rows based on search query
    const filteredRows = gridData.filter((rowData) =>
      rowData.some((cellData) =>
        cellData.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  
    // render cells for the filtered rows
    for (let i = 0; i < filteredRows.length; i++) {
      const row = [];
      const rowData = filteredRows[i];
  
      for (let j = 0; j < columns; j++) {
        const cellData = rowData[j];
        const value = cellData.value;
        const evaluatedValue = evaluateCellValue(value);

        const isHighlighted = searchQuery ? evaluatedValue.toLowerCase().includes(searchQuery.toLowerCase()) : false;

        row.push(
          <Cell
            key={`${i}-${j}`}
            value={evaluatedValue}
            onChange={(value) => handleCellChange(i, j, value)}
            evaluateFormula={(formula) => evaluateFormulaWithHeaders(formula, gridData)}
            updateDependentCells={() => updateDependentCells(i, j)}
            highlight={isHighlighted}
          />
        );
      }
  
      cells.push(<div className="row" key={i} data-testid={`row-${i}`}>{row}</div>);
    }
  
    return cells;
  };

  /**
   * Handles the search query entered in the SearchBar component.
   *
   * @param {string} query - the search query entered by the user.
   * @returns {void}
   * @example
   * // Example usage of handleSearch in Grid component
   * import React, { useState } from 'react';
   * import Grid from './Grid';
   *
   * const MySpreadsheetApp = () => {
   *   const [searchQuery, setSearchQuery] = useState('');
   *
   *   const handleSearch = (query) => {
   *     setSearchQuery(query);
   *   };
   *
   *   return (
   *     <div>
   *       <SearchBar onChange={handleSearch} />
   *       <Grid rows={10} columns={5} searchQuery={searchQuery} />
   *     </div>
   *   );
   * };
   *
   * export default MySpreadsheetApp;
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="grid">
        <SearchBar onChange={handleSearch} />
        {renderCells()}
      </div>

      {processing && (
        <div className="processing">
          <p>Processing...</p>
          {processingDoneAt && <p>Expected completion time: {processingDoneAt}</p>}
        </div>
      )}
      {done && (
        <div className="success">
          <p>Sucessfully saved</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {/* display a message when no results found */}
      {searchQuery && gridData.every((row) => !row.some((cell) => cell.value.includes(searchQuery))) && (
        <p className='hide-message'>No matching cells found.</p>
      )}
    </>
  );
};

export default Grid;
