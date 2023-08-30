import React from 'react';
import { render } from '@testing-library/react';
import Button from '../app/components/Button';

describe('Button component', () => {
  test('default button renders', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button label='Click me' onClick={onClickMock} />
    );

    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('outline button renders', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button label='Click me' onClick={onClickMock} outline />
    );

    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('small button renders', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button label='Click me' onClick={onClickMock} small />
    );

    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('disabled button renders', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button label='Click me' onClick={onClickMock} disabled />
    );

    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDisabled();
  });
});
