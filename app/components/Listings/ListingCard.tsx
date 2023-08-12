'use client';

import { SafeListing, SafeUser } from '@/app/global/types';
import useCountries from '@/app/hooks/useCountries';
import {  Reservation } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  currentUser: SafeUser | null;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  currentUser,
  data,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationData = useMemo(() => {
    if (!reservation) return null;

    const startData = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startData, 'PP')} - ${format(endDate, 'PP')}`;
  }, [reservation]);

  const location = getByValue(data.locationValue);

  return (
    <div
      className='col-span-1 cursor-pointer group'
      onClick={() => router.push(`/listing/${data.id}`)}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            fill
            src={data.imageSrc}
            alt='Listing'
            className='object-cover h-full w-full transition group-hover:scale-110'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>

        <div className='font-light text-neutral-500'>
          {reservationData || data.category}
        </div>

        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>₹{price}</div>
          {!reservation && <div className='font-light'>per night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
