

export const usePermission = (permission) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return userInfo.permissions?.includes(permission)
}