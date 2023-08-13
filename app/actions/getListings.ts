import prisma from '@/app/libs/primsadb';

export interface IListingParams {
  userId?: string;
}

export default async function getListings(params?: IListingParams) {
  try {
    let query: IListingParams = {};
    if (params) {
      const { userId } = params;

      if (userId) {
        query.userId = userId;
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
