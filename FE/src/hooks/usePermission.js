import { useSelector } from "react-redux";


export const usePermission = (permission) => {
  const permissions = useSelector((state) => state.role.permissionsRole);

  return permissions?.includes(permission)
}