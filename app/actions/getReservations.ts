import prisma from '@/app/libs/primsadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

interface ReservationQueryType extends Omit<IParams, 'authorId'> {
  listing?: {
    userId?: string;
  };
}

export default async function getReservations(params: IParams) {
  const { authorId, listingId, userId } = params;

  const query: ReservationQueryType = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = {
      userId: authorId
    };
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    const safeReservations = reservations.map(reservation => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.createdAt.toISOString()
      }
    }));
    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
