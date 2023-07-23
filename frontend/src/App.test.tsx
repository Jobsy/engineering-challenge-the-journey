import { render, screen } from '@testing-library/react';
import App from './App';


describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);

    const linkElement = screen.getByText(/Your Personal Staking Calculator/i);
    expect(linkElement).toBeInTheDocument();
  });
});
