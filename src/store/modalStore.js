import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  postId: '',
  setOpen: (isOpen) => set({ isOpen }),
  setPostId: (postId) => set({ postId }),
   refresh: 0,
  incrementRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
}));
