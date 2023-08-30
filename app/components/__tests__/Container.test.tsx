import React from 'react';
import { render } from '@testing-library/react';
import Container from '../Container';
import Button from '../Button';

describe('Container component', () => {
  test('child renders', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Button label='Click me' onClick={onClickMock} />,
      {
        wrapper: Container
      }
    );
    const buttonElement = getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });
});
