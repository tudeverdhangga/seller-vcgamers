import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "../icons/chat/CloseIcon";
import { useAtom } from "jotai";
import { messageAttachmentShowAtom } from "~/atom/chat";

export default function ChatMessageAttachment() {
  const [show, setShow] = useAtom(messageAttachmentShowAtom);

  const hideAttachment = () => setShow(false);

  return (
    show && (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          backgroundColor: "background.paper",
          p: "10px",
          borderRadius: "5px",
        }}
      >
        <Image
          src="/assets/chat-product-img.png"
          alt="product image"
          width={60}
          height={60}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            borderRadius: "5px",
            flexGrow: 1,
            alignSelf: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                backgroundColor: "#BFE9F6",
                px: "5px",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{ color: "#024357", fontSize: 12, fontWeight: 700 }}
              >
                Dikirim
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{ color: "common.shade.700", fontSize: 14, fontWeight: 600 }}
          >
            TRXOD-1660273287-32949-38081
          </Typography>
        </Box>
        <IconButton sx={{ alignSelf: "flex-start" }} onClick={hideAttachment}>
          <CloseIcon />
        </IconButton>
      </Box>
    )
  );
}
