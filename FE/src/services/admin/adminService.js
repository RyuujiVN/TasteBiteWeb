import { instance } from "~/api/adminApi";


const login = async (data) => {
  return await instance.post("/auth/login", data);
}

const logout = async () => {
  // return await instance.post("/auth/logout")
}

const refreshToken = async () => {
  return await instance.put("/auth/refresh-token")
}

const adminService = {
  login,
  logout,
  refreshToken
}

export default adminService