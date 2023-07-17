import { atom } from "jotai";

export const drawerOpenAtom = atom(false);

export const mobileAppBarAtom = atom<{
  showPrev: boolean;
  content: string;
  showMenu: boolean;
  menuIcon?: "default" | "dots";
  onClick?: () => void;
}>({
  showPrev: false,
  content: "",
  showMenu: true,
  menuIcon: "default",
  onClick: undefined,
});
