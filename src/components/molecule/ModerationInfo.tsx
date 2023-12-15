import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import VGDialog from "~/components/atomic/VGDialog";
import CircleInfoIcon from "~/components/icons/CircleInfoIcon";
import VGButton from "../atomic/VGButton";

type Props = {};

const ModerationInfo = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation("layout");

  return (
    <Box sx={{ backgroundColor: "common.red.0", padding: "16px 20px" }}>
      <Stack direction="row" spacing={"8px"}>
        <CircleInfoIcon sx={{ fontSize: "18px" }} />
        <Box>
          <Typography
            color="common.red.500"
            fontSize={{ xs: 14 }}
            fontWeight="600"
          >
            {t("moderationInfo.message")}
          </Typography>
          <Button
            sx={{
              padding: 0,
              textTransform: "unset",
              color: "common.purple.500",
              fontWeight: "700",
            }}
            variant="text"
            onClick={() => setIsModalOpen(true)}
          >
            {t("moderationInfo.learnMore")}
          </Button>
        </Box>
      </Stack>
      <VGDialog
        isOpen={isModalOpen}
        width="400px"
        onClose={() => setIsModalOpen(false)}
      >
        <Typography
          textAlign="center"
          color="common.purple.500"
          fontSize="16px"
          fontWeight="700"
          marginBottom="10px"
        >
          Tokomu Sedang Dalam Pengawasan
        </Typography>

        <div>
          <Typography
            marginBottom="5px"
            color="common.shade.200"
            fontSize="14px"
            fontWeight="600"
          >
            Hal ini terjadi karena terdapat laporan atau hasil pemantauan tim
            VCGamers terhadap aktivitas tokomu.
          </Typography>
          <Typography color="common.shade.200" fontSize="14px" fontWeight="600">
            Selama pengawasan berlangsung, tokomu akan mengalami beberapa
            pembatasan fitur sebagai berikut:
          </Typography>
          <ol style={{ margin: 0, paddingLeft: "16px" }}>
            <Typography
              color="common.shade.200"
              fontSize="14px"
              fontWeight="600"
            >
              <li>Tokomu tidak bisa melakukan penarikan saldo toko</li>
            </Typography>{" "}
            <Typography
              color="common.shade.200"
              fontSize="14px"
              fontWeight="600"
            >
              <li>
                Buyer tidak bisa melakukan pesanan ke semua produk milik tokomu,
                sehingga tokomu tidak bisa menerima pesanan baru untuk sementara{" "}
              </li>
            </Typography>
          </ol>
          <Typography color="common.shade.200" fontSize="14px" fontWeight="600">
            Info selengkapnya silahkan{" "}
            <a
              href="https://api.whatsapp.com/send/?phone=6281511111659&text&type=phone_number&app_absent=0"
              target="__blank"
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "#7750F8",
              }}
            >
              <Typography is="link" color="common.purple.500">
                hubungi customer support kami
              </Typography>
            </a>
          </Typography>
        </div>

        <Button
          onClick={() => setIsModalOpen(false)}
          variant="contained"
          sx={{
            padding: "16px 0",
            borderRadius: "10px",
            textTransform: "none",
            fontSize: { xs: 14 },
            fontWeight: 600,
            width: "100%",
          }}
        >
          Tutup
        </Button>
      </VGDialog>
    </Box>
  );
};

export default ModerationInfo;
