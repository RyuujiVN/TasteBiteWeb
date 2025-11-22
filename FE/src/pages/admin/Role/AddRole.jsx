import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAddRole } from "~/redux/role/roleSlice";

const AddRole = ({ addRole, setAddRole }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const hanldeSubmit = async (values) => {
    setLoading(true);
    toast.promise(dispatch(fetchAddRole(values)), {
      pending: "Đang thêm...",
    });
    setLoading(false);
  };

  return (
    <div className="add-role">
      <Modal
        className="modal"
        open={addRole}
        onCancel={() => setAddRole(false)}
        okText="Thêm"
        cancelText="Hủy"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <div className="modal__header">
          <h2 className="modal__header--title">Thêm role</h2>
        </div>

        <div className="modal__body">
          <Form form={form} layout="vertical" onFinish={hanldeSubmit}>
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

export default AddRole;
