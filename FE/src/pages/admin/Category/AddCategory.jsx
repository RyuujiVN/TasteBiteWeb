import { Form, Input, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAddCategory } from "~/redux/category/categorySlice";

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

const AddCategory = ({ addCategory, setAddCategory }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const hanldeSubmit = async (values) => {
    await toast.promise(dispatch(fetchAddCategory(values)), {
      pending: "Đang thêm...",
    });
  };

  return (
    <div className="add-category">
      <Modal
        className="modal"
        open={addCategory}
        onCancel={() => setAddCategory(false)}
        okText="Thêm"
        cancelText="Hủy"
        onOk={() => form.submit()}
      >
        <div className="modal__header">
          <h2 className="modal__header--title">Thêm loại</h2>
        </div>

        <div className="modal__body">
          <Form form={form} layout="vertical" onFinish={hanldeSubmit}>
            <Form.Item
              label="Tên loại"
              name="name"
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
              <Select options={optionsType} defaultValue="Đồ ăn" />
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

export default AddCategory;
