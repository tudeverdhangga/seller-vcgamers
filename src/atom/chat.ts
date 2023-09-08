import { atom } from "jotai";

export const messageAttachmentShowAtom = atom(false);

export const messageTextAtom = atom<string | undefined>(undefined);
