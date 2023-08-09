import { create } from 'zustand';
import { NoOp } from '../global/types';

interface LoginModalStore {
  isOpen: boolean;
  onOpen: NoOp;
  onClose: NoOp;
}

const useLoginModal = create<LoginModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useLoginModal;
