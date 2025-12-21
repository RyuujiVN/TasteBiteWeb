import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "~/constants/regex";
import { fetchAddAdmin } from "~/redux/admin/adminSlice";
import { fetchGetAllRole } from "~/redux/role/roleSlice";

const AddAdmin = ({ addAdmin, setAddAdmin }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const roles = useSelector((state) => state.role.listRole);

  const [form] = Form.useForm();

  const hanldeSubmit = async (values) => {
    setLoading(true);
    delete values.confirm_password;
    values.full_name = values.full_name.trim();
    toast.promise(dispatch(fetchAddAdmin(values)), {
      pending: "Đang thêm...",
    });
    setLoading(false);
  };

  useEffect(() => {
    dispatch(fetchGetAllRole());
  }, [dispatch]);

  return (
    <div className="add-admin">
      <Modal
        className="modal"
        open={addAdmin}
        onCancel={() => setAddAdmin(false)}
        okText="Thêm"
        cancelText="Hủy"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <div className="modal__header">
          <h2 className="modal__header--title">Thêm Admin</h2>
        </div>

        <div className="modal__body">
          <Form form={form} layout="vertical" onFinish={hanldeSubmit}>
            <Form.Item
              label="Họ tên:"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },

                {
                  pattern: /^\D+$/,
                  message: "Họ và tên không được chứa số",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email:"
              name="email"
              normalize={(value) => value?.trim()}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email.",
                },

                {
                  pattern: emailRegex,
                  message: "Vui lòng nhập đúng định dạng email.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phân quyền:"
              name="role_id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn role",
                },
              ]}
            >
              <Select
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.title,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu:"
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },

                {
                  pattern: passwordRegex,
                  message:
                    "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số.",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu..." />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu:"
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu..." />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddAdmin;
