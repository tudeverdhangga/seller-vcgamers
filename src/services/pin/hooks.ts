import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { pinErrorAtom } from "~/components/atomic/PinNumberInput";
import { postValidatePin, preValidatePin } from "./api";
import { type BodyValidatePin } from "./types";

export function usePostValidatePin(
  onSuccess: (pin: BodyValidatePin) => void,
  onError: () => void
) {
  const [, setError] = useAtom(pinErrorAtom);

  return useMutation({
    mutationKey: ["validate-pin"],
    mutationFn: (body: BodyValidatePin) => postValidatePin(body),
    onSuccess: (_, pin) => {
      onSuccess(pin);
    },
    onError: () => {
      onError();
      setError(true);
    },
  });
}

export function useHasPin() {
  return useMutation({
    mutationKey: ["get-profile-buyer"],
    mutationFn: () => preValidatePin(),
  });
}

