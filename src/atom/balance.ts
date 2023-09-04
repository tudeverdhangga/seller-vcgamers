import { atom } from "jotai";

export const rejectedDialogAtom = atom<{ isOpen: boolean; detail?: string }>({
  isOpen: false,
});

export const holdDialogAtom = atom<{ isOpen: boolean; detail?: string }>({
  isOpen: false,
});

export const confirmationDialogOpenAtom = atom(false);

export const pinDialogOpenAtom = atom(false);

export const pinRateLimitAtom = atom(false);
