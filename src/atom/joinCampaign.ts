import { atom } from "jotai";

export const confirmationDialogOpenAtom = atom(false);

export const cancelDialogOpenAtom = atom(false);

export const rejectedDialogOpenAtom = atom(false);

export const detailDialogAtom = atom<{
  isOpen: boolean;
  campaign?: {
    imageUrl: string;
    name: string;
    period: string;
    deadline: string;
    isJoined: boolean;
    isExpired: boolean;
  };
}>({ isOpen: false });
