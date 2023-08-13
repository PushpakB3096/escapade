'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeListing, SafeUser } from '../global/types';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listings/ListingCard';

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  listings
}) => {
  const [deletingId, setDeletingId] = useState<string>('');
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(err => {
          const errMsg = err?.response?.data?.error;
          toast.error(errMsg || 'Something went wrong');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Favorites' subtitle='List of places you have favorited' />

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
