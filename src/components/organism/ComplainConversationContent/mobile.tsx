import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useTranslation } from "next-i18next";

import ComplainConversationListItem from "~/components/atomic/ComplainConversationListItem";
import VGTabChip from "~/components/atomic/VGTabChip";
import VGTabPanel from "~/components/atomic/VGTabPanel";
import BadgeIcon from "~/components/icons/BadgeIcon";
import EmptyState from "~/components/molecule/EmptyState/complainConversation";
import { useGetModerationList } from "~/services/moderation/hooks";
import VGTabsChip from "~/components/atomic/VGTabsChip";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";

export default function ChatConversationContent() {
  const { t } = useTranslation("complain");

  const {
    data: inProcessData,
    hasNextPage: inProcessHasNextPage,
    fetchNextPage: inProcessFetchNextPage,
  } = useGetModerationList("1");
  const {
    data: completeData,
    hasNextPage: completeHasNextPage,
    fetchNextPage: completeFetchNextPage,
  } = useGetModerationList("2");

  const inProcessUnread = useMemo(
    () =>
      inProcessData?.pages
        .flatMap((page) => page.data)
        .reduce((acc, data) => acc + (data.is_read ? 0 : 1), 0) ?? 0,
    [inProcessData?.pages]
  );
  const completeUnread = useMemo(
    () =>
      completeData?.pages
        .flatMap((page) => page.data)
        .reduce((acc, data) => acc + (data.is_read ? 0 : 1), 0) ?? 0,
    [completeData?.pages]
  );

  const [tabPosition, setTabPosition] = useState(0);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "common.shade.50",
          px: "16px",
          pt: "10px",
          mb: "10px",
        }}
      >
        <VGTabsChip
          value={tabPosition}
          onChange={(_, value) => setTabPosition(value as number)}
        >
          <VGTabChip
            label={t("tab.inProcess")}
            icon={<BadgeIcon content={inProcessUnread} />}
            iconPosition="end"
          />
          <VGTabChip
            label={t("tab.complete")}
            icon={<BadgeIcon content={completeUnread} />}
            iconPosition="end"
          />
        </VGTabsChip>
      </Box>
      <VGTabPanel value={tabPosition} index={0}>
        <List
          id="scrollableDiv"
          disablePadding
          sx={{ overflow: "auto", height: "64vh" }}
        >
          <InfiniteScroll
            dataLength={inProcessData ? inProcessData.pages.length : 0}
            hasMore={inProcessHasNextPage ?? false}
            next={inProcessFetchNextPage}
            loader={<Skeleton variant="rounded" height={50} width="100%" />}
            scrollableTarget="scrollableDiv"
          >
            {inProcessData && inProcessData.pages.at(0)?.data.length ? (
              inProcessData.pages
                .flatMap((page) => page.data)
                .map((complain) => (
                  <ComplainConversationListItem
                    key={complain.id}
                    complain={complain}
                  />
                ))
            ) : (
              <EmptyState />
            )}
          </InfiniteScroll>
        </List>
      </VGTabPanel>
      <VGTabPanel value={tabPosition} index={1}>
        <List
          id="scrollableDiv"
          disablePadding
          sx={{ overflow: "auto", height: "64vh" }}
        >
          <InfiniteScroll
            dataLength={completeData ? completeData.pages.length : 0}
            hasMore={completeHasNextPage ?? false}
            next={completeFetchNextPage}
            loader={<Skeleton variant="rounded" height={100} width="100%" />}
            scrollableTarget="scrollableDiv"
          >
            {completeData && completeData.pages.at(0)?.data.length ? (
              completeData.pages
                .flatMap((page) => page.data)
                .map((complain) => (
                  <ComplainConversationListItem
                    key={complain.id}
                    complain={complain}
                  />
                ))
            ) : (
              <EmptyState />
            )}
          </InfiniteScroll>
        </List>
      </VGTabPanel>
    </Box>
  );
}
