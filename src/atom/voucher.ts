import { atom } from "jotai";

export const pinRateLimitAtom = atom(false);

export const withdrawReason = atom<{
  status: number;
  pulled_reason: string;
  voucher_id: string;
}>({
  status: 3,
  pulled_reason: "Kode terjual diluar VCGamers",
  voucher_id: ""
});

export const voucherCode = atom<string>("")

export const checkVoucher = atom<{
  isDisable: boolean;
  isValidate: boolean;
  isDuplicate: boolean;
  vouchers: string;
  total: number
}>({
  isDisable: false,
  isValidate: false,
  isDuplicate: false,
  vouchers: "",
  total: 0
})

export const isSuccessCreateVoucher = atom(false)