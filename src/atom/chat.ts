import { atom } from "jotai";

export const messageAttachmentAtom = atom<{ show: boolean; url?: string }>({
  show: false,
});

export const messageTextAtom = atom<string | undefined>(undefined);
