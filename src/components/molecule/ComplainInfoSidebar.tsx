/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import {
  useGetModerationDetail,
  usePostModerationInviteAdmin,
} from "~/services/moderation/hooks";
import VGButton from "../atomic/VGButton";

export const DRAWER_WIDTH = 250;

export default function ComplainInfoSidebar({
  complainId,
}: {
  complainId: string;
}) {
  const { t } = useTranslation("complain");
  const { data } = useGetModerationDetail(complainId);
  const mutation = usePostModerationInviteAdmin();

  return (
    <Box sx={{ width: DRAWER_WIDTH, p: "20px" }}>
      <Typography
        sx={{ fontSize: 16, fontWeight: 700, color: "common.purple.500" }}
      >
        {t("complainInfo.title")}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: "common.shade.200",
          mt: "20px",
        }}
      >
        {t("complainInfo.reasoning")}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "common.shade.200",
          mt: "10px",
        }}
      >
        {data?.data.reason}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "common.shade.200",
            mt: "20px",
          }}
        >
          {t("complainInfo.parties")}
        </Typography>
        {data?.data.participants[0]?.photo && (
          <PartyProfilePicture
            src={data.data.participants[0].photo}
            name={data.data.participants[0].name}
            position="buyer"
          />
        )}
        {data?.data.participants[1]?.photo && (
          <PartyProfilePicture
            src={data.data.participants[1].photo}
            name={data.data.participants[1].name}
            position="seller"
          />
        )}
      </Box>
      {data?.data.id && (
        <VGButton
          variant={data.data.admin_invited ? "contained" : "outlined"}
          color="primary"
          disabled={data.data.admin_invited}
          sx={{ mt: "20px", width: "100%" }}
          onClick={() => mutation.mutate({ moderation_id: data.data.id })}
        >
          {t("complainInfo.inviteAdmin")}
        </VGButton>
      )}
    </Box>
  );
}

function PartyProfilePicture(props: {
  src: string;
  name: string;
  position: "seller" | "buyer";
}) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Box sx={{ position: "relative", width: 50, height: 50 }}>
        <Image
          src="/assets/default-profile-pic.svg"
          width={50}
          height={50}
          alt="Profile Picture Border"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <img
          src={props.src}
          width={38}
          height={38}
          alt="Profile Picture"
          style={{
            position: "absolute",
            top: 5.5,
            left: 6,
            clipPath:
              "polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
          }}
        />
      </Box>
      <Box sx={{ alignSelf: "center" }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "common.shade.200",
          }}
        >
          {props.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: "common.shade.100",
          }}
        >
          {props.position === "buyer" ? "Pembeli" : "Penjual"}
        </Typography>
      </Box>
    </Box>
  );
}
