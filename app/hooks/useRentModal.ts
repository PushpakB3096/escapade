import { create } from 'zustand';
import { NoOp } from '../global/types';

interface RentModalStore {
  isOpen: boolean;
  onOpen: NoOp;
  onClose: NoOp;
}

const useRentModal = create<RentModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useRentModal;
