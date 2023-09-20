import { type TextFieldProps } from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export default function VGInputDate<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ControllerProps,
  DatePickerProps,
  TextFieldProps,
}: {
  ControllerProps: Omit<ControllerProps<TFieldValues, TName>, "render">;
  DatePickerProps?: DatePickerProps<Dayjs>;
  TextFieldProps?: TextFieldProps;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        {...ControllerProps}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            {...DatePickerProps}
            value={typeof value === "undefined" ? undefined : dayjs(value)}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onChange={(data) => onChange(data?.toDate())}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error ? error.message : null,
                InputProps: { sx: { borderRadius: "5px" } },
                ...TextFieldProps,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
