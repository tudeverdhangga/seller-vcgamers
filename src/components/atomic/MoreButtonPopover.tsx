import { useState, type ReactNode } from "react";

import Popover from "@mui/material/Popover";

import MoreHorizontalIcon from "../icons/MoreHorizontalIcon";
import VGButton from "./VGButton";

export default function MoreButtonPopover(props: {
  menu: ReactNode;
  dialog?: ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  return (
    <>
      <VGButton
        variant="outlined"
        sx={{ borderColor: "common.shade.100" }}
        onClick={handleClick}
      >
        <MoreHorizontalIcon />
      </VGButton>
      <Popover
        id={id}
        open={open}
        elevation={1}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {props.menu}
      </Popover>
      {props.dialog}
    </>
  );
}
