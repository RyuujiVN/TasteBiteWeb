import { Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchUpdateCategory } from "~/redux/category/categorySlice";

const EditCategory = ({ editCategory, setEditCategory, category }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const hanldeSubmit = (value) => {
    const data = {
      id: category._id,
      data: value,
    };
    
    toast.promise(dispatch(fetchUpdateCategory(data)), {
      pending: "Đang chỉnh sửa...",
    });
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
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default EditCategory;
