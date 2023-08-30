import getCurrentUser from './actions/getCurrentUser';
import getListings, { IListingParams } from './actions/getListings';
import ClientWrapper from './components/ClientWrapper';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/Listings/ListingCard';
import { SafeListing } from './global/types';

interface HomeProps {
  searchParams: IListingParams;
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientWrapper>
        <EmptyState showReset />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((listing: SafeListing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientWrapper>
  );
};

export default Home;
