import { ListItem, Switch, type TypographyProps } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { useState, type MouseEventHandler, useEffect } from "react";

import InstantMenu from "~/components/icons/feature/InstantMenu";
import KilatMenu from "~/components/icons/feature/KilatMenu";
import VIPMenu from "~/components/icons/feature/VIPMenu";
import DeactivateKilatDialog from "~/components/molecule/DeactivateKilatDialog";
import ActivateKilatDialog from "~/components/molecule/ActivateKilatDialog";
import { useGetBulkKilatValue } from "~/services/api/product";

const activeProps: TypographyProps = {
  fontSize: 14,
  fontWeight: "700",
  color: "common.purple.500",
};

const defaultProps: TypographyProps = {
  fontSize: 14,
  fontWeight: "500",
  color: "common.shade.200",
};

export default function DrawerListSubItem({
  name,
  label,
  isActive = false,
  trailing,
  href,
  hasKilat,
  onClick
}: {
  name?: string;
  label: string;
  isActive?: boolean;
  trailing?: React.ReactNode;
  href?: string;
  hasKilat: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const router = useRouter()
  const bulkKilatValue = useGetBulkKilatValue()
  const [isOpenDeactiveKilatDialog, setIsOpenDeactiveKilatDialog] = useState(false)
  const [isOpenActiveKilatDialog, setIsOpenActiveKilatDialog] = useState(false)
  const [totalProduct, setTotalProduct] = useState<number>(0)
  const [isCheckBulk, setIsCheckBulk] = useState(false)

  useEffect(() => {
    if (name === "kilat" && hasKilat) {
      bulkKilatValue.mutate(undefined, {
        onSuccess: (res) => {
          setTotalProduct(res.data.total_item)
          setIsCheckBulk(res.data.toggle_value)
        }
      })
    }
  }, [name])

  const handleChangeKilat = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked === true
      ? setIsOpenActiveKilatDialog(true)
      : setIsOpenDeactiveKilatDialog(true)
  };

  const refetchBulkKilat = () => {
    bulkKilatValue.mutate(undefined, {
      onSuccess: (res) => {
        setTotalProduct(res.data.total_item)
        setIsCheckBulk(res.data.toggle_value)
      }
    })
  }

  const listSubItem = (
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      component="a"
      sx={{
        pl: 6,
        py: 0,
        minHeight: 28,
        textDecoration: "none",
        bgcolor: isActive ? "primary.light" : "#FBFAFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {
        name === "instant"
          ? <InstantMenu />
          : name === "kilat"
            ? <KilatMenu />
            : name === "vip"
              ? <VIPMenu />
              : (
                <ListItemText
                  primary={label}
                  primaryTypographyProps={isActive ? activeProps : defaultProps}
                />
              )
      }
    </ListItemButton>
  );

  if (href) {
    return (
      <>
        <ListItem
          secondaryAction={
            name === "kilat"
              ? (
                <Switch
                  checked={isCheckBulk}
                  disabled={!hasKilat}
                  onChange={(e) => handleChangeKilat(e)}
                />
              )
              : trailing
          }
          onClick={() => void router.push(href)}
          sx={{ p: 0 }}
        >
          {listSubItem}
        </ListItem>

        <ActivateKilatDialog
          isBulk={true}
          name={totalProduct}
          isOpen={isOpenActiveKilatDialog}
          nextActiveKilat={""}
          handleClose={() => setIsOpenActiveKilatDialog(false)}
          refetchProduct={refetchBulkKilat}
        />
        <DeactivateKilatDialog
          isBulk={true}
          name={totalProduct}
          isOpen={isOpenDeactiveKilatDialog}
          handleClose={() => setIsOpenDeactiveKilatDialog(false)}
          refetchProduct={refetchBulkKilat}
        />
      </>
    );
  }

  return listSubItem;
}
