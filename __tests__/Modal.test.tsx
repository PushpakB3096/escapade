import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Modal from '../app/components/Modals/Modal';

describe('Modal component', () => {
  test('renders by default', () => {
    const { getByTestId } = render(
      <Modal
        isOpen={true}
        actionLabel={''}
        onClose={() => jest.fn()}
        onSubmit={() => jest.fn()}
      />
    );

    const modalElement = getByTestId('modal');
    expect(modalElement).toBeInTheDocument();
  });

  test('renders title', () => {
    const modalTitle = 'Modal Title';

    const { getByText } = render(
      <Modal
        isOpen={true}
        actionLabel={''}
        title={modalTitle}
        onClose={() => jest.fn()}
        onSubmit={() => jest.fn()}
      />
    );

    const modalElement = getByText(modalTitle);
    expect(modalElement).toBeInTheDocument();
  });

  test('closes the modal correctly', async () => {
    user.setup();
    const onClose = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        actionLabel={''}
        onClose={onClose}
        onSubmit={() => jest.fn()}
      />
    );

    const modalElement = getByTestId('modal');
    expect(modalElement).toBeInTheDocument();

    const closeBtnElement = getByTestId('close-icon');
    expect(closeBtnElement).toBeInTheDocument();

    await user.click(closeBtnElement);

    waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('clicks on submit button correctly', async () => {
    user.setup();
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        actionLabel={''}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    const modalElement = getByTestId('modal');
    expect(modalElement).toBeInTheDocument();

    const submitBtn = getByTestId('submit-btn');
    expect(submitBtn).toBeInTheDocument();

    await user.click(submitBtn);

    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('renders secondary button correctly', async () => {
    user.setup();
    const onClose = jest.fn();
    const secondaryActionLabel = 'Cancel';

    const { getByTestId, getByRole } = render(
      <Modal
        isOpen={true}
        actionLabel={''}
        onClose={onClose}
        onSubmit={onClose}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={onClose}
      />
    );

    const modalElement = getByTestId('modal');
    expect(modalElement).toBeInTheDocument();

    const secondaryBtn = getByRole('button', { name: secondaryActionLabel });
    expect(secondaryBtn).toBeInTheDocument();

    await user.click(secondaryBtn);

    waitFor(() => {
      expect(secondaryBtn).toHaveBeenCalledTimes(1);
    });
  });
});
