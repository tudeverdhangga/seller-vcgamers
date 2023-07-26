import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import NotesIcon from '@mui/icons-material/ArticleOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import CancelIcon from '@mui/icons-material/ClearOutlined';

import VGChip from "~/components/atomic/VGChip";
import { priceFormat } from "~/utils/format";
import VGButton from "~/components/atomic/VGButton";
import ChatIcon from "~/components/icons/svg/chatIcon.svg";

export default function TransactionDetailItemMobile(props: {
  image: string;
  code: string;
  status: string;
  productName: string;
  categoryName: string;
  notes?: string;
  cancelTime: string;
  price: number;
  qty: number;
  subTotal: number;
}) {
  const { t } = useTranslation("transaction");

  const getStatusText = () => {
    switch (props.status) {
      case "onProcess":
        return t("detail.list.status.onProcess")
      case "sent":
        return t("detail.list.status.sent")
      case "complain":
        return t("detail.list.status.complain")
      case "done":
        return t("detail.list.status.done")
      case "cancel":
        return t("detail.list.status.cancel")
      default:
        break;
    }
  }
  const getChipColor = () => {
    switch (props.status) {
      case "onProcess":
        return "warning"
      case "sent":
        return "info"
      case "complain":
        return "error"
      case "done":
        return "success"
      case "cancel":
        return "secondary"
      default:
        break;
    }
  }

  const codeStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: "common.shade.200"
  }
  const productNameStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "common.shade.700"
  }
  const categoryNameStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "primary.main",
    mb: 1
  }
  const noteStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "common.shade.200",
    align: "justify"
  }
  const noteLabelStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "common.shade.700"
  }
  const seeNoteStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "primary.main"
  }
  const emptyNoteStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "common.shade.100"
  }
  const cancelTimeStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "common.shade.700",
    mb: 0.5
  }
  const timeStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "common.shade.200",
    display: "flex",
    alignItems: "center"
  }
  const totalStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: "common.shade.700" 
  }
  const qtyStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "common.shade.200" 
  }
  const subTotalLabelStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: "common.shade.200" 
  }
  const subTotalValueStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "primary.main" 
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        my={2}
      >
        <Grid
          item
          xs={12}
        >
          <Box display="flex">
            <Image
              src={props.image}
              width={54}
              height={54}
              alt="Product Picture"
            />
            <Box ml={1} maxWidth="100%">
              <Box
                display="flex"
                alignItems="center"
              >
                <Typography sx={codeStyle} mr={1}>
                  {props.code}
                </Typography>
                <VGChip
                  label={getStatusText()}
                  color={getChipColor()}
                  size="small"
                />
              </Box>
              <Typography sx={productNameStyle}>
                {props.productName}
              </Typography>
              <Typography sx={categoryNameStyle}>
                {props.categoryName}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          xs={12}
          pl={2}
        >
          <Box
            display="flex"
            alignItems="start"
          >
            <NotesIcon fontSize="small" sx={{ mr: 1 }} />
            <Box width="100%">
              {
                props.notes
                  ? (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography sx={noteLabelStyle}>
                        {t("detail.list.notes")}:
                      </Typography>
                      <Typography sx={seeNoteStyle}>
                        {t("detail.list.copyNotes")}
                      </Typography>
                    </Box>
                  )
                  : (
                    <Typography sx={emptyNoteStyle}>
                      {t("detail.list.emptyNotes")}
                    </Typography>
                  )
              }
            </Box>
          </Box>
          <Typography sx={noteStyle}>
            {props.notes}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            height="100%"
          >
            <Typography sx={totalStyle}>
              {priceFormat(props.price)}
            </Typography>
            <Typography sx={qtyStyle}>
              {priceFormat(props.qty)}
            </Typography>
            <Typography sx={subTotalLabelStyle}>
              {"Qty: "}
              <Typography
                component="span"
                sx={subTotalValueStyle}
              >
                {priceFormat(props.subTotal)}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography sx={cancelTimeStyle}>
              {t("detail.list.cancelTime")}
            </Typography>
            <VGChip
              label={(
                <Typography sx={timeStyle}>
                  <TimeIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  23 jam
                </Typography>
              )}
              size="small"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Box display="flex">
            <VGButton
              variant="outlined"
              color="error"
              sx={{ mr: 1 }}
            >
              <CancelIcon />
            </VGButton>
            <VGButton
              variant="outlined"
              color="secondary"
              sx={{ mr: 1 }}
            >
              <ChatIcon />
            </VGButton>
            <VGButton
              variant="contained"
              color="success"
              fullWidth
            >
              {t("detail.list.processTransaction")}
            </VGButton>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}