import { useEffect, useState } from "react";
import { Grid, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import OperationalSettingCard from "~/components/molecule/OperationalSettingCard";
import { useGetProfile, useUpdateOperational } from "~/services/api/auth";
import { toastOption } from "~/utils/toast";

interface OperationalHour {
  weekday: number
  is_always_open: boolean
  hour_start: string
  hour_finish: string
  is_active: boolean
  is_today: boolean
}
interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function OperationalSetting() {
  const { t } = useTranslation("setting");
  const getProfile = useGetProfile();
  const updateOperational = useUpdateOperational();
  const days = [
    t("tab.operational.form.days.sun"),
    t("tab.operational.form.days.mon"),
    t("tab.operational.form.days.tues"),
    t("tab.operational.form.days.wed"),
    t("tab.operational.form.days.thurs"),
    t("tab.operational.form.days.fri"),
    t("tab.operational.form.days.sat")
  ]
  const [operational, setOperational] = useState<OperationalHour[]>()
  const [isLoading, setIsLoading] = useState(getProfile?.isLoading || updateOperational?.isLoading)
  
  useEffect(() => {
    setIsLoading(true)
    setOperational(getProfile?.data?.data?.operational_hours)
    setIsLoading(false)
  }, [getProfile?.data?.data?.operational_hours])

  const onChangeField = (formData: OperationalHour) => {
    setIsLoading(true)
    updateOperational.mutate(formData, {
      onSuccess: () => {
        void getProfile.refetch()
        toast.success(t("tab.operational.toast.updateSuccess"), toastOption)
        setIsLoading(false)
      },
      onError: (error) => {
        const err = error as ErrorResponse
        const errorMessage = `${t("tab.operational.toast.updateFail")}: ${err?.response?.data?.message}`
        
        toast.error(errorMessage, toastOption)
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {
          isLoading
            ? (
              [0, 1, 2, 3, 4, 5, 6].map((index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                >
                  <Skeleton variant="rectangular" width="100%" height={300} />
                </Grid>
              ))
            )
            : (
              operational?.map((data, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                >
                  <OperationalSettingCard
                    index={index}
                    day={days[index]}
                    isToday={data.is_today}
                    isOpen={data.is_active}
                    isFullDay={data.is_always_open}
                    openHours={data.hour_start}
                    closedHours={data.hour_finish}
                    onChange={((formData) => onChangeField(formData))}
                  />
                </Grid>
              ))
            )
        }
      </Grid>
    </>
  )
}