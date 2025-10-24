import { instance } from "~/api/adminApi";


const login = async (data) => {
  return await instance.post("/auth/login", data);
}

const logout = async () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  return await instance.post("/auth/refresh-token", {
    refreshToken: refreshToken
  })
}

const adminService = {
  login,
  logout,
  refreshToken
}

export default adminService