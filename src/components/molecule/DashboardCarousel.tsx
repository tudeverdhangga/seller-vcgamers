/* eslint-disable @next/next/no-img-element */
import { styled } from "@mui/material/styles";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import Carousel from "react-material-ui-carousel";

const StyledFiberManualRecordIcon = styled(FiberManualRecord)({
  fontSize: "10px",
});

export default function DashboardCarousel() {
  const items = [1, 2, 3].map((i) => `/assets/banner${i}.png`);

  return (
    <Carousel
      autoPlay={false}
      indicatorContainerProps={{
        style: {
          zIndex: 1,
          marginTop: "-25px",
          position: "relative",
        },
      }}
      IndicatorIcon={<StyledFiberManualRecordIcon />}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#0A056B",
        },
      }}
      indicatorIconButtonProps={{
        style: {
          height: "10px",
          width: "10px",
          margin: "2.5px",
          color: "transparent",
          backgroundColor: "#FFFFFFCC",
        },
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={item}
            alt={item}
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        </div>
      ))}
    </Carousel>
  );
}
