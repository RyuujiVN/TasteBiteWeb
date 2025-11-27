import { instance } from "~/api/adminApi";


const login = async (data) => {
  return await instance.post("/auth/login", data);
}

const register = async (data) => {
  return await instance.post("/auth/register", data);
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

const forgotPassword = async (data) => {
  const response = await instance.post("/auth/forgot-password", data);

  return response.data;
}

const verifyOtp = async (data) => {
  const response = await instance.post("/auth/verify-otp", data);

  return response.data;
}

const resetPassword = async (data) => {
  const response = await instance.put("/auth/change-password", data);

  return response.data;
}

const accountService = {
  login,
  logout,
  refreshToken,
  register,
  forgotPassword,
  verifyOtp,
  resetPassword
}

export default accountService