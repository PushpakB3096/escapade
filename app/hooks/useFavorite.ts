import axios, { AxiosPromise } from 'axios';
import { useRouter } from 'next/navigation';
import { SafeUser } from '../global/types';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const url = `/api/favorites/${listingId}`;
        let method: 'post' | 'delete' = 'post';

        if (hasFavorited) {
          method = 'delete' as const;
        }

        const request = (): AxiosPromise => axios[method](url);

        setIsLoading(true);
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite, isLoading };
};

export default useFavorite;
