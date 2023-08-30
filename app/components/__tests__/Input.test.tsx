import React from 'react';
import { render } from '@testing-library/react';
import Input from '../Inputs/Input';

describe('Input component', () => {
  test('renders by default', () => {
    const { getByLabelText } = render(
      <Input id='test-input' label='First Name' />
    );
    const inputElement = getByLabelText('First Name');

    expect(inputElement).toBeInTheDocument();
  });

  test('renders pricing', () => {
    const { getByLabelText } = render(
      <Input id='test-input' label='Price' formatPrice />
    );
    const inputElement = getByLabelText('Price');

    expect(inputElement).toBeInTheDocument();
  });

  test('renders styles for errors', () => {
    const inputId = 'test-input';

    const { getByLabelText } = render(
      <Input
        id={inputId}
        label='Price'
        errors={{
          [inputId]: {
            message: {}
          }
        }}
      />
    );
    const inputElement = getByLabelText('Price');

    expect(inputElement).toBeInTheDocument();
  });
});
