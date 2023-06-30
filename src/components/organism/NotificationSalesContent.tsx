import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import TagIcon from "../icons/svg/notification/tag.svg";
import WalletIcon from "../icons/svg/notification/wallet.svg";
import NotificationCard from "../molecule/NotificationCard";
// import NotificationEmptyState from "../molecule/NotificationEmptyState";

export default function NotificationSalesContent() {
  // return <NotificationEmptyState />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "common.shade.0",
        borderRadius: "10px",
      }}
    >
      <List sx={{ width: "100%" }}>
        <NotificationCard
          icon={<TagIcon />}
          title="Pesanan baru"
          subtitle="Kamu baru saja mendapatkan pesanan baru TRXOD-12312. Harap segera melakukan pengiriman pesanan. Terima kasih"
          time="Baru saja"
        />
        <Divider />
        <NotificationCard
          icon={<WalletIcon />}
          title="Penarikan Saldo Toko"
          subtitle="Penarikan saldo toko sebesar Rp100.000 dengan kode TRXWDS-12312  telah berhasil ditransfer. Silakan cek rekening kamu secara berkala."
          time="Baru saja"
          unread
        />
      </List>
    </Box>
  );
}
