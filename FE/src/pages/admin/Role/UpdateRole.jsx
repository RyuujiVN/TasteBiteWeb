import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchUpdateRole } from "~/redux/role/roleSlice";

const UpdateRole = ({ role, updateRole, setUpdateRole }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const hanldeSubmit = async (values) => {
    setLoading(true);
    toast.promise(dispatch(fetchUpdateRole({ id: role.id, data: values })), {
      pending: "Đang chỉnh sửa...",
    });
    setLoading(false);
  };

  return (
    <div className="update-role">
      <Modal
        className="modal"
        open={updateRole}
        onCancel={() => setUpdateRole(false)}
        okText="Cập nhật"
        cancelText="Hủy"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <div className="modal__header">
          <h2 className="modal__header--title">Cập nhật role</h2>
        </div>

        <div className="modal__body">
          <Form
            form={form}
            layout="vertical"
            onFinish={hanldeSubmit}
            initialValues={role}
          >
            <Form.Item
              label="Tên role"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên role",
                },

                {
                  pattern: /^\D+$/,
                  message: "Tên role không được chứa số",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={6} showCount maxLength={255} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateRole;
