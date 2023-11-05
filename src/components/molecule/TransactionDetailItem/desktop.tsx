/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import CancelIcon from '@mui/icons-material/ClearOutlined';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import VGChip from "~/components/atomic/VGChip";
import { priceFormat } from "~/utils/format";
import VGButton from "~/components/atomic/VGButton";
import NotesIcon from '~/components/icons/svg/note.svg';
import ChatIcon from "~/components/icons/svg/chatIconSmall.svg";
import TransactionCancelDialog from "~/components/molecule/TransactionCancelDialog";
import TransactionProcessVoucherDialog from "~/components/molecule/TransactionProcessVoucherDialog";
import TransactionProcessAccountDialog from "~/components/molecule/TransactionProcessAccountDialog";
import TransactionProcessDialog from "~/components/molecule/TransactionProcessDialog";
import TransactionNotesDialog from "~/components/molecule/TransactionNotesDialog";
import TransactionDetailVoucherDialog from "~/components/molecule/TransactionDetailVoucherDialog";
import TransactionDetailCancelDialog from "~/components/molecule/TransactionDetailCancelDialog";
import TransactionDetailAccountDialog from "~/components/molecule/TransactionDetailAccountDialog";
import { useGetModerationDetailByTransactionId } from "~/services/moderation/hooks";
import { useGetChatRoomIdByBuyerId } from "~/services/chat/hooks";

