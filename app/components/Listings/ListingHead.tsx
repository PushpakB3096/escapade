'use client';

import { SafeUser } from '@/app/global/types';
import useCountries from '@/app/hooks/useCountries';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden relative rounded-lg'>
        <Image
          src={imageSrc}
          alt='image'
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
