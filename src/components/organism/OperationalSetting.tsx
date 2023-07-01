import { Grid } from "@mui/material";
import OperationalSettingCard from "~/components/molecule/OperationalSettingCard";
import { useTranslation } from "next-i18next";

export default function OperationalSetting() {
  const { t } = useTranslation("setting");
  const days = [
    t("tab.operational.form.days.mon"),
    t("tab.operational.form.days.tues"),
    t("tab.operational.form.days.wed"),
    t("tab.operational.form.days.thurs"),
    t("tab.operational.form.days.fri"),
    t("tab.operational.form.days.sat"),
    t("tab.operational.form.days.sun")
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