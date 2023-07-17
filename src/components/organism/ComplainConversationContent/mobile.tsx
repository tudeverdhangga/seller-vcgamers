import { useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Tabs from "@mui/material/Tabs";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";

import { complainListAtom } from "~/atom/complain";
import ComplainConversationListItem from "~/components/atomic/ComplainConversationListItem";
import VGTabChip from "~/components/atomic/VGTabChip";
import VGTabPanel from "~/components/atomic/VGTabPanel";
import BadgeIcon from "~/components/icons/BadgeIcon";
import EmptyState from "~/components/molecule/EmptyState/complainConversation";

export default function ChatConversationContent() {
  const { t } = useTranslation("complain");

  const [complainList] = useAtom(complainListAtom);
  const complainInProcessList = complainList?.filter(
    (complain) => complain.type === "in-process"
  );
  const complainCompleteList = complainList?.filter(
    (complain) => complain.type === "completed"
  );

  const [tabPosition, setTabPosition] = useState(0);

  return (
    <Box>
      <Box sx={{ backgroundColor: "common.shade.50", px: "16px", pt: "10px" }}>
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
          value={tabPosition}
          onChange={(_, value) => setTabPosition(value as number)}
        >
          <VGTabChip
            label={t("tab.inProcess")}
            icon={
              <BadgeIcon
                content={
                  complainInProcessList?.filter((complain) => complain.unread)
                    .length
                }
              />
            }
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.complete")}
            icon={
              <BadgeIcon
                content={
                  complainCompleteList?.filter((complain) => complain.unread)
                    .length
                }
              />
            }
            iconPosition="end"
          />
        </Tabs>
      </Box>
      <VGTabPanel value={tabPosition} index={0} style={{ marginTop: "10px" }}>
        {complainInProcessList && complainInProcessList.length ? (
          <List disablePadding>
            {complainInProcessList.map((complain) => (
              <ComplainConversationListItem
                key={complain.id}
                complain={complain}
              />
            ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </VGTabPanel>
      <VGTabPanel value={tabPosition} index={1} style={{ marginTop: "10px" }}>
        {complainCompleteList && complainCompleteList.length ? (
          <List disablePadding>
            {complainCompleteList.map((complain) => (
              <ComplainConversationListItem
                key={complain.id}
                complain={complain}
              />
            ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </VGTabPanel>
    </Box>
  );
}
