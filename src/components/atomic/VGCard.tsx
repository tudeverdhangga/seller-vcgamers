import {
  Card,
  type SxProps,
  type CardProps,
  type Theme
} from "@mui/material"

export default function VGCard(props: {
  children?: React.ReactNode;
  rest?: CardProps[];
  sx?: SxProps<Theme>;
}) {
  const { children, rest, sx } = props

  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: "10px",
        my: 2,
        ...sx
      }}
      {...rest}
    >
      {children}
    </Card>
  )
}
