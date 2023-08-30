import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import MenuItem from '../app/components/Navbar/MenuItem';

describe('MenuItem component', () => {
  const labelText = 'Menu Item';
  const mockedFn = jest.fn();

  test('renders by default', () => {
    const { getByText } = render(
      <MenuItem label={labelText} onClick={mockedFn} />
    );

    const menuItemElement = getByText(labelText);
    expect(menuItemElement).toBeInTheDocument();
  });

  test('handles click event', async () => {
    user.setup();

    const { getByText } = render(
      <MenuItem label={labelText} onClick={mockedFn} />
    );

    const menuItemElement = getByText(labelText);
    expect(menuItemElement).toBeInTheDocument();

    await user.click(menuItemElement);

    expect(mockedFn).toBeCalledTimes(1);
  });
});
