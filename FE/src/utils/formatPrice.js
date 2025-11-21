export const formatCurrency = (value) => {
  return `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const parseCurrency = (value) => {
  if (!value) return 0;
  // Xóa "VND" và tất cả dấu phẩy
  return Number(value.replace(/VND\s?|,/g, ""));
}
