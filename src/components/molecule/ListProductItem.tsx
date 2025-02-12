/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { env } from "~/env.mjs";
import VGCard from "~/components/atomic/VGCard";
import VGChip from "~/components/atomic/VGChip";
import VGButton from "~/components/atomic/VGButton";
import DeactivateKilatDialog from "~/components/molecule/DeactivateKilatDialog";
import ActivateKilatDialog from "~/components/molecule/ActivateKilatDialog";
import ChangePriceDialog from "~/components/molecule/ChangePriceDialog";
import ChangeStockDialog from "~/components/molecule/ChangeStockDialog";
import ConfirmationDeactiveDialog from "~/components/molecule/ConfirmationDeactiveDialog";
import ConfirmationActiveDialog from "~/components/molecule/ConfirmationActiveDialog";
import ConfirmationDeleteDialog from "~/components/molecule/ConfirmationDeleteDialog";
import { priceFormat } from "~/utils/format";
import { useResponsive } from "~/utils/mediaQuery";
import PinVoucherDialog from "~/components/molecule/PinVoucherDialog";
import NoAccessMobileModal from "~/components/atomic/NoAccessMobileModal";
import { useHasPin } from "~/services/pin/hooks";

export default function ListProductItem(props: {
  image: string | "/assets/product-image.png";
  name: string;
  slug: string;
  active: boolean;
  price: number;
  feature: string;
  isKilatActive: boolean;
  stock: number;
  id: string;
  productId: string;
  nextUpdatePrice: string | null;
  nextActiveKilat: string | null;
  refetchProduct: () => void
}) {
  const { isMobile } = useResponsive();
  const { t } = useTranslation("listProduct");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);
  const router = useRouter()
  const checkPin = useHasPin()
  const [isOpenDeactiveKilatDialog, setIsOpenDeactiveKilatDialog] = useState(false)
  const [isOpenActiveKilatDialog, setIsOpenActiveKilatDialog] = useState(false)
  const [isOpenChangePriceDialog, setIsOpenChangePriceDialog] = useState(false)
  const [isOpenChangeStockDialog, setIsOpenChangeStockDialog] = useState(false)
  const [isOpenDeactiveProductDialog, setIsOpenDeactiveProductDialog] = useState(false)
  const [isOpenActiveProductDialog, setIsOpenActiveProductDialog] = useState(false)
  const [isOpenDeleteProductDialog, setIsOpenDeleteProductDialog] = useState(false)
  const [isOpenPinVoucherDialog, setIsOpenPinVoucherDialog] = useState(false)
  const [accessOnPc, setAccessOnPc] = useState(false)
  const [accessOnPcTitle, setAccessOnPcTitle] = useState("")

  const handleClickOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };
  const handleChangeKilat = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked === true
      ? setIsOpenActiveKilatDialog(true)
      : setIsOpenDeactiveKilatDialog(true)
  };
  const moveToDetail = () => {
    window.open(`${env.NEXT_PUBLIC_MARKET_URL}/dagangan/${props.slug}`);
    handleCloseOptions()
  }
  const moveToEdit = () => {
    if (!isMobile) {
      void router.push(`/seller/produk/edit-produk?product_id=${props.productId}`);
      handleCloseOptions()
    } else {
      setAccessOnPcTitle(t("noAccessMobile.edit"))
      setAccessOnPc(true)
    }
  }
  const checkUserHasPin = () => {
    checkPin.mutate(undefined, {
      onSuccess: (res) => {
        if (res?.data?.is_activation_pin) {
          setIsOpenPinVoucherDialog(true);
        } else {
          window.open(`${env.NEXT_PUBLIC_MARKET_URL}/profile/settings/security`);
        }
      }
    })
  }

  const middleStyle = {
    height: "100%",
    display: "flex",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "center",
    flexDirection: isMobile ? "column" : "row"
  };

  const skuProductContainer = (
    <Box
      sx={{
        ...middleStyle,
        justifyContent: "flex-start",
        flexDirection: "row"
      }}
    >
      <img
        src={props.image}
        width={60}
        height={60}
        alt="Product Picture"
        style={{ objectFit: "cover" }}
      />
      <Box ml={2}>
        <Typography
          color="primary"
          fontSize="14px"
          fontWeight="700"
        >
          {props.name}
        </Typography>
        <VGChip
          label={
            props.active
              ? t("filter.status.active")
              : t("filter.status.nonAktive")
          }
          color={
            props.active
              ? "success"
              : "error"
          }
          size="small"
        />
      </Box>
    </Box>
  )
  const priceContainer = (
    <>
      <Typography
        color="secondary"
        fontSize="14px"
        fontWeight="700"
      >
        {isMobile && t("table.th.price")}
      </Typography>
      <Typography
        color="primary"
        fontSize="14px"
        fontWeight="700"
        textAlign="center"
        sx={{
          ...middleStyle,
          justifyContent: isMobile ? "flex-start" : "center",
          pt: isMobile ? "12px" : 0
        }}
      >
        {priceFormat(props.price)}
      </Typography>
    </>
  )
  const featureContainer = (
    <>
      <Typography
        color="secondary"
        fontSize="14px"
        fontWeight="700"
      >
        {isMobile && t("table.th.price")}
      </Typography>
      <Box
        sx={{
          ...middleStyle,
          flexDirection: "column"
        }}
      >
        {
          props.feature === "instant"
            ? (
              <Box>
                <Image
                  src="/assets/badge-instant.svg"
                  width={66}
                  height={16}
                  alt="Badge Kilat"
                />
              </Box>
            )
            : props.feature === "kilat"
              ? (
                <Box
                  sx={{
                    display: isMobile ? "block" : "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& .MuiBox-root": {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }
                  }}
                >
                  <Image
                    src="/assets/badge-kilat.svg"
                    width={78}
                    height={16}
                    alt="Badge Kilat"
                  />
                  <Switch
                    disabled={!props.active}
                    checked={props.isKilatActive}
                    onChange={(e) => handleChangeKilat(e)}
                  />
                </Box>
              )
              : "-"
        }
      </Box>
    </>
  )
  const stockContainer = (
    <>
      <Typography
        color="secondary"
        fontSize="14px"
        fontWeight="700"
      >
        {isMobile && t("table.th.stock")}
      </Typography>
      <Typography
        color={props.stock <= 5 ? "error" : "shade.700"}
        textAlign="center"
        fontWeight="700"
        fontSize="14px"
        sx={{
          ...middleStyle,
          justifyContent: isMobile ? "flex-start" : "center",
          pt: isMobile ? "12px" : 0,
        }}
      >
        {props.stock}
      </Typography>
    </>
  )
  const actionsContainer = (
    <Box sx={{ ...middleStyle, flexDirection: "row" }}>
      <VGButton
        variant="outlined"
        color="primary"
        sx={{ m: 1 }}
        onClick={() => setIsOpenChangePriceDialog(true)}
      >
        {t("table.tBody.changePrice")}
      </VGButton>
      {
        props.feature === "instant"
          ? (
            <VGButton
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              onClick={checkUserHasPin}
            >
              {t("table.tBody.setVoucher")}
            </VGButton>
          )
          : (
            <VGButton
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              onClick={() => setIsOpenChangeStockDialog(true)}
            >
              {t("table.tBody.changeStock")}
            </VGButton>
          )
      }
      <VGButton
        variant="outlined"
        color="secondary"
        sx={{ m: 1 }}
        onClick={handleClickOptions}
      >
        <MoreHorizIcon />
      </VGButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpenMenu}
        onClose={handleCloseOptions}
        MenuListProps={{
          'aria-labelledby': 'basic-VGButton',
        }}
      >
        <MenuItem onClick={moveToDetail}>
          <VisibilityOutlinedIcon sx={{ pr: 1 }} /> {t("table.tBody.detailProduct")}
        </MenuItem>
        <MenuItem onClick={moveToEdit}>
          <EditOutlinedIcon sx={{ pr: 1 }} /> {t("table.tBody.editProduct")}
        </MenuItem>
        {
          props.active
            ? (
              <MenuItem onClick={() => setIsOpenDeactiveProductDialog(true)}>
                <PowerSettingsNewIcon sx={{ pr: 1, color: "error.main" }} />
                <Typography color="error">
                  {t("table.tBody.deactiveProduct")}
                </Typography>
              </MenuItem>
            )
            : (
              <MenuItem onClick={() => setIsOpenActiveProductDialog(true)}>
                <PowerSettingsNewIcon sx={{ pr: 1, color: "success.main" }} />
                <Typography color="success.main">
                  {t("table.tBody.activeProduct")}
                </Typography>
              </MenuItem>
            )
        }
        <MenuItem onClick={() => setIsOpenDeleteProductDialog(true)}>
          <DeleteOutlinedIcon sx={{ pr: 1, color: "error.main" }} />
          <Typography color="error">
            {t("table.tBody.deleteProduct")}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )

  return (
    <>
      <VGCard sx={{ margin: 0 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
          >
            {skuProductContainer}
          </Grid>
          <Grid
            item
            xs={4}
            md={2}
          >
            {priceContainer}
          </Grid>
          <Grid
            item
            xs={6}
            md={2}
          >
            {featureContainer}
          </Grid>
          <Grid
            item
            xs={2}
            md={1}
          >
            {stockContainer}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ "&.MuiGrid-item": { pl: 0 } }}
          >
            {actionsContainer}
          </Grid>
        </Grid>
      </VGCard>

      {/* Dialog */}
      <ActivateKilatDialog
        id={props.id}
        name={props.name}
        isBulk={false}
        isOpen={isOpenActiveKilatDialog}
        nextActiveKilat={props.nextActiveKilat || ""}
        handleClose={() => setIsOpenActiveKilatDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <DeactivateKilatDialog
        id={props.id}
        name={props.name}
        isBulk={false}
        isOpen={isOpenDeactiveKilatDialog}
        handleClose={() => setIsOpenDeactiveKilatDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <ChangePriceDialog
        id={props.id}
        name={props.name}
        image={props.image}
        price={props.price}
        nextUpdatePrice={props.nextUpdatePrice}
        isOpen={isOpenChangePriceDialog}
        handleClose={() => setIsOpenChangePriceDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <ChangeStockDialog
        id={props.id}
        name={props.name}
        image={props.image}
        stock={props.stock}
        isOpen={isOpenChangeStockDialog}
        handleClose={() => setIsOpenChangeStockDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <ConfirmationDeactiveDialog
        id={props.id}
        name={props.name}
        image={props.image}
        isOpen={isOpenDeactiveProductDialog}
        handleClose={() => setIsOpenDeactiveProductDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <ConfirmationActiveDialog
        id={props.id}
        name={props.name}
        image={props.image}
        isOpen={isOpenActiveProductDialog}
        handleClose={() => setIsOpenActiveProductDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <ConfirmationDeleteDialog
        id={props.id}
        name={props.name}
        image={props.image}
        isOpen={isOpenDeleteProductDialog}
        handleClose={() => setIsOpenDeleteProductDialog(false)}
        refetchProduct={props.refetchProduct}
      />
      <PinVoucherDialog
        id={props.id}
        productId={props.productId}
        isOpen={isOpenPinVoucherDialog}
        handleClose={() => setIsOpenPinVoucherDialog(false)}
      />
      <NoAccessMobileModal
        title={accessOnPcTitle}
        isOpen={accessOnPc}
        handleClose={() => setAccessOnPc(false)}
      />
    </>
  )
}