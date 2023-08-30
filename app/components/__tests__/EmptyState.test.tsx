import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import EmptyState from '../EmptyState';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'), // Keep all actual exports
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('EmptyState component', () => {
  const title = 'This is a heading';
  const subtitle = 'This is a subtitle';

  test('EmptyState with the default props renders', () => {
    const { getByText } = render(<EmptyState />);
    const headingElement = getByText('No exact match');

    expect(headingElement).toBeInTheDocument();
  });

  test('EmptyState with the correct title renders', () => {
    const { getByText } = render(<EmptyState title={title} />);
    const headingElement = getByText(title);

    expect(headingElement).toBeInTheDocument();
  });

  test('EmptyState with the correct subtitle renders', () => {
    const { getByText } = render(
      <EmptyState title={title} subtitle={subtitle} />
    );
    const headingElement = getByText(title);

    expect(headingElement).toBeInTheDocument();
  });

  test('EmptyState with reset button renders', () => {
    const { getByText, getByRole } = render(
      <EmptyState title={title} subtitle={subtitle} showReset />
    );
    const headingElement = getByText(title);

    expect(headingElement).toBeInTheDocument();

    const buttonElement = getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });

  test('EmptyState with reset button should navigate to "/"', async () => {
    user.setup();

    const { getByText, getByRole } = render(
      <EmptyState title={title} subtitle={subtitle} showReset />
    );
    const headingElement = getByText(title);
    expect(headingElement).toBeInTheDocument();

    const buttonElement = getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    await user.click(buttonElement);

    waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledTimes(1);
    });
  });
});
