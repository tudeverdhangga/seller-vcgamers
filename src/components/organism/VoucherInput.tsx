import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import VGCard from "~/components/atomic/VGCard";
import VGButton from "~/components/atomic/VGButton";
import TextField from "@mui/material/TextField";

export default function VoucherInput() {
  const { t } = useTranslation("voucher");

  const titleStyle = {
    fontSize: 16,
    fontWeight: 700,
    color: "primary.main"
  }

  return (
    <VGCard>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid
          item
          xs={12}
          md={9}
        >
          <Box>
            <Typography sx={titleStyle}>
              {t("input.productName")}
            </Typography>
            <Typography sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#9AA4BF"
            }}>
              asd
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          justifyContent="flex-end"
        >
          <Box
            width="100%"
            border="2px solid #40D04F"
            borderRadius={10}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box
              color="common.green.500"
              px={2}
              height={24}
              width={24}
            >
              <CheckCircleIcon />
            </Box>
            <Typography
              textTransform="uppercase"
              fontSize={12}
              fontWeight={700}
              color="#9AA4B6"
              px={2}
            >
              {t("input.total")}
            </Typography>
            <Typography
              fontSize={24}
              fontWeight={700}
              color="primary.main"
              px={2}
            >
              53
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography sx={titleStyle}>
          {t("input.note.label")}
        </Typography>
        <ul style={{ marginTop: 0, paddingLeft: 25 }}>
          <li
            style={{
              fontSize: 14,
              color: "#616A82"
            }}
          >
            {t("input.note.1")}
          </li>
          <li
            style={{
              fontSize: 14,
              color: "#616A82"
            }}
          >
            {t("input.note.2")}
          </li>
          <li
            style={{
              fontSize: 14,
              color: "#616A82"
            }}
          >
            {t("input.note.3")}
          </li>
        </ul>
        <Box position="relative">
          <TextField
            hiddenLabel
            placeholder={t("input.placeholder")}
            multiline
            fullWidth
            rows={5}
          />
          <VGButton
            variant="contained"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              bottom: 15,
              right: 15
            }}
          >
            {t("input.check")}
          </VGButton>
        </Box>
      </Box>
    </VGCard>
  )
} 