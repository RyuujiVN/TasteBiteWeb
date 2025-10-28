import { Modal } from "antd";

const DetailCategory = (props) => {
  const { open, setOpen, category } = props;

  return (
    <>
      <Modal
        title={<h4 className="modal__title">Chi tiết danh mục</h4>}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <p>
          <span className="modal__label">Tên danh mục:</span> {category?.title}
        </p>

        <p>
          <span className="modal__label">Thuộc:</span> {category?.type}
        </p>

        <p>
          <span className="modal__label">Mô tả:</span> {category?.description}
        </p>
      </Modal>
    </>
  );
};

export default DetailCategory;
