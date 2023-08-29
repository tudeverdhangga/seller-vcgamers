import { atom } from "jotai";
import { type DataNotification } from "~/services/notification/types";

export const notificationDetailAtom = atom<{
  isOpen: boolean;
  notification?: DataNotification;
}>({ isOpen: false });
