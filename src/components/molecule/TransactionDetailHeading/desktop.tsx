import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import VGCard from "~/components/atomic/VGCard";

export default function TransactionDetailHeadingDesktop(props: {
  buyer: string;
  code: string;
  date: string;
}) {
  const { t } = useTranslation("transaction");

  const titleStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.200"
  }
  const bodyStyle = {
    fontSize: "14px",
    fontWeight: "700",
    color: "common.shade.700"
  }
  
  return (
    <>
      <VGCard>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={4}
          >
            <Typography sx={titleStyle}>
              {t("detail.heading.buyer")}
            </Typography>
            <Typography sx={bodyStyle}>
              {props.buyer}
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
          >
            <Box display="flex">
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography sx={titleStyle}>
                  {t("detail.heading.transactionId")}
                </Typography>
                <Typography sx={bodyStyle}>
                  #{props.code}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={4}
          >
            <Box display="flex">
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography sx={titleStyle}>
                  {t("detail.heading.date")}
                </Typography>
                <Typography sx={bodyStyle}>
                  {props.date}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </VGCard>
    </>
  )
}