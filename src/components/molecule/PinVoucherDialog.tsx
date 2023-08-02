import { useState } from "react";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OtpInput from 'react-otp-input';

import VGDialog from "~/components/atomic/VGDialog";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface PinInputProps {
  isError: boolean;
}

const PinInput = styled('input')<PinInputProps>`
  height: 58px;
  width: 30px !important;
  text-align: center;
  border: 0;
  border-bottom: 1px solid #DEDEDE;
  margin: 0 10px;
  font-size: 3rem;
  color: ${props => props.isError ? "#FF3333" : "#40D04F"};
  caret-color: black;

  &:focus {
    border: 0;
    outline: none;
    border-bottom: 1px solid #7750F8;
  }
`;

export default function PinVoucherDialog(props: {
  isOpen: boolean;
  id: string;
  handleClose: () => void;
}) {
  const pinValue = "123456" // Contoh
  const { t } = useTranslation("listProduct");
  const router = useRouter()
  const { isOpen, id, handleClose } = props;
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [open, setOpenSnackbar] = useState(false);

  const onCloseModal = () => {
    setPin('')
    handleClose()
  }
  const onInputPin = (e: string) => {
    setPin(e)
    if (e.length === 6) {
      if (e === pinValue) {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("voucherPermission", "true")
        }
        void router.push(`/seller/produk/kelola-voucher?id=${id}`)
      } else {
        setIsError(true)
      }
    } else {
      setIsError(false)
    }
  }

  return (
    <VGDialog
      isOpen={isOpen}
      width="400px"
      onClose={onCloseModal}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          color="primary"
        >
          {t("table.dialog.changeVoucher.title")}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={600}
        >
          {t("table.dialog.changeVoucher.subTitle")}
        </Typography>
        <OtpInput
          value={pin}
          onChange={onInputPin}
          numInputs={6}
          inputType="password"
          renderInput={(props) => <PinInput isError={isError} {...props} />}
        />
        <Link onClick={() => setOpenSnackbar(true)} sx={{ textDecoration: "none" }}>
          <Typography
            fontSize={14}
            fontWeight={600}
            color="primary"
            mt={1}
          >
            {t("table.dialog.changeVoucher.forget")}
          </Typography>
        </Link>
      </Box>
      {/* Jangan lupa hapus */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Dummy PIN: 123456
        </Alert>
      </Snackbar>
    </VGDialog>
  )
}