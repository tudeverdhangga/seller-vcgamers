import { TextField } from "@mui/material"
import { type ChangeEventHandler } from "react";
import { type Control, Controller } from "react-hook-form"

interface IFormInput {
  shopName: string;
  shopUrl: string;
  shopDesc: string;
  shopPhone: string;
  bankName: string;
  bankNumber: string;
  bankCustomerName: string;
}

export default function VGInputText(props: {
  name: keyof IFormInput;
  control: Control<IFormInput>;
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
            value={value}
            label={props.label}
            disabled={props.disabled}
            fullWidth
            required
          />
          {error && (
            <p style={{ color: 'red' }}>{error.message}</p>
          )}
        </>
      )}
    />
  )
}
