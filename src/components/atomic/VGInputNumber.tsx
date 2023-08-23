import TextField, { type TextFieldProps } from "@mui/material/TextField";
import React from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import {
  type ControllerProps,
  Controller,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
      />
    );
  }
);

export default function VGInputNumber<
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          InputProps={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            inputComponent: NumericFormatCustom as any,
          }}
          {...TextFieldProps}
        >
          {children}
        </TextField>
      )}
    />
  );
}
