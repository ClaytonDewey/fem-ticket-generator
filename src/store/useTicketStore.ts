import { create } from 'zustand';

interface TicketState {
  avatar: string;
  name: string;
  email: string;
  gitUser: string;
  ticketNum: number;

  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;

  setGitUser: (gitUser: string) => void;
  setTicketNum: (ticketNum: number) => void;
}

const useTicketStore = create<TicketState>((set) => ({
  avatar: '',
  name: '',
  email: '',
  gitUser: '',
  ticketNum: 1000,
  setAvatar: (avatar: string) => set({ avatar }),
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setGitUser: (gitUser: string) => set({ gitUser }),
  setTicketNum: (ticketNum: number) => set({ ticketNum }),
}));

export default useTicketStore;
