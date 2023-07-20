import { atom } from "jotai";

export const rejectedDialogOpenAtom = atom(false);

export const deleteDialogOpenAtom = atom(false);

export const disableDialogOpenAtom = atom(false);

export const performanceDialogOpenAtom = atom(false);

export const managePromoFormAtom = atom<{
  isOpen: boolean;
  type?: "create" | "edit" | "reuse" | "disabled";
}>({ isOpen: false, type: "create" });
