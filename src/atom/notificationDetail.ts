import { atom } from "jotai";

export const notificationDetailOpenAtom = atom(false);

export const notificationDetailAtom = atom<{
  title: string;
  body: string;
} | null>(null);
