import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from './index';


describe('Home', () => {
  it('renders the home page with grid', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Your Personal Staking Calculator/i);
    expect(headingElement).toBeInTheDocument();
  });
});
