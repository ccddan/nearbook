import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

test("renders learn react link", () => {
  render(<p>App</p>);
  const linkElement = screen.getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});
