import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientWrapper from '@/app/components/ClientWrapper';
import EmptyState from '@/app/components/EmptyState';
import getReservations from '@/app/actions/getReservations';
import ReservationClient from './ReservationClient';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientWrapper>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientWrapper>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <ClientWrapper>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservations on your property'
        />
      </ClientWrapper>
    );
  }

  return (
    <ClientWrapper>
      <ReservationClient
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientWrapper>
  );
};

export default ReservationPage;
