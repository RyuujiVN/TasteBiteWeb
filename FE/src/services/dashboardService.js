import { instance } from "~/api";


const revenue = async (params) => {
  const response = await instance.get("/revenue", {
    params: params
  });
  return response.data
}
const dashboardService = {
  revenue,
}

export default dashboardService