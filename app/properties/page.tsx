import ClientWrapper from '@/app/components/ClientWrapper';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientWrapper>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientWrapper>
    );
  }

  const listings = await getListings({
    userId: currentUser.id
  });

  if (listings.length === 0) {
    return (
      <ClientWrapper>
        <EmptyState
          title='No  properties found'
          subtitle="Looks like you no properties"
        />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientWrapper>
  );
};

export default PropertiesPage;
