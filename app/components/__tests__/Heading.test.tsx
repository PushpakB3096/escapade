import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../Heading';

describe('Heading component', () => {
  const headingTitle = 'This is a heading';
  const headingSubtitle = 'This is a subtitle';

  test('Heading with the correct title renders', () => {
    const { getByText } = render(<Heading title={headingTitle} />);
    const headingElement = getByText(headingTitle);

    expect(headingElement).toBeInTheDocument();
  });

  test('Heading with the correct subtitle renders', () => {
    const { getByText } = render(
      <Heading title={headingTitle} subtitle={headingSubtitle} />
    );
    const headingElement = getByText(headingSubtitle);

    expect(headingElement).toBeInTheDocument();
  });

  test('Heading with center alignment renders', () => {
    const { getByText } = render(<Heading title={headingTitle} center />);
    const headingElement = getByText(headingTitle);

    expect(headingElement.parentElement).toHaveClass('text-center');
  });
});
