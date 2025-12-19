const ORDER_STATUS = {
  IN_PROGRESS: { text: "Chờ xử lý", color: "orange" },
  SHIPPING: { text: "Đang giao", color: "cyan" },
  COMPLETED: { text: "Hoàn thành", color: "green" },
  CANCELLED: { text: "Đã huỷ", color: "red" },
};

const ORDER_PAYMENT_STATUS = {
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
};

const ORDER_PAYMENT_METHOD = {
  CASH: 'Tiền mặt',
  BANK: 'Chuyển khoản',
}

export const orderConfig = {
  ORDER_STATUS: ORDER_STATUS
}