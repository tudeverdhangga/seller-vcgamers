import { Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import ContentCard from "../molecule/ContentCard";


export default function CustomizedMidContent(props: {
  title: string,
  stringContents?: Array<string>,
}) {
  const { t } = useTranslation("requestFitur");

  const subContentStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "common.shade.200",
  }

  return (
    <ContentCard title={props.title}>
        {
          props.stringContents && props.stringContents.map((list, idx) => (
            <Typography
              key={idx}
              component="div"
              sx={subContentStyle}
            >
              {`${idx+1}. ${list}`}
            </Typography>
          ))
        }
      </ContentCard>
  )
}
