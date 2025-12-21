import { instance } from "~/api";


const createPaymentLink = async (data) => {
  return await instance.post("/payment/create", data);
}

const paymentService = {
  createPaymentLink
}

export default paymentService