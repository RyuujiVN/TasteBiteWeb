import axios from "axios"
import { toast } from "react-toastify";
import adminService from "~/services/accountService";


export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true,
  timeout: 10 * 60 * 1000
})


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = localStorage.getItem("accessToken")

  if (accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

let refreshTokenPromise = null;

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    adminService.logout().then(
      () => {
        location.href = '/login'
      }
    )
  }

  if (error.response.status === 403) location.href = '/access-denied'

  const originalRequest = error.config;
  if (error.response.status === 410 && originalRequest) {

    if (!refreshTokenPromise) {
      refreshTokenPromise = adminService.refreshToken()
        .then(
          (res) => {
            const { accessToken } = res;
            localStorage.setItem('accessToken', accessToken);
            instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          }
        )
        .catch((err) => {
          console.log(err)
          adminService.logout().then(
            () => {
              location.href = '/login'
            }
          )
          return Promise.reject(err)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    }

    return refreshTokenPromise.then(() => {
      return instance(originalRequest)
    })
  }

  console.log(error.response)
  if (error.response.status !== 401) {
    toast.error(error.response?.data?.message || error.message)
  }
  return Promise.reject(error);
});