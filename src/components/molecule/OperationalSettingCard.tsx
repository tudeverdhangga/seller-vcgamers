import { type ChangeEvent, useState, useEffect } from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Paper,
  RadioGroup,
  Switch,
  Typography
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "next-i18next";
import dayjs, { type Dayjs } from "dayjs";

import { useDebounce } from "~/utils/debounce";
import VGChip from "~/components/atomic/VGChip";
import VGRadio from "~/components/atomic/VGRadio";

interface OperationalHour {
  weekday: number
  is_always_open: boolean
  hour_start: string
  hour_finish: string
  is_active: boolean
  is_today: boolean
}

export default function OperationalSettingCard(props: {
  index: number;
  day?: string;
  isToday: boolean;
  isOpen: boolean;
  isFullDay: boolean;
  openHours: string;
  closedHours: string;
  onChange: (formData: OperationalHour) => void;
}) {
  const { onChange } = props
  const { t } = useTranslation("setting");
  const [isFullDay, setIsFullDay] = useState(props.isFullDay);
  const [schedule, setSchedule] = useState(props.isFullDay ? "fullDay" : "custom");
  const [open, setOpen] = useState<Dayjs>(dayjs(props.openHours, "HH:mm:ss"))
  const [close, setClose] = useState<Dayjs>(dayjs(props.closedHours, "HH:mm:ss"))

  useEffect(() => {
    setSchedule(props.isFullDay ? "fullDay" : "custom")
    setIsFullDay(props.isFullDay)
    setOpen(dayjs(props.openHours, "HH:mm:ss"))
    setClose(dayjs(props.closedHours, "HH:mm:ss"))
  }, [props])

  const handleIsOpen = (event: ChangeEvent<HTMLInputElement>) => {
    fetchApi('is_active', event.target.checked)
  }
  const handleChangeIsFullDay = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFullDay(event.target.value === "fullDay")
    setSchedule(event.target.value)
    fetchApi('is_always_open', event.target.value === "fullDay")
  }
  const handleChangeTime = useDebounce((event: Dayjs | null, time: string) => {
    if (event !== null) {
      if (time === 'open') {
        setOpen(event)
        fetchApi('hour_start', event.format("HH:mm:ss"))
      } else {
        setClose(event)
        fetchApi('hour_finish', event.format("HH:mm:ss"))
      }
    }
  }, 1500)
  const fetchApi = (key: string, value: string | boolean | number) => {
    const tempForm = {
      'weekday': props.index,
      'is_always_open': props.isFullDay,
      'hour_start': props.openHours,
      'hour_finish': props.closedHours,
      'is_active': props.isOpen,
      'is_today': props.isToday,
      [key]: value
    }
    onChange(tempForm);
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
      <Box display="flex">
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "common.shade.200"
          }}
        >
          {props.day}
        </Typography>
        {
          props.isToday &&
          <VGChip
            color="success"
            label={t("tab.operational.form.today")}
            size="small"
            sx={{ ml: 1 }}
          />
        }
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={props.isOpen}
            onChange={(event) => handleIsOpen(event)}
          />
        }
        label={props.isOpen
          ? t("tab.operational.form.open")
          : t("tab.operational.form.close")
        }
        labelPlacement="start"
      />
    </Box>
  )
  const scheduleContainer = (
    <>
      <RadioGroup
        value={schedule}
        onChange={(event) => handleChangeIsFullDay(event)}
      >
        <Box sx={fieldStyle}>
          <Typography component="span" sx={labelStyle}>
            {t("tab.operational.form.fullHour")}
          </Typography>
          <VGRadio value="fullDay" disabled={!props.isOpen} />
        </Box>
        <Box sx={fieldStyle}>
          <Typography component="span" sx={labelStyle}>
            {t("tab.operational.form.customHour")}
          </Typography>
          <VGRadio value="custom" disabled={!props.isOpen} />
        </Box>
      </RadioGroup>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label={t("tab.operational.form.openHour")}
          value={open}
          format="HH:mm"
          disabled={isFullDay}
          ampm={false}
          closeOnSelect={true}
          sx={{
            width: "100%",
            py: 1
          }}
          onAccept={(event) => handleChangeTime(event, 'open')}
          onChange={(event) => handleChangeTime(event, 'open')}
        />
        <TimePicker
          label={t("tab.operational.form.closeHour")}
          value={close}
          format="HH:mm"
          disabled={isFullDay}
          ampm={false}
          closeOnSelect={true}
          sx={{
            width: "100%",
            py: 1
          }}
          onAccept={(event) => handleChangeTime(event, 'close')}
          onChange={(event) => handleChangeTime(event, 'close')}
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