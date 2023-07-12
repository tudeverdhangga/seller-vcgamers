import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ChartData,
  type ChartArea,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useResponsive } from "~/utils/mediaQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function DashboardChart() {
  const chartRef = useRef<ChartJS<"line">>(null);
  const { isMobile } = useResponsive();

  const labels = isMobile
    ? ["Apr", "Mei", "Jun"]
    : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];

  const dataSets = isMobile ? [19, 20, 23] : [12, 13, 17, 19, 20, 23];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: dataSets,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const [chartData, setChartData] = useState<ChartData<"line">>(data);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.5,
        fill: true,
        borderColor: "#6B9AD1",
        backgroundColor: createGradient(chart),
      })),
    };

    setChartData(chartData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
      }}
    >
      <Line
        ref={chartRef}
        options={options}
        width={isMobile ? 328 : 753}
        height={285}
        data={chartData}
      />
    </Box>
  );
}

function createGradient({
  ctx,
  chartArea,
}: {
  ctx: CanvasRenderingContext2D;
  chartArea: ChartArea;
}) {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );

  gradient.addColorStop(0, "#2D9AFF");
  gradient.addColorStop(1, "rgba(51,153,255,0.1)");

  return gradient;
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
} satisfies Parameters<typeof Line>["0"]["options"];
