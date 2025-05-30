import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  postId: '',
  setOpen: (isOpen) => set({ isOpen }),
  setPostId: (postId) => set({ postId }),
}));
