import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";

import VGDialog from "~/components/atomic/VGDialog";
import VGAlert from "~/components/atomic/VGAlert";
import VGButton from "~/components/atomic/VGButton";

export default function WithdrawDialog(props: {
  code: string;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation("voucher");
  const { code, isOpen, handleClose } = props;

  const primaryTextStyle = {
    fontWeight: 700,
    color: "primary.main"
  }

  return (
    <VGDialog
      isOpen={isOpen}
      width="400px"
      onClose={handleClose}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={primaryTextStyle}
          fontSize={16}
        >
          {t("list.reason.title")}
        </Typography>
        <VGAlert
          color="info"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            mt: 1
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={primaryTextStyle}
              fontSize={14}
            >
              {t("list.reason.alert")} {code}
            </Typography>
          </Box>
        </VGAlert>
        <RadioGroup defaultValue="outside" sx={{ width: "100%", mb: 2 }}>
          <FormControlLabel
            value="outside"
            control={<Radio />}
            label={t("list.reason.soldOutside")}
            labelPlacement="start"
            sx={{
              width: "100%",
              justifyContent: "space-between"
            }}
          />
          <Divider />
          <FormControlLabel
            value="wrong"
            control={<Radio />}
            label={t("list.reason.wrong")}
            labelPlacement="start"
            sx={{
              width: "100%",
              justifyContent: "space-between"
            }}
          />
          <Divider />
          <FormControlLabel
            value="expired"
            control={<Radio />}
            label={t("list.reason.expired")}
            labelPlacement="start"
            sx={{
              width: "100%",
              justifyContent: "space-between"
            }}
          />
          <Divider />
          <FormControlLabel
            value="another"
            control={<Radio />}
            label={t("list.reason.another")}
            labelPlacement="start"
            sx={{
              width: "100%",
              justifyContent: "space-between"
            }}
          />
          <Divider />
        </RadioGroup>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <VGButton
            variant="outlined"
            color="secondary"
            sx={{ width: "100%", mr: 1 }}
            onClick={handleClose}
          >
            {t("list.reason.back")}
          </VGButton>
          <VGButton
            variant="contained"
            color="error"
            sx={{ width: "100%" }}
          >
            {t("list.reason.ok")}
          </VGButton>
        </Box>
      </Box>
    </VGDialog>
  )
}