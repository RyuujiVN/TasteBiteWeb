const ORDER_STATUS = {
  IN_PROGRESS: { text: "Chờ xử lý", color: "orange" },
  SHIPPING: { text: "Đang giao", color: "cyan" },
  COMPLETED: { text: "Hoàn thành", color: "green" },
  CANCELLED: { text: "Đã huỷ", color: "red" },
};

const ORDER_PAYMENT_STATUS = {
  UNPAID: {
    text: "Chưa thanh toán",
    color: "red",
  },
  PENDING: {
    text: "Đang xử lý",
    color: "orange",
  },
  PAID: {
    text: "Đã thanh toán",
    color: "green",
  },
  FAILED: {
    text: "Thanh toán thất bại",
    color: "volcano",
  },
};

const ORDER_PAYMENT_METHOD = {
  CASH: 'Tiền mặt',
  BANK: 'Chuyển khoản',
}

export const orderConfig = {
  ORDER_STATUS: ORDER_STATUS,
  ORDER_PAYMENT_METHOD: ORDER_PAYMENT_METHOD,
  ORDER_PAYMENT_STATUS: ORDER_PAYMENT_STATUS
}