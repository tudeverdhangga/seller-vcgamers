import TextField, { type TextFieldProps } from "@mui/material/TextField";
import React from "react";
import {
  type ControllerProps,
  Controller,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";

export default function VGInputText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ControllerProps,
  TextFieldProps,
  addOnChange,
  children,
}: {
  ControllerProps: Omit<ControllerProps<TFieldValues, TName>, "render">;
  TextFieldProps?: TextFieldProps;
  addOnChange?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Controller
      {...ControllerProps}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={
            addOnChange
              ? (data) => {
                  onChange(data);
                  addOnChange();
                }
              : onChange
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={value}
          inputRef={ref}
          {...TextFieldProps}
        >
          {children}
        </TextField>
      )}
    />
  );
}
