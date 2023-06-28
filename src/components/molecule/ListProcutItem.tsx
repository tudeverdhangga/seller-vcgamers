import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from "next/image";
import React from "react";

import VGCard from "~/components/atomic/VGCard";
import VGChip from "~/components/atomic/VGChip";
import { capitalizeFirstLetter, priceFormat } from "~/utils/format";

export default function ListProductItem(props: {
  image: string | "/assets/product-image.png";
  name: string;
  status: string;
  price: number;
  feature?: string;
  stock: number;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const middleStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

  const skuProductContainer = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <Image
        src={ props.image }
        width={60}
        height={60}
        alt="Prduct Picture"
      />
      <Box>
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
                : "primary"
          }
          size="small"
        />
      </Box>
    </Box>
  )
  const priceContainer = (
    <Typography
      color="primary"
      fontSize="14px"
      fontWeight="700"
      textAlign="center"
      sx={middleStyle}
    >
      { priceFormat(props.price) }
    </Typography>
  )
  const featureContainer = (
    <>
      {
        props.feature === "instant"
          ? (
            <Box
              sx={{
                flexDirection: "column",
                ...middleStyle
              }}
            >
              <Image
                src="/assets/badge-instant.png"
                width={80}
                height={16}
                alt="Badge Kilat"
              />
              <Switch defaultChecked />
            </Box>
          )
          : props.feature === "kilat"
            ? (
              <Box
                sx={{
                  flexDirection: "column",
                  ...middleStyle
                }}
              >
                <Image
                  src="/assets/badge-kilat.png"
                  width={80}
                  height={16}
                  alt="Badge Kilat"
                />
                <Switch defaultChecked />
              </Box>
            )
            : (
              <Box
                sx={{
                  flexDirection: "column",
                  ...middleStyle
                }}
              >
                -
              </Box>
            )
      }
    </>
  )
  const stockContainer = (
    <>
      <Typography
        color={ props.stock <= 5 ? "error" : "shade.700" }
        textAlign="center"
        fontWeight="700"
        fontSize="14px"
        sx={middleStyle}
      >
        { props.stock }
      </Typography>
    </>
  )
  const actionsContainer = (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
      >
        Ubah Harga
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
      >
        Ubah Stok
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  )

  return (
    <VGCard>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
        >
          { skuProductContainer }
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
        >
          { priceContainer }
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
        >
          { featureContainer }
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
        >
          { stockContainer }
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
        >
          { actionsContainer }
        </Grid>
      </Grid>
    </VGCard>
  )
}