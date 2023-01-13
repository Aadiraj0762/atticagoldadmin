import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders home page', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Home Page/i);
  expect(linkElement).toBeInTheDocument();
});
