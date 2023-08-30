import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../app/components/Loader';

describe('Loader component', () => {
  test('renders by default', () => {
    const { getByTestId } = render(<Loader />);
    const headingElement = getByTestId('loader');

    expect(headingElement).toBeInTheDocument();
  });
});
