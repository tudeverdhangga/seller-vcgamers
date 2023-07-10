import { atom } from "jotai";

export const drawerOpenAtom = atom(false);

export const mobileAppBarAtom = atom({
  showPrev: false,
  content: "",
  showMenu: true,
});
