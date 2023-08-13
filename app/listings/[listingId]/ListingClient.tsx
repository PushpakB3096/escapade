'use client';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import ListingReservation from '@/app/components/Listings/ListingReservation';
import { categories, initialDateRange } from '@/app/global/constants';
import { SafeListing, SafeReservation, SafeUser } from '@/app/global/types';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservation?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservation = []
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModal();
  const router = useRouter();

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);

        router.push('/trips');
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing?.id,
    loginModal,
    router,
    totalPrice
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservation]);

  const category = useMemo(() => {
    return categories.find(category => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div
        className='
          max-w-screen-lg 
          mx-auto
        '
      >
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div
            className='
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            '
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

            <div
              className='
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              '
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={value => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
