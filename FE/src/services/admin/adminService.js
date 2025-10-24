import { API_ADMIN } from "~/api/adminApi";


const login = async (data) => {
  return await API_ADMIN.post("/authen/login", data);
}

const logout = async () => {
  return await API_ADMIN.post("/authen/logout")
}

const refreshToken = async () => {
  return await API_ADMIN.put("/authen/refresh-token")
}

const adminService = {
  login,
  logout,
  refreshToken
}

export default adminService