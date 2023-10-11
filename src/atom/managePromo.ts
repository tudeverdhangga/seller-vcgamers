import { atom } from "jotai";
import type { Promo } from "~/services/managePromo/types";

export const rejectedDialogAtom = atom<{
  isOpen: boolean;
  promoId?: string;
}>({ isOpen: false });

export const deleteDialogAtom = atom<{
  isOpen: boolean;
  promoId?: string;
}>({ isOpen: false });

export const cancelDialogAtom = atom<{
  isOpen: boolean;
  promoId?: string;
}>({ isOpen: false });

export const disableDialogAtom = atom(false);

export const performanceDialogAtom = atom<{
  isOpen: boolean;
  promoId?: string;
}>({ isOpen: false });

export const managePromoFormAtom = atom<
  | {
      isOpen: boolean;
      type?: "create";
      promoId?: string;
      promo?: Promo;
    }
  | {
      isOpen: boolean;
      type?: "reuse" | "edit" | "disabled";
      promoId: string;
      promo: Promo;
    }
>({ isOpen: false, type: "create" });

export const codeConfirmAtom = atom(false);
