/* eslint-disable @next/next/no-img-element */
import Carousel from "react-material-ui-carousel";

export default function DashboardCarousel() {
  const items = [1, 2, 3].map((i) => `/assets/banner${i}.png`);

  return (
    <Carousel
      indicatorContainerProps={{
        style: {
          zIndex: 1,
          marginTop: "-25px",
          position: "relative",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#0A056B",
        },
      }}
      indicatorIconButtonProps={{
        style: {
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
