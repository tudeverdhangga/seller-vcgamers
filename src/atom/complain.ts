import { atom } from "jotai";

export const messageAttachmentShowAtom = atom(true);

export const mobileInfoSidebarAtom = atom(false);

export const complainListAtom = atom<
  | {
      id: string;
      name: string;
      transactionId: string;
      transactionName: string;
      complain: string;
      unread?: boolean;
      time: string;
      type: "completed" | "in-process";
    }[]
  | undefined
>([
  {
    id: "123",
    name: "Golang Store",
    transactionId: "TRX0D-1361361361121-1121-21251",
    transactionName: "300 APEX Coins",
    complain:
      "Alasan Komplain Coin tidak masuk ke akun saya dan saya sudah memasukan keterangan akun pada saat checkout. Mohon balasannya segera, saya mau segera pakai ",
    unread: true,
    time: "29 Feb 2021 19:00",
    type: "in-process",
  },
  {
    id: "234",
    name: "Ravi Voucher Shop",
    transactionId: "TRX0D-1361361361121-1121-21251",
    transactionName: "300 APEX Coins",
    complain:
      "Alasan Komplain Coin tidak masuk ke akun saya dan saya sudah memasukan keterangan akun pada saat checkout. Mohon balasannya segera, saya mau segera pakai ",
    time: "29 Feb 2021 19:00",
    type: "completed",
  },
]);
