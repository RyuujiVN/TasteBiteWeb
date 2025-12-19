const ORDER_STATUS = {
  PENDING: { text: "Chờ xử lý", color: "orange" },
  CONFIRMED: { text: "Đã xác nhận", color: "blue" },
  SHIPPING: { text: "Đang giao", color: "cyan" },
  COMPLETED: { text: "Hoàn thành", color: "green" },
  CANCELLED: { text: "Đã huỷ", color: "red" },
};

export const orderConfig = {
  ORDER_STATUS: ORDER_STATUS
}