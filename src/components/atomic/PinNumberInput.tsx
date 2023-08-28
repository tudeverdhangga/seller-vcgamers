import { useEffect, useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { atom, useAtom } from "jotai";

export const pinErrorAtom = atom(false);

export default function PinNumberInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const inputRefs = useRef<HTMLInputElement[]>([]); // Create a ref to hold references to the input fields
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [error] = useAtom(pinErrorAtom);

  const handleInputChange = (index: number, value: string) => {
    setPin((oldPin) => {
      const newPin = [...oldPin];
      newPin[index] = value;

      return newPin;
    });
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Move focus to the next input field
    }
  };

  const handleBackspace = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && pin[index] === "") {
      inputRefs.current[index - 1]?.focus(); // Move focus to the previous input field
    }
  };

  useEffect(() => {
    // Check if all inputs are filled whenever pin state changes
    if (pin.every((digit) => digit !== "")) {
      onSubmit(pin.join(""));
    }
  }, [pin]);

  return (
    <Stack direction="row" spacing={1}>
      {pin.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el: HTMLInputElement) => (inputRefs.current[index] = el)} // Assign the ref to the input field
          value={digit}
          type="password"
          variant="standard"
          size="small"
          error={error}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]",
            maxLength: 1,
            style: { textAlign: "center" },
          }}
          InputProps={{
            onKeyDown: (e) => handleBackspace(index, e),
          }}
          autoFocus={index === 0}
          sx={{
            ".MuiInputBase-input": {
              width: "30px",
              height: "23px",
              color: !error ? "success.main" : "error.main",
              fontFamily: "serif",
              caretColor: "black",
              borderBottom: "1px solid black",
            },
          }}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
    </Stack>
  );
}
