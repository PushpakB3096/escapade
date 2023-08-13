import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientWrapper from '@/app/components/ClientWrapper';
import EmptyState from '@/app/components/EmptyState';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientWrapper>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientWrapper>
    );
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <ClientWrapper>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorite listings'
        />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientWrapper>
  );
};

export default FavoritesPage;
