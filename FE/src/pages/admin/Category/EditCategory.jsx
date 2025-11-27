import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchUpdateCategory } from "~/redux/category/categorySlice";

const optionsType = [
  {
    value: "Đồ ăn",
    label: "Đồ ăn",
  },

  {
    value: "Nước uống",
    label: "Nước uống",
  },
];

const EditCategory = ({ editCategory, setEditCategory, category }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const hanldeSubmit = async (value) => {
    setLoading(true);
    await toast.promise(
      dispatch(fetchUpdateCategory({ id: category.id, data: value })),
      {
        pending: "Đang chỉnh sửa...",
      }
    );
    setLoading(false);
  };

  return (
    <div className="add-category">
      <Modal
        className="modal"
        open={editCategory}
        onCancel={() => setEditCategory(false)}
        okText="Sửa"
        cancelText="Hủy"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <div className="modal__header">
          <h2 className="modal__header--title">Chỉnh sửa loại</h2>
        </div>

        <div className="modal__body">
          <Form
            form={form}
            layout="vertical"
            onFinish={hanldeSubmit}
            initialValues={category}
          >
            <Form.Item
              label="Tên loại"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên loại",
                },

                {
                  pattern: /^\D+$/,
                  message: "Tên loại không được chứa số",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Thuộc loại" name="type">
              <Select options={optionsType} />
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

export default EditCategory;
