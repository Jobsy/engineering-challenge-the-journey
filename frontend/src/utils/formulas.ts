// // todo - why mathjs
import { create, all } from 'mathjs';

/**
 * Create a math instance with all available functions.
 */
const math = create(all);

/**
 * Evaluate a mathematical formula with cell references using mathjs.
 * @param {string} formula - The mathematical formula to be evaluated.
 * @param {string[][]} gridData - The 2D array representing the data grid containing cell values.
 * @returns {number | null} - The evaluated result of the formula, or null if evaluation fails.
 */
export const evaluateFormula = (formula: string, gridData: string[][]): number | null => {
  try {
    const columnHeaders = Array.from({ length: gridData[0].length }, (_, index) => String.fromCharCode(65 + index));

    // replace cell references with their values
    const evaluatedFormula = formula.replace(/[A-Z]+\d+/g, (cellReference) => {
      const columnIndex = columnHeaders.indexOf(cellReference[0]);
      const rowIndex = parseInt(cellReference.slice(1)) - 1;
      return gridData[rowIndex] && gridData[rowIndex][columnIndex] ? gridData[rowIndex][columnIndex] : '0';
    });

    // Strip off currency symbols while preserving other symbols
    const sanitizedFormula = evaluatedFormula.replace(/[₦$€£¥₹]/g, '');

    if (sanitizedFormula.startsWith('=')) {
      return null;
    }

    const result = math.evaluate(sanitizedFormula); // evaluate the formula using mathjs
    return typeof result === 'number' && !Number.isNaN(result) ? result : null;
  } catch (error) {
    console.error(`Error evaluating formula: ${error}`);
    return null;
  }
};
