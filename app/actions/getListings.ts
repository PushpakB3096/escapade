import prisma from '@/app/libs/primsadb';

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params?: IListingParams) {
  try {
    let query: any = {};
    if (params) {
      const {
        userId,
        bathroomCount,
        category,
        endDate,
        guestCount,
        locationValue,
        roomCount,
        startDate
      } = params;

      if (userId) {
        query.userId = userId;
      }

      if (category) {
        query.category = category;
      }

      if (locationValue) {
        query.locationValue = locationValue;
      }

      if (guestCount) {
        query.guestCount = {
          gte: +guestCount
        };
      }

      if (bathroomCount) {
        query.bathroomCount = {
          gte: +bathroomCount
        };
      }

      if (roomCount) {
        query.roomCount = {
          gte: +roomCount
        };
      }

      if (startDate && endDate) {
        query.NOT = {
          reservation: {
            some: {
              OR: [
                // if there is a single date in the existing reservations, we will filter it out because we can't create a full booking on that.
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate }
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate }
                }
              ]
            }
          }
        };
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
