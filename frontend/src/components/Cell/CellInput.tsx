import React from 'react';


interface CellInputProps {
  value: string;
  onChange: (newValue: string) => void;
  onBlur: () => void;
  autoFocus?: boolean;
}

const CellInput: React.FC<CellInputProps> = ({ 
    value, 
    onChange, 
    onBlur, 
    autoFocus 
  }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      data-testid="input"
    />
  );
};

export default CellInput;
