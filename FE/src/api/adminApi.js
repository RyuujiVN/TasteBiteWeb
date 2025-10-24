import axios from "axios"
import { toast } from "react-toastify";
import adminService from "~/services/admin/adminService";


export const API_ADMIN = axios.create({
  baseURL: "http://localhost:8017/admin/api/v1",
  withCredentials: true,
  timeout: 10 * 60 * 1000
})


// Add a request interceptor
API_ADMIN.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
API_ADMIN.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    adminService.logout().then(
      () => {
        location.href = '/admin/login'
      }
    )
  }

  const originalRequest = error.config;
  if (error.response.status === 410 && !originalRequest._retry) {
    originalRequest._retry = true

    return adminService.refreshToken()
      .then(
        () => {
          return API_ADMIN(originalRequest)
        }
      )
      .catch((err) => {
        adminService.logout().then(
          () => {
            location.href = '/admin/login'
          }
        )

        return Promise.reject(err)
      })
  }

  if (error.response.status !== 401) {
    toast.error(error.response?.data?.message || error.message)
  }
  return Promise.reject(error);
});