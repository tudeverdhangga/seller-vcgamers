import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";

export default function ChatMessageSuggestion() {
  const { t } = useTranslation("chat");

  const suggestions = [
    "suggestion.welcome",
    "suggestion.stockReady",
    "suggestion.thankYou",
    "suggestion.waitOrder",
    "suggestion.ready",
  ] as const;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        px: 2,
        overflowX: "auto",
      }}
    >
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outlined"
          color="primary"
          sx={{
            borderRadius: "10px",
            flex: "none",
            textTransform: "none",
            fontSize: 14,
          }}
        >
          {t(suggestion)}
        </Button>
      ))}
    </Box>
  );
}
