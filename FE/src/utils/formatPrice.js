export const formatCurrency = (value) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const parseCurrency = (value) => {
  if (!value) return 0;
  // Xóa "VND" và tất cả dấu phẩy
  return Number(value.replace(/[^\d]/g, ""));
}
