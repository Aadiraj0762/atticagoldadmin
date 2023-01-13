import { render, screen } from '@testing-library/react';
import Signup from './Signup';

test('renders home page', () => {
  render(<Signup />);
  const linkElement = screen.getByText(/Signup Page/i);
  expect(linkElement).toBeInTheDocument();
});
