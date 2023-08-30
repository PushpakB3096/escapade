import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Counter from '../Inputs/Counter';

describe('Counter component', () => {
  const title = 'This is a test title';
  const subtitle = 'This is a test subtitle';

  test('renders by default', () => {
    const { getByText } = render(
      <Counter
        title={title}
        subtitle={subtitle}
        value={0}
        onChange={jest.fn()}
      />
    );
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();

    const subtitleElement = getByText(subtitle);
    expect(subtitleElement).toBeInTheDocument();

    const valueElement = getByText(0);
    expect(valueElement).toHaveTextContent('0');
  });

  test('correctly handles increment', async () => {
    user.setup();
    let currentValue = 1;

    const handleChange = (newValue: number) => {
      currentValue = newValue;
    };

    const { getByTestId } = render(
      <Counter
        title={title}
        subtitle={subtitle}
        value={currentValue}
        onChange={handleChange}
      />
    );

    const incrementElement = getByTestId('increment-btn');
    expect(incrementElement).toBeInTheDocument();

    await user.click(incrementElement);

    waitFor(() => {
      const valueElement = getByTestId('value-elem');
      expect(valueElement).toHaveTextContent(`${currentValue}`);
    });
  });

  test('correctly handles decrement', async () => {
    user.setup();
    let currentValue = 5;

    const handleChange = (newValue: number) => {
      currentValue = newValue;
    };

    const { getByTestId } = render(
      <Counter
        title={title}
        subtitle={subtitle}
        value={currentValue}
        onChange={handleChange}
      />
    );

    const incrementElement = getByTestId('decrement-btn');
    expect(incrementElement).toBeInTheDocument();

    await user.click(incrementElement);

    waitFor(() => {
      const valueElement = getByTestId('value-elem');
      expect(valueElement).toHaveTextContent(`${currentValue}`);
    });
  });

  test('correctly handles decrement below 1', async () => {
    user.setup();
    let currentValue = 1;

    const handleChange = (newValue: number) => {
      currentValue = newValue;
    };

    const { getByTestId } = render(
      <Counter
        title={title}
        subtitle={subtitle}
        value={currentValue}
        onChange={handleChange}
      />
    );

    const incrementElement = getByTestId('decrement-btn');
    expect(incrementElement).toBeInTheDocument();

    await user.click(incrementElement);

    waitFor(() => {
      const valueElement = getByTestId('value-elem');
      expect(valueElement).toHaveTextContent(`${currentValue}`);
    });
  });
});
