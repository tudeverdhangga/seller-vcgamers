import Carousel from "react-material-ui-carousel";
import Image from "next/image";

export default function DashboardCarousel() {
  const items = [1, 2, 3].map((i) => `/assets/banner${i}.png`);

  return (
    <Carousel indicatorContainerProps={{ style: { marginTop: "-10px" } }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center" }}>
          <Image src={item} alt={item} width={555} height={124} />
        </div>
      ))}
    </Carousel>
  );
}
