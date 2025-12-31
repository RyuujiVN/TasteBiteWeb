import { Pie } from "@ant-design/charts";

const OrderStatusChart = ({ data }) => {
  const chartData = [
    { type: "Hoàn thành", value: data?.completed || 0 },
    { type: "Đã huỷ", value: data?.cancelled || 0 },
  ];

  const config = {
    data: chartData,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.7,
    legend: false,
    scale: {
      color: {
        range: ["#27AE60", "#ff4d4f"],
      },
    },
    label: {
      type: "inner",
      content: ({ percent }) =>
        percent ? `${(percent * 100).toFixed(0)}%` : "",
    },
    statistic: {
      title: {
        content: "Đơn hàng",
      },
    },
  };

  return <Pie {...config} />;
};

export default OrderStatusChart;
