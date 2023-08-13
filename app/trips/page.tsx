import ClientWrapper from '@/app/components/ClientWrapper';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientWrapper>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientWrapper>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <ClientWrapper>
        <EmptyState
          title='No  trips found'
          subtitle="Looks like you haven't reserved any trips"
        />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientWrapper>
  );
};

export default TripsPage;
