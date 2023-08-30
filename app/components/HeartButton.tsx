'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../global/types';
import useFavorite from '../hooks/useFavorite';
import { MoonLoader } from 'react-spinners';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId
}) => {
  const { hasFavorited, toggleFavorite, isLoading } = useFavorite({
    listingId,
    currentUser
  });

  return (
    <div
      onClick={toggleFavorite}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      {isLoading ? (
        <MoonLoader className='fill-white absolute -top-[2px] -right-[2px]' />
      ) : (
        <>
          <AiOutlineHeart
            size={28}
            className='fill-white absolute -top-[2px] -right-[2px]'
          />
          <AiFillHeart
            size={24}
            className={hasFavorited ? 'fill-[#7CA2DE]' : 'fill-neutral-500/70'}
          />
        </>
      )}
    </div>
  );
};

export default HeartButton;
