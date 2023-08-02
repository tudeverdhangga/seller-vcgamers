import { atom } from "jotai";

export const messageAttachmentShowAtom = atom(false);

export const messagesAtom = atom<
  | { id: string; name: string; text: string; unread?: number; time: string }[]
  | undefined
>([
  {
    id: "123",
    name: "Akm47 St",
    text: "Terimakasih banyak ya sudah bisa login lagi se...",
    unread: 1,
    time: "15:36",
  },
  {
    id: "234",
    name: "Akm47 St",
    text: "Terimakasih banyak ya sudah bisa login lagi se...",
    time: "15:36",
  },
]);
