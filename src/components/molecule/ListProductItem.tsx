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

import VGCard from "~/components/atomic/VGCard";
import VGChip from "~/components/atomic/VGChip";
import VGButton from "~/components/atomic/VGButton";
import DeactivateKilatDialog from "~/components/molecule/DeactivateKilatDialog";
import ActivateKilatDialog from "~/components/molecule/ActivateKilatDialog";
import ChangePriceDialog from "~/components/molecule/ChangePriceDialog";
import ChangeStockDialog from "~/components/molecule/ChangeStockDialog";
import ConfirmationDeactiveDialog from "~/components/molecule/ConfirmationDeactiveDialog";
import ConfirmationDeleteDialog from "~/components/molecule/ConfirmationDeleteDialog";
import { capitalizeFirstLetter, priceFormat } from "~/utils/format";
import { useResponsive } from "~/utils/mediaQuery";
import PinVoucherDialog from "~/components/molecule/PinVoucherDialog";

export default function ListProductItem(props: {
  image: string | "/assets/product-image.png";
  name: string;
  status: string;
  price: number;
  feature?: string;
  stock: number;
  id: number; // can change to id or uuid
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDeactiveKilatDialog, setIsOpenDeactiveKilatDialog] = useState(false)
  const [isOpenActiveKilatDialog, setIsOpenActiveKilatDialog] = useState(false)
  const [isOpenChangePriceDialog, setIsOpenChangePriceDialog] = useState(false)
  const [isOpenChangeStockDialog, setIsOpenChangeStockDialog] = useState(false)
  const [isOpenDeactiveProductDialog, setIsOpenDeactiveProductDialog] = useState(false)
  const [isOpenDeleteProductDialog, setIsOpenDeleteProductDialog] = useState(false)
  const [isOpenPinVoucherDialog, setIsOpenPinVoucherDialog] = useState(false)
  const isOpenMenu = Boolean(anchorEl);
  const { isMobile } = useResponsive();
  const { t } = useTranslation("listProduct");

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
        justifyContent: isMobile ? "flex-start" : "center",
        flexDirection: "row"
      }}
    >
      <Image
        src={ props.image }
        width={60}
        height={60}
        alt="Product Picture"
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
          label={ capitalizeFirstLetter(props.status) }
          color={
            props.status === "active"
              ? "success"
              : props.status === "nonActive"
                ? "error"
                : "warning"
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
        { priceFormat(props.price) }
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
                    <Switch onChange={(e) => handleChangeKilat(e)} />
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
        color={ props.stock <= 5 ? "error" : "shade.700" }
        textAlign="center"
        fontWeight="700"
        fontSize="14px"
        sx={{
          ...middleStyle,
          justifyContent: isMobile ? "flex-start" : "center",
          pt: isMobile ? "12px" : 0,
        }}
      >
        { props.stock }
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
              onClick={() => setIsOpenPinVoucherDialog(true)}
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
        <MenuItem onClick={handleCloseOptions}>
          <VisibilityOutlinedIcon sx={{ pr: 1 }} /> {t("table.tBody.detailProduct")}
        </MenuItem>
        <MenuItem onClick={handleCloseOptions}>
           <EditOutlinedIcon sx={{ pr: 1 }} /> {t("table.tBody.editProduct")}
        </MenuItem>
        <MenuItem onClick={() => setIsOpenDeactiveProductDialog(true)}>
          <PowerSettingsNewIcon sx={{ pr: 1, color: "error.main" }} />
          <Typography color="error">
            {t("table.tBody.deactiveProduct")}
          </Typography>
        </MenuItem>
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
      <VGCard>
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
            sx={{ "&.MuiGrid-item": {pl: 0} }}
          >
            {actionsContainer}
          </Grid>
        </Grid>
      </VGCard>

      {/* Dialog */}
      <ActivateKilatDialog
        name={props.name}
        isBulk={false}
        isOpen={isOpenActiveKilatDialog}
        handleClose={() => setIsOpenActiveKilatDialog(false)}
      />
      <DeactivateKilatDialog
        name={props.name}
        isBulk={false}
        isOpen={isOpenDeactiveKilatDialog}
        handleClose={() => setIsOpenDeactiveKilatDialog(false)}
      />
      <ChangePriceDialog
        name={props.name}
        image={props.image}
        price={props.price}
        isOpen={isOpenChangePriceDialog}
        handleClose={() => setIsOpenChangePriceDialog(false)}
      />
      <ChangeStockDialog
        name={props.name}
        image={props.image}
        stock={props.stock}
        isOpen={isOpenChangeStockDialog}
        handleClose={() => setIsOpenChangeStockDialog(false)}
      />
      <ConfirmationDeactiveDialog
        name={props.name}
        image={props.image}
        isOpen={isOpenDeactiveProductDialog}
        handleClose={() => setIsOpenDeactiveProductDialog(false)}
      />
      <ConfirmationDeleteDialog
        name={props.name}
        image={props.image}
        isOpen={isOpenDeleteProductDialog}
        handleClose={() => setIsOpenDeleteProductDialog(false)}
      />
      <PinVoucherDialog
        id={props.id}
        isOpen={isOpenPinVoucherDialog}
        handleClose={() => setIsOpenPinVoucherDialog(false)}
      />
    </>
  )
}