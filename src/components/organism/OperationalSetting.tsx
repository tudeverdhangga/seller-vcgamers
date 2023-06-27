import { Grid } from "@mui/material";
import OperationalSettingCard from "~/components/molecule/OperationalSettingCard";

export default function OperationalSetting() {
  const days = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu"
  ]

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {days.map((day, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={4}
          >
            <OperationalSettingCard
              day={day}
              isToday={index === 2}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}