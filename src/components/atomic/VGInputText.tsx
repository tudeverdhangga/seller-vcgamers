import { type ChangeEventHandler } from "react";
import { TextField } from "@mui/material"
import { type Control, Controller, type FieldValues } from "react-hook-form"

export default function VGInputText(props: {
  name: string;
  control: Control<FieldValues>;
  label: string;
  disabled?: boolean;
  rules?: Record<string, unknown>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({
        field: { value },
        fieldState: { error }
      }) => (
        <>
          <TextField
            helperText={error ? error.message : null}
            size="small"
            variant="outlined"
            error={!!error}
            onChange={props.onChange}
            value={value as string}
            label={props.label}
            disabled={props.disabled}
            fullWidth
          />
          {error && (
            <p style={{ color: 'red' }}>
              {error.message}
            </p>
          )}
        </>
      )}
    />
  )
}
