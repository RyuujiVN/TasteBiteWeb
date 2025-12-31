import { Line } from "@ant-design/charts";

const RevenueChart = ({ data }) => {
  const config = {
    data,
    autoFit: true,
    xField: "date",
    yField: "value",
    smooth: true,
    point: { size: 4 },
    tooltip: {
      formatter: (d) => ({
        name: "Revenue",
        value: `$${d.value}`,
      }),
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: "#f0f0f0",
            lineDash: [4, 4],
          },
        },
      },
    },
  };

  return <Line {...config} />;
};

export default RevenueChart;
