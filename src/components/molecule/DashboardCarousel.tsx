/* eslint-disable @next/next/no-img-element */
import { styled } from "@mui/material/styles";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import Carousel from "react-material-ui-carousel";
import Link from "next/link";

const StyledFiberManualRecordIcon = styled(FiberManualRecord)({
  fontSize: "10px",
});

export default function DashboardCarousel() {
  const items = [
    ["/assets/banner1.png", "/seller/request/vip-seller"],
    ["/assets/banner2.png", "/seller/request/instant"],
    ["/assets/banner3.png", "/seller/request/proses-kilat"],
  ];

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
        <Link key={i} href={item[1] as string}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={item[0]}
              alt={item[0]}
              style={{
                minWidth: "100%",
                minHeight: "100%",
                borderRadius: "10px",
              }}
            />
          </div>
        </Link>
      ))}
    </Carousel>
  );
}
