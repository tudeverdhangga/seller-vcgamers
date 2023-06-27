import { type ChangeEvent, useState } from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  Typography
} from "@mui/material";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import VGChip from "~/components/atomic/VGChip";

export default function OperationalSettingCard(props: {
  day: string;
  isToday?: boolean;
  isOpen?: boolean;
  schedule?: string;
  openHours?: string;
  closedHours?: string;
}) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [schedule, setSchedule] = useState(props.schedule || "fullDay");

  const handleIsOpen = (event: ChangeEvent<HTMLInputElement>) => {    
    setIsOpen(event.target.checked)
  }
  const handleChangeSchedule = (event: ChangeEvent<HTMLInputElement>) => {    
    setSchedule(event.target.value)
  }

  // Style
  const labelStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.200"
  }
  const fieldStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 1
  }

  // Container
  const headingContainer = (
    <Box sx={fieldStyle}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "common.shade.200"
        }}
      >
        { props.day }
        {
          props.isToday &&
          <VGChip
            color="success"
            label="Hari ini"
            size="small"
            sx={{ ml: 1 }}
          />
        }
      </Typography>
      <FormControlLabel
        control={
          <Switch
            onChange={(event) => handleIsOpen(event)}
          />
        }
        label={isOpen ? "Buka" : "Tutup"}
        labelPlacement="start"
      />
    </Box>
  )
  const scheduleContainer = (
    <>
      <RadioGroup
        defaultValue={schedule}
        onChange={(event) => handleChangeSchedule(event)}
      >
        <Box sx={fieldStyle}>
          <Typography component="span" sx={labelStyle}>
            Buka 24 jam
          </Typography>
          <Radio
            value="fullDay"
          />
        </Box>
        <Box sx={fieldStyle}>
          <Typography component="span" sx={labelStyle}>
            Atur Jam Operational
          </Typography>
          <Radio
            value="custom"
          />
        </Box>
      </RadioGroup>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label="Jam Buka"
          format="HH:mm"
          disabled={schedule !== "" && schedule === "fullDay"}
          sx={{
            width: "100%",
            py: 1
          }}
        />
        <TimeField
          label="Jam Tutup"
          format="HH:mm"
          disabled={schedule !== "" && schedule === "fullDay"}
          sx={{
            width: "100%",
            py: 1
          }}
        />
      </LocalizationProvider>
    </>
  )

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      {headingContainer}
      <Divider />
      {scheduleContainer}
    </Paper>
  )
}