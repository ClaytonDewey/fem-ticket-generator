import { create } from 'zustand';

interface TicketState {
  avatar: string;
  name: string;
  email: string;
  gitUser: string;
  ticketNum: number;
  isSubmitted?: boolean;

  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setGitUser: (gitUser: string) => void;
  setTicketNum: (ticketNum: number) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const useTicketStore = create<TicketState>((set) => ({
  avatar: '',
  name: '',
  email: '',
  gitUser: '',
  ticketNum: 1000,
  isSubmitted: false,
  setAvatar: (avatar: string) => set({ avatar }),
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setGitUser: (gitUser: string) => set({ gitUser }),
  setTicketNum: (ticketNum: number) => set({ ticketNum }),
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),
}));

export default useTicketStore;
