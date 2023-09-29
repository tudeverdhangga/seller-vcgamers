import { Box } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartArea,
  type ChartData,
} from "chart.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

import type { DataGraphSuccess } from "~/services/dashboard/types";
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

export default function DashboardChart({
  graphData,
}: {
  graphData: DataGraphSuccess;
}) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const { isMobile } = useResponsive();

  const labels = useMemo(
    () => (isMobile ? graphData.label.slice(-3) : graphData.label),
    [isMobile, graphData]
  );

  const dataSets = useMemo(
    () => (isMobile ? graphData.data.slice(-3) : graphData.data),
    [isMobile, graphData]
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          fill: true,
          data: dataSets,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    }),
    [labels, dataSets]
  );

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
  }, [data, setChartData]);

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
