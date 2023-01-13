import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders home page', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login Page/i);
  expect(linkElement).toBeInTheDocument();
});
