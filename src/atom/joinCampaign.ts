import { atom } from "jotai";
import type { CampaignHistory, Campaign } from "~/services/joinCampaign/types";

export const confirmationDialogOpenAtom = atom(false);

export const cancelDialogOpenAtom = atom<{
  isOpen: boolean;
  campaign?: CampaignHistory;
}>({ isOpen: false });

export const rejectedDialogOpenAtom = atom<{
  isOpen: boolean;
  campaign?: CampaignHistory;
}>({ isOpen: false });

export const detailDialogAtom = atom<{
  isOpen: boolean;
  campaign?: Campaign;
}>({ isOpen: false });
