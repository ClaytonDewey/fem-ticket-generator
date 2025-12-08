import { create } from 'zustand';
import { generatePaddedRandomNumber } from '../util';

interface TicketState {
  avatar: string;
  name: string;
  email: string;
  gitUser: string;
  ticketNum: string;
  isSubmitted?: boolean;

  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setGitUser: (gitUser: string) => void;
  setTicketNum: (ticketNum: string) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const useTicketStore = create<TicketState>((set) => ({
  avatar: '',
  name: '',
  email: '',
  gitUser: '',
  ticketNum: generatePaddedRandomNumber(),
  isSubmitted: false,
  setAvatar: (avatar: string) => set({ avatar }),
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setGitUser: (gitUser: string) => set({ gitUser }),
  setTicketNum: (ticketNum: string) => set({ ticketNum }),
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),
}));

export default useTicketStore;
