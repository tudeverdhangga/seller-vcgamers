import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { useAtom } from "jotai";

import NotificationCard from "../molecule/NotificationCard";
import NotificationUpdateIcon from "../icons/NotificationUpdateIcon";
import NotificationDetailDialog from "../molecule/NotificationDetailDialog";
import {
  notificationDetailAtom,
  notificationDetailOpenAtom,
} from "~/atom/notificationDetail";

export default function NotificationSalesContent() {
  const [, setOpen] = useAtom(notificationDetailOpenAtom);
  const [, setNotificationDetail] = useAtom(notificationDetailAtom);

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
          icon={<NotificationUpdateIcon />}
          title="(Update) Fitur Penjualan di Aplikasi VCGamers"
          subtitle={body}
          time="Baru saja"
          onClick={() => {
            setNotificationDetail({
              title: "(Update) Fitur Penjualan di Aplikasi VCGamers",
              body,
            });
            setOpen(true);
          }}
          unread
        />
        <Divider />
        <NotificationCard
          icon={<NotificationUpdateIcon />}
          title="(Update) Fitur Penjualan di Aplikasi VCGamers"
          subtitle={body}
          onClick={() => {
            setNotificationDetail({
              title: "(Update) Fitur Penjualan di Aplikasi VCGamers",
              body,
            });
            setOpen(true);
          }}
          time="Baru saja"
        />
      </List>
      <NotificationDetailDialog />
    </Box>
  );
}

const body = `Halo Vicigers!

Terimakasih telah tetap setia menggunakan layannan VCGamers hingga saat ini! Semoga kamu tetap berkenan menjadikan VCGamers sebagai bagian dari perjalanan game serta melengkapi kebutuhan produk digitalmu. ^^

Sebagai info, khusus untuk tanggal 31 Desember 2022. Ada perubahan jam operasional Admin VCGamers yaitu pukul 8:00 - 21:00 WIB.

Kamu tidak perlu khawatir, karena Admin akan kembali beroperasi seperti biasanya pada tanggal 1 Januari 2023, yaitu:

Senin - Jumat : pukul 7:00 - 23:59 WIB
Sabtu, Minggu dan hari libur Nasional : pukul 8:00 - 22:00 WIB

Sebagai informasi tambahan, kamu bisa menemukan jawaban dari pertanyaan yang sering ditanyakan seputar transaksi di VCGamers dengan klik tautan ini.

Terimakasih atas pengertiannya ya Vicigers. Kami akan terus berupaya dan terus berkembang agar pengalaman belanjamu semakin baik.

Happy new year 2023, Vicigers!`;
