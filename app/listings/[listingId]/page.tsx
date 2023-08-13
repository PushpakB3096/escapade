import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientWrapper from '@/app/components/ClientWrapper';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientWrapper>
        <EmptyState />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientWrapper>
  );
};

export default ListingPage;
