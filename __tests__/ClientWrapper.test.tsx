import React from 'react';
import { render } from '@testing-library/react';
import Button from '../app/components/Button';
import ClientWrapper from '../app/components/ClientWrapper';

describe('ClientWrapper component', () => {
  test('child renders', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Button label='Click me' onClick={onClickMock} />,
      {
        wrapper: ClientWrapper
      }
    );
    const buttonElement = getByRole('button');

    expect(buttonElement).toBeInTheDocument();
  });
});
