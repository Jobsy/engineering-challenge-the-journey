import { evaluateFormula } from './formulas';

describe('evaluateFormula', () => {

  it('should return null for an invalid formula', () => {
    const formula = 'A + B1';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBeNull();
  });

  it('should evaluate a valid formula', () => {
    const formula = 'A1 + A2';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(5);
  });

  it('should evaluate a valid formula - Addition', () => {
    const formula = 'A1 + A2';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(5);
  });

  it('should evaluate a valid formula - Subtraction', () => {
    const formula = 'A1 - A2';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(-3); 
  });

  it('should evaluate a valid formula - Division', () => {
    const formula = 'A1 / A2';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(0.25);
  });

  it('should evaluate a valid formula - Multiplication', () => {
    const formula = 'A1 * A2';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(4);
  });

  it('should handle NaN', () => {
    const formula = '0 / 0';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBeNull();
  });

  it('should handle Infinity', () => {
    const formula = '1 / 0';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(Infinity);
  });

  it('should handle negative Infinity', () => {
    const formula = '-1 / 0';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(-Infinity);
  });

  it('should handle a formula with parentheses', () => {
    const formula = '(A1 + A2) * 2';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(10);
  });

  it('should handle empty grid data', () => {
    const formula = 'A1 + A3';
    const gridData: string[][] = [];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBeNull();
  });

  it('should handle empty cell values', () => {
    const formula = 'A1 + A3';
    const gridData: string[][] = [['', '', ''], ['', '', '']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(0);
  });

  it('should handle invalid cell references', () => {
    const formula = 'A + A4';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBeNull();
  });

  it('should evaluate a formula with complex expression', () => {
    const formula = '(A1 + A3) * 2 + 5';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(7);
  });

  it('should handle formula with negative numbers', () => {
    const formula = '(A1 + A3) - 10';
    const gridData: string[][] = [['1', '2', '3'], ['4', '5', '6']];
    const result = evaluateFormula(formula, gridData);
    expect(result).toBe(-9);
  });
});