export default function TransactionDetailItemDesktop(props: {
  image: string;
  id: string;
  memberId: string;
  code: string;
  status: number;
  statusName: string;
  productName: string;
  brandName: string;
  deliveryData: string[];
  notes?: string;
  cancelNote?: string;
  cancelTime: string;
  finishTime: string;
  kilatTime?: string;
  price: number;
  qty: number;
  subTotal: number;
  isKilat: boolean;
  isInstant: boolean;
  isAccount: boolean;
  isVoucher: boolean;
  refetch: () => void;
}) {
  const { t } = useTranslation("transaction");
  const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false)
  const [isOpenProcessVoucherDialog, setIsOpenProcessVoucherDialog] = useState(false)
  const [isOpenProcessAccountDialog, setIsOpenProcessAccountDialog] = useState(false)
  const [isOpenProcessDialog, setIsOpenProcessDialog] = useState(false)
  const [isOpenNotesDialog, setIsOpenNotesDialog] = useState(false)
  const [isOpenDetailCanceDialog, setIsOpenDetailCancelDialog] = useState(false)
  const [isOpenDetailVoucherDialog, setIsOpenDetailVoucherDialog] = useState(false)
  const [isOpenDetailAccountDialog, setIsOpenDetailAccountDialog] = useState(false)
  const [countDown, setCountDown] = useState<{
    minutes: string;
    seconds: string;
  } | undefined>(undefined)
  const router = useRouter();
  const moderation = useGetModerationDetailByTransactionId(props.status === 6 ? props.id : undefined)
  const chat = useGetChatRoomIdByBuyerId(props.memberId)

  useEffect(() => {
    if (props.kilatTime) {
      const interval = setInterval(() => {
        const now = dayjs();
        const kilatDateTime = dayjs(props.kilatTime);
        const duration = kilatDateTime.diff(now, "second");

        if (duration <= 0) {
          clearInterval(interval);
          setCountDown(undefined);
        } else {
          const minutes = Math.floor(duration / 60).toString();
          const seconds = (duration % 60).toString();
          setCountDown({
            minutes,
            seconds
          });
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [])

  const getChipColor = () => {
    switch (props.status) {
      case 2:
        return "warning"
      case 3:
        return "info"
      case 6:
        return "error"
      case 4:
        return "success"
      case 5:
        return "secondary"
      default:
        break;
    }
  }
  const copyNotes = async () => {
    if (typeof props.notes !== 'undefined') {
      await navigator.clipboard.writeText(props.notes);
    }
    return;
  }
  const handleProcessTransaction = () => {
    props.isAccount ?
      setIsOpenProcessAccountDialog(true) :
      props.isVoucher ?
        setIsOpenProcessVoucherDialog(true) :
        setIsOpenProcessDialog(true)
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
  const brandNameStyle = {
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
    fontSize: "14px",
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

  // Item type action
  const voucherItemsContainer = (
    <VGButton
      variant="outlined"
      color="secondary"
      size="small"
      fullWidth
      sx={{
        height: 40,
        fontSize: 12
      }}
      onClick={() => setIsOpenDetailVoucherDialog(true)}
    >
      {t("detail.list.voucher.button")}
    </VGButton>
  )
  const accountItemsContainer = (
    <VGButton
      variant="outlined"
      color="secondary"
      size="small"
      fullWidth
      sx={{
        height: 40,
        fontSize: 12
      }}
      onClick={() => setIsOpenDetailAccountDialog(true)}
    >
      {t("detail.list.account.button")}
    </VGButton>
  )
  const shortChatContainer = (
    <VGButton
      variant="outlined"
      color="secondary"
      size="small"
      sx={{
        mr: 1,
        height: 40,
        width: 40,
        minWidth: 40
      }}
      onClick={() => void router.push(`/seller/obrolan/percakapan/${chat?.data?.data?.id as string}`)}
    >
      <ChatIcon
        sx={{
          height: 18,
          width: 18
        }}
      />
    </VGButton>
  )
  const longChatContainer = (
    <VGButton
      variant="outlined"
      color="secondary"
      size="small"
      fullWidth
      sx={{
        height: 40,
        fontSize: 12
      }}
      startIcon={<ChatIcon />}
      onClick={() => void router.push(`/seller/obrolan/percakapan/${chat?.data?.data?.id as string}`)}
    >
      {t("detail.list.contactBuyer")}
    </VGButton>
  )
  // Item action
  const onProcessActionContainer = (
    <Box>
      <VGButton
        variant="contained"
        color="success"
        size="small"
        fullWidth
        sx={{
          height: 40,
          fontSize: 12
        }}
        onClick={handleProcessTransaction}
      >
        {t("detail.list.processTransaction")}
      </VGButton>
      <Box display="flex" mt={1}>
        <VGButton
          variant="outlined"
          color="error"
          size="small"
          sx={{
            mr: 1,
            height: 40,
            width: 40,
            minWidth: 40
          }}
          onClick={() => setIsOpenCancelDialog(true)}
        >
          <CancelIcon
            sx={{
              height: 18,
              width: 18
            }}
          />
        </VGButton>
        <VGButton
          variant="outlined"
          color="secondary"
          size="small"
          fullWidth
          sx={{
            height: 40,
            fontSize: 12
          }}
          startIcon={<ChatIcon />}
          onClick={() => void router.push(`/seller/obrolan/percakapan/${chat?.data?.data?.id as string}`)}
        >
          {t("detail.list.contactBuyer")}
        </VGButton>
      </Box>
    </Box>
  )
  const sentActionVoucherContainer = (
    <Box display="flex">
      {
        !props.isAccount && !props.isVoucher
          ? (longChatContainer)
          : (shortChatContainer)
      }
      {
        props.isVoucher
          ? (voucherItemsContainer)
          : props.isAccount
            ? (accountItemsContainer)
            : ""
      }
    </Box>
  )
  const complainActionContainer = (
    <Box>
      <VGButton
        variant="contained"
        color="success"
        size="small"
        sx={{
          height: 40,
          minWidth: 40
        }}
        fullWidth
        onClick={() => void router.push(`/seller/obrolan/komplain/${moderation?.data?.data?.id as string}`)}
      >
        {t("detail.list.complain.button")}
      </VGButton>
      {
        props.isVoucher
          ? (voucherItemsContainer)
          : props.isAccount
            ? (accountItemsContainer)
            : ""
      }
    </Box>
  )
  const doneActionContainer = (
    props.isVoucher
      ? (voucherItemsContainer)
      : props.isAccount
        ? (accountItemsContainer)
        : ""
  )
  const cancelActionContainer = (
    <VGButton
      variant="outlined"
      color="secondary"
      size="small"
      fullWidth
      sx={{
        height: 40,
        fontSize: 12
      }}
      onClick={() => setIsOpenDetailCancelDialog(true)}
    >
      {t("detail.list.detailCancel.button")}
    </VGButton>
  )

  return (
    <>
      <Grid
        container
        spacing={2}
        my={2}
      >
        <Grid
          item
          md={5}
        >
          <Box display="flex">
            <img
              src={props.image}
              width={60}
              height={60}
              alt="Product Picture"
              style={{ objectFit: "cover" }}
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
                  label={props.statusName}
                  color={getChipColor()}
                  size="small"
                />
              </Box>
              <Typography sx={productNameStyle}>
                {props.productName}
              </Typography>
              {
                props.isKilat
                  ? (
                    <Image
                      src="/assets/badge-kilat.svg"
                      width={55}
                      height={11}
                      alt="Badge Kilat"
                    />
                  )
                  : props.isInstant
                    ? (
                      <Image
                        src="/assets/badge-instant.svg"
                        width={50}
                        height={10}
                        alt="Badge Instant"
                      />
                    ) : ""
              }
              <Typography sx={brandNameStyle}>
                {props.brandName}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
              >
                <NotesIcon />
                <Box width="100%" ml={1}>
                  {
                    props.notes
                      ? (
                        <Box display="grid">
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
                            {t("detail.list.note.seeNotes")}
                          </Link>
                        </Box>
                      )
                      : (
                        <Typography sx={emptyNoteStyle}>
                          {t("detail.list.note.emptyNotes")}
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
            {
              props.status === 2 ? (
                props.isKilat && countDown !== undefined ? (
                  <Box textAlign="center">
                    <Typography sx={cancelTimeStyle}>{t("detail.list.processTime")}</Typography>
                    <Box display="flex">
                      <Box px={2} borderRight="1px solid #DEDEDE">
                        <Typography color="error" fontSize={16} fontWeight={700}>
                          {countDown?.minutes}
                        </Typography>
                        <Typography fontSize={12} fontWeight={600} color="common.shade.200">
                          {t("detail.list.minutes")}
                        </Typography>
                      </Box>
                      <Box px={2}>
                        <Typography color="error" fontSize={16} fontWeight={700}>
                          {countDown?.seconds}
                        </Typography>
                        <Typography fontSize={12} fontWeight={600} color="common.shade.200">
                          {t("detail.list.seconds")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box textAlign="center" width={106} mb={1}>
                    <Typography sx={cancelTimeStyle}>{t("detail.list.cancelTime")}</Typography>
                    <VGChip
                      label={(
                        <Typography sx={timeStyle}>
                          <TimeIcon fontSize="small" sx={{ mr: 1 }} />
                          {props.cancelTime}
                        </Typography>
                      )}
                      size="small"
                    />
                    {props.isKilat && (
                      <Typography fontSize={12} fontWeight={700} color="error" mt={0.5}>
                        {t("detail.list.warning")}
                      </Typography>
                    )}
                  </Box>
                )
              ) : props.status === 3 ? (
                <Box>
                  <Typography sx={cancelTimeStyle}>{t("detail.list.finishTime")}</Typography>
                  <VGChip
                    label={(
                      <Typography sx={timeStyle}>
                        <TimeIcon fontSize="small" sx={{ mr: 1 }} />
                        {props.finishTime}
                      </Typography>
                    )}
                    size="small"
                  />
                </Box>
              ) : null
            }
            <Link
              sx={{
                ...seeNoteStyle,
                cursor: "pointer",
                textDecoration: "none"
              }}
              onClick={copyNotes}
            >
              {t("detail.list.note.copyNotes")}
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          md={2}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            height="100%"
            mr={2}
          >
            <Typography sx={totalStyle}>
              {priceFormat(props.price)}
            </Typography>
            <Typography sx={qtyStyle}>
              {t("label.qty")}: {props.qty}
            </Typography>
            <Typography sx={subTotalLabelStyle}>
              {"Subtotal: "}
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
          {
            props.status === 2 ?
              (onProcessActionContainer) :
              props.status === 3 ?
                (sentActionVoucherContainer) :
                props.status === 4 ?
                  (doneActionContainer) :
                  props.status === 5 ?
                    (cancelActionContainer)
                    : (complainActionContainer)
          }
        </Grid>
      </Grid>
      <TransactionCancelDialog
        id={props.id}
        isOpen={isOpenCancelDialog}
        handleClose={() => setIsOpenCancelDialog(false)}
        refetch={props.refetch}
      />
      <TransactionNotesDialog
        notes={props.notes}
        isOpen={isOpenNotesDialog}
        handleClose={() => setIsOpenNotesDialog(false)}
      />
      {/* Process */}
      <TransactionProcessVoucherDialog
        id={props.id}
        qty={props.qty}
        isOpen={isOpenProcessVoucherDialog}
        handleClose={() => setIsOpenProcessVoucherDialog(false)}
        refetch={props.refetch}
      />
      <TransactionProcessAccountDialog
        id={props.id}
        qty={props.qty}
        isOpen={isOpenProcessAccountDialog}
        handleClose={() => setIsOpenProcessAccountDialog(false)}
        refetch={props.refetch}
      />
      <TransactionProcessDialog
        id={props.id}
        isOpen={isOpenProcessDialog}
        handleClose={() => setIsOpenProcessDialog(false)}
        refetch={props.refetch}
      />
      {/* Detail */}
      <TransactionDetailCancelDialog
        reason={props.cancelNote}
        isOpen={isOpenDetailCanceDialog}
        handleClose={() => setIsOpenDetailCancelDialog(false)}
      />
      <TransactionDetailVoucherDialog
        deliveryData={props.deliveryData}
        imageUrl={props.image}
        code={props.code}
        name={props.productName}
        brandName={props.brandName}
        isOpen={isOpenDetailVoucherDialog}
        handleClose={() => setIsOpenDetailVoucherDialog(false)}
      />
      <TransactionDetailAccountDialog
        deliveryData={props.deliveryData}
        imageUrl={props.image}
        code={props.code}
        name={props.productName}
        brandName={props.brandName}
        isOpen={isOpenDetailAccountDialog}
        handleClose={() => setIsOpenDetailAccountDialog(false)}
      />
    </>
  )
}