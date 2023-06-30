import { useState } from "react";

import { useTranslation } from "next-i18next";

import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";

import VGTabChip from "~/components/atomic/VGTabChip";
import BadgeIcon from "~/components/icons/BadgeIcon";
import VGTabPanel from "../atomic/VGTabPanel";
import NotificationSalesContent from "./NotificationSalesContent";
import NotificationUpdateContent from "./NotificationUpdateContent";

export default function NotificationTab() {
  const { t } = useTranslation("notification");

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex" }}>
        <Tabs
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "10px",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            flex: "1 0 0",
          }}
          value={value}
          onChange={handleChange}
        >
          <VGTabChip
            label={t("salesTab")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("updateTab")}
            icon={<BadgeIcon content={1} />}
            iconPosition="end"
          />
        </Tabs>
        <Button sx={{ textTransform: "none", fontWeight: 600 }}>
          {t("readAll")}
        </Button>
      </div>
      <VGTabPanel value={value} index={0} style={{ marginTop: "10px" }}>
        <NotificationSalesContent />
      </VGTabPanel>
      <VGTabPanel value={value} index={1} style={{ marginTop: "10px" }}>
        <NotificationUpdateContent />
      </VGTabPanel>
    </div>
  );
}
