import { atom } from "jotai";

export const messageAttachmentAtom = atom<{
  show: boolean;
  url?: string;
  type?: "IMAGE" | "VIDEO" | "DOCUMENT";
}>({
  show: false,
});

export const messageTextAtom = atom<string | undefined>(undefined);
