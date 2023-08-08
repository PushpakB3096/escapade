import { create } from 'zustand';
import { NoOp } from '../global/types';

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: NoOp;
  onClose: NoOp;
}

const useRegisterModal = create<RegisterModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useRegisterModal;
