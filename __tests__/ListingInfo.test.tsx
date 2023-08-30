import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ListingInfo from '../app/components/Listings/ListingInfo';

describe('ListingInfo component', () => {
  test('renders by default', () => {
    const description = 'This is a description';
    const guestCount = 2;
    const roomCount = 2;
    const bathroomCount = 1;
    const mockUser = {
      name: 'Pushpak Bhattacharya',
      email: 'rtpushpak@gmail.com',
      image: '/test',
      id: '',
      hashedPassword: '',
      favoriteIds: [],
      createdAt: '',
      updatedAt: '',
      emailVerified: ''
    };

    const { getByTestId } = render(
      <ListingInfo
        user={mockUser}
        description={description}
        guestCount={guestCount}
        roomCount={roomCount}
        bathroomCount={bathroomCount}
        locationValue={''}
        category={undefined}
      />
    );

    const listingElement = getByTestId('listing-info');

    waitFor(() => {
      expect(listingElement).toBeInTheDocument();
    });
  });
});
