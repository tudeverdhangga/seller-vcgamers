import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import { queryTypes, useQueryState } from "next-usequerystate";

import VGTabChip from "~/components/atomic/VGTabChip";
import BadgeIcon from "~/components/icons/BadgeIcon";
import {
  useGetNotificationCount,
  useReadNotification,
} from "~/services/notification/hooks";
import VGTabPanel from "../atomic/VGTabPanel";
import VGTabsChip from "../atomic/VGTabsChip";
import NotificationSalesContent from "./NotificationSalesContent";
import NotificationUpdateContent from "./NotificationUpdateContent";
import NotificationDetailDialog from "../molecule/NotificationDetailDialog";

export default function NotificationTab() {
  const { t } = useTranslation("notification");

  const [flag, setFlag] = useQueryState(
    "flag",
    queryTypes.string.withDefault("marketplace")
  );
  const { data } = useGetNotificationCount();
  const readMutation = useReadNotification();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <VGTabsChip
          value={flag}
          onChange={(_, value) => setFlag(value as string)}
        >
          {data?.data.map((tab) => {
            if (tab.flag === "marketplace" || tab.flag === "update") {
              const label =
                tab.flag === "marketplace" ? t("salesTab") : t("updateTab");

              return (
                <VGTabChip
                  key={tab.flag}
                  label={label}
                  icon={<BadgeIcon content={tab.count} />}
                  iconPosition="end"
                  value={tab.flag}
                />
              );
            }
            return null;
          })}
        </VGTabsChip>
        <Button
          sx={{ textTransform: "none", fontWeight: 600 }}
          onClick={() =>
            readMutation.mutate({ flag: flag, notification_id: "" })
          }
        >
          {t("readAll")}
        </Button>
      </div>
      <VGTabPanel value={flag} index="marketplace">
        <NotificationSalesContent />
      </VGTabPanel>
      <VGTabPanel value={flag} index="update">
        <NotificationUpdateContent />
      </VGTabPanel>
      <NotificationDetailDialog />
    </div>
  );
}
