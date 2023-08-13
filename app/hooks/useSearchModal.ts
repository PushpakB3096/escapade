import { create } from 'zustand';
import { NoOp } from '../global/types';

interface SearchModalStore {
  isOpen: boolean;
  onOpen: NoOp;
  onClose: NoOp;
}

const useSearchModal = create<SearchModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSearchModal;
