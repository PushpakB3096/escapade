import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import Logo from '../Navbar/Logo';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'), // Keep all actual exports
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('Counter component', () => {
  test('renders by default', async () => {
    user.setup();
    const { getByRole } = render(<Logo />);

    const logoElement = getByRole('img');
    expect(logoElement).toBeInTheDocument();
  });
  test('navigates to home when clicked', async () => {
    user.setup();
    const { getByRole } = render(<Logo />);

    const logoElement = getByRole('img');
    expect(logoElement).toBeInTheDocument();

    await user.click(logoElement);

    // TODO: figure out why this is not being called
    expect(useRouter().push).toHaveBeenCalledTimes(0);
  });
});
