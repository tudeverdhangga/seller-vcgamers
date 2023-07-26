import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NotesIcon from '@mui/icons-material/ArticleOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import CancelIcon from '@mui/icons-material/ClearOutlined';
import { useState } from "react";

import VGChip from "~/components/atomic/VGChip";
import { priceFormat } from "~/utils/format";
import VGButton from "~/components/atomic/VGButton";
import ChatIcon from "~/components/icons/svg/chatIcon.svg";
import TransactionCancelDialog from "~/components/molecule/TransactionCancelDialog";
import TransactionProcessDialog from "~/components/molecule/TransactionProcessDialog";
import TransactionNotesDialog from "~/components/molecule/TransactionNotesDialog";

export default function TransactionDetailItemDesktop(props: {
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
  const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false)
  const [isOpenProcessDialog, setIsOpenProcessDialog] = useState(false)
  const [isOpenNotesDialog, setIsOpenNotesDialog] = useState(false)

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
  const copyNotes = async() => {
    if (typeof props.notes !== 'undefined') {
      await navigator.clipboard.writeText(props.notes);
    }
    return;
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
    fontSize: "14px",
    fontWeight: 700,
    color: "primary.main",
    mb: 1
  }
  const noteStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.700"
  }
  const seeNoteStyle = {
    fontSize: "12px",
    fontWeight: 500,
    color: "primary.main"
  }
  const emptyNoteStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.100"
  }
  const cancelTimeStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "common.shade.100",
    mb: 0.5
  }
  const timeStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "common.shade.200",
    display: "flex",
    alignItems: "center"
  }
  const totalStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "common.shade.700" 
  }
  const qtyStyle = {
    fontSize: "16px",
    fontWeight: 500,
    color: "common.shade.200" 
  }
  const subTotalLabelStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "common.shade.200" 
  }
  const subTotalValueStyle = {
    fontSize: "14px",
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
          md={6}
        >
          <Box display="flex" maxWidth="80%">
            <Image
              src={props.image}
              width={60}
              height={60}
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
              <Box
                display="flex"
                alignItems="start"
              >
                <NotesIcon sx={{ mr: 1 }} />
                <Box width="100%">
                  {
                    props.notes
                      ? (
                        <>
                          <Box
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            sx={noteStyle}
                          >
                            {props.notes}
                          </Box>
                          <Link
                            href="#"
                            underline="hover"
                            sx={seeNoteStyle}
                            onClick={() => setIsOpenNotesDialog(true)}
                          >
                            {t("detail.list.seeNotes")}
                          </Link>
                        </>
                      )
                      : (
                        <Typography sx={emptyNoteStyle}>
                          {t("detail.list.emptyNotes")}
                        </Typography>
                      )
                  }
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={2}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
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
            <Link
              sx={{
                ...seeNoteStyle,
                cursor: "pointer",
                textDecoration: "none"
              }}
              onClick={copyNotes}
            >
              {t("detail.list.copyNotes")}
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          md={"auto"}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
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
          md
        >
          <Box>
            <VGButton
              variant="contained"
              color="success"
              size="large"
              fullWidth
              onClick={() => setIsOpenProcessDialog(true)}
            >
              {t("detail.list.processTransaction")}
            </VGButton>
            <Box display="flex" mt={1}>
              <VGButton
                variant="outlined"
                color="error"
                size="large"
                sx={{ mr: 1 }}
                onClick={() => setIsOpenCancelDialog(true)}
              >
                <CancelIcon />
              </VGButton>
              <VGButton
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<ChatIcon />}
              >
                {t("detail.list.contactBuyer")}
              </VGButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <TransactionCancelDialog
        isOpen={isOpenCancelDialog}
        handleClose={() => setIsOpenCancelDialog(false)}
      />
      <TransactionProcessDialog
        isOpen={isOpenProcessDialog}
        handleClose={() => setIsOpenProcessDialog(false)}
      />
      <TransactionNotesDialog
        notes={props.notes}
        isOpen={isOpenNotesDialog}
        handleClose={() => setIsOpenNotesDialog(false)}
      />
    </>
  )
}