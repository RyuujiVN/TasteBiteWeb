import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button, Flex } from "antd";
import "./Permission.scss";
import { permissionEnum } from "~/config/rbacConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllRole,
  fetchUpdatePermissionRole,
} from "~/redux/role/roleSlice";
import { toast } from "react-toastify";

const Permission = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const roles = useSelector((state) => state.role.listRole);
  const dispatch = useDispatch();

  const hanldeSubmit = async () => {
    setLoading(true);
    const payload = {
      roles: permissions,
    };

    await toast.promise(dispatch(fetchUpdatePermissionRole(payload)), {
      pending: "Đang cập nhật...",
    });
    setLoading(false);
  };

  const handleChange = (roleId, value, checked) => {
    setPermissions((prev) => {
      const newState = [...prev];

      const roleIndex = newState.findIndex((r) => r.id === roleId);

      if (roleIndex >= 0) {
        const role = newState[roleIndex];
        const updatedPermissions = checked
          ? [...role.permissions, value] // add
          : role.permissions.filter((v) => v !== value); // remove

        newState[roleIndex] = { ...role, permissions: updatedPermissions };
      } else {
        newState.push({ id: roleId, permissions: checked ? [value] : [] });
      }

      return newState;
    });
  };

  console.log(roles.length);

  const isChecked = (roleId, permission) => {
    const role = permissions.find((r) => r.id === roleId);
    return role?.permissions.includes(permission) || false;
  };

  useEffect(() => {
    dispatch(fetchGetAllRole()).then((rolesFromApi) => {
      const initialPermissions = rolesFromApi.payload.map((r) => ({
        id: r.id,
        permissions: r?.permissions?.split(", ") || [],
      }));

      setPermissions(initialPermissions);
    });
  }, [dispatch]);

  return (
    <div className="permission">
      <div className="permission__head">
        <Flex justify="space-between">
          <div className="box-head">
            <h2 className="box-head__title">Phân quyền</h2>
          </div>

          <Button type="primary" loading={loading} onClick={hanldeSubmit}>
            Cập nhật
          </Button>
        </Flex>
      </div>
      <table className="permission__table">
        <tbody>
          <tr className="permission__table--head">
            <td></td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <span>{item.title}</span>
                </td>
              ))}
          </tr>

          <tr>
            <td>Chọn tất cả</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox />
                </td>
              ))}
          </tr>

          <tr></tr>

          <tr className="permission__table--head">
            <td colSpan={roles.length + 1}>Sản phẩm</td>
          </tr>

          <tr>
            <td>Xem</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.VIEW_PRODUCT)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.VIEW_PRODUCT,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Thêm mới</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.ADD_PRODUCT)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.ADD_PRODUCT,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Thay đổi trạng thái</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(
                      item.id,
                      permissionEnum.CHANGE_STATUS_PRODUCT
                    )}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.CHANGE_STATUS_PRODUCT,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Cập nhật</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.UPDATE_PRODUCT)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.UPDATE_PRODUCT,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Xoá</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.DELETE_PRODUCT)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.DELETE_PRODUCT,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr></tr>

          <tr className="permission__table--head">
            <td colSpan={roles.length + 1}>Danh mục</td>
          </tr>

          <tr>
            <td>Xem</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.VIEW_CATEGORY)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.VIEW_CATEGORY,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Thêm mới</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.ADD_CATEGORY)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.ADD_CATEGORY,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Cập nhật</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.UPDATE_CATEGORY)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.UPDATE_CATEGORY,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Xoá</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.DELETE_CATEGORY)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.DELETE_CATEGORY,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr></tr>

          <tr className="permission__table--head">
            <td colSpan={roles.length + 1}>Role</td>
          </tr>

          <tr>
            <td>Xem</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.VIEW_ROLE)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.VIEW_ROLE,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Thêm mới</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.ADD_ROLE)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.ADD_ROLE,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Cập nhật</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.UPDATE_ROLE)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.UPDATE_ROLE,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Xoá</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.DELETE_ROLE)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.DELETE_ROLE,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr className="permission__table--head">
            <td colSpan={roles.length + 1}>Admin</td>
          </tr>

          <tr>
            <td>Xem</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.VIEW_ADMIN)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.VIEW_ADMIN,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Thêm mới</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.ADD_ADMIN)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.ADD_ADMIN,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Cập nhật</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.UPDATE_ADMIN)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.UPDATE_ADMIN,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr>
            <td>Xoá</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(item.id, permissionEnum.DELETE_ADMIN)}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.DELETE_ADMIN,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>

          <tr className="permission__table--head">
            <td colSpan={roles.length + 1}>Quyền</td>
          </tr>

          <tr>
            <td>Phân quyền</td>
            {roles.length > 0 &&
              roles.map((item) => (
                <td key={item.title} className="permission__table--check">
                  <Checkbox
                    checked={isChecked(
                      item.id,
                      permissionEnum.UPDATE_PERMISSION_ROLE
                    )}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        permissionEnum.UPDATE_PERMISSION_ROLE,
                        e.target.checked
                      )
                    }
                  />
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Permission;
