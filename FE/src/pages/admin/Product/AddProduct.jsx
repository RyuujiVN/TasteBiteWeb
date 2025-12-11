import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TinyMCE from "~/components/admin/TinyMCE/TinyMCE";
import UploadImage from "~/components/admin/UploadImage/UploadImage";
import { fetchGetAllCategory } from "~/redux/category/categorySlice";
import { fetchAddProduct } from "~/redux/product/productSlice";
import { formatCurrency, parseCurrency } from "~/utils/formatPrice";

const AddProduct = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.listCategory);
  const dispatch = useDispatch();
  const descriptionRef = useRef(null);

  // Xử lý checkbox
  const handleCheck = (e) => {
    form.setFieldsValue({
      deleted: e.target.checked,
    });
  };

  // Xử lý khi thêm
  const handleSubmit = async (value) => {
    setLoading(true);
    value.description = descriptionRef.current.getContent();
    value.image_url = fileUrl;

    await dispatch(fetchAddProduct(value));
    setLoading(false);
  };

  // Cập nhật lại giá sau khi áp dụng giảm giá
  const hanldeChangeValue = (_, allValues) => {
    const { price, discount } = allValues;

    if (price != null && discount != null) {
      const newPrice = Math.floor(price - (price * discount) / 100);

      form.setFieldsValue({
        new_price: newPrice,
      });
    }
  };

  const selectOption = categories.map((item) => ({
    value: item?.id,
    label: item?.title,
  }));

  useEffect(() => {
    dispatch(fetchGetAllCategory());
  }, [dispatch]);

  return (
    <div className="add-product">
      <div className="add-product__header box-head">
        <h2 className="add-product__header--title box-head__title">
          Thêm sản phẩm
        </h2>
      </div>

      <div className="add-product__body">
        <Form
          className="form add-product__form"
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          onValuesChange={hanldeChangeValue}
          initialValues={{
            price: 1000,
            discount: 0,
            new_price: 1000,
            is_featured: false,
            deleted: false,
          }}
        >
          <Row gutter={[20, 20]}>
            <Col xl={24} lg={24} sm={24} xs={24}>
              <Form.Item label="Hình ảnh">
                <UploadImage setFileUrl={setFileUrl} />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} sm={24} xs={24}>
              <Form.Item
                label="Tên sản phẩm"
                name="title"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} sm={24} xs={24}>
              <Form.Item
                name="price"
                label="Nhập giá:"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá",
                  },
                ]}
              >
                <InputNumber
                  className="input w-100"
                  min={1000}
                  max={1000000000}
                  formatter={formatCurrency}
                  parser={parseCurrency}
                />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} sm={24} xs={24}>
              <Form.Item
                name="discount"
                label="Giảm giá (%):"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giảm giá",
                  },
                ]}
              >
                <InputNumber className="input w-100" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} sm={24} xs={24}>
              <Form.Item name="new_price" label="Giá sau khi giảm:">
                <InputNumber
                  className="input w-100"
                  min={0}
                  max={1000000000}
                  formatter={formatCurrency}
                  parser={parseCurrency}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col xl={24} lg={24} sm={24} xs={24}>
              <Form.Item
                name="category_id"
                label="Loại:"
                rules={[
                  {
                    required: true,
                    message: "Chọn loại sản phẩm",
                  },
                ]}
              >
                <Select options={selectOption} />
              </Form.Item>
            </Col>

            <Col xl={24} lg={24} sm={24} xs={24}>
              <Form.Item name="description" label="Mô tả:">
                <TinyMCE descriptionRef={descriptionRef} />
              </Form.Item>
            </Col>

            <Col xl={24} lg={24} sm={24} xs={24}>
              <Form.Item name="is_featured">
                <Radio.Group
                  options={[
                    {
                      value: false,
                      label: "Không phải là món đặc biệt",
                    },

                    {
                      value: true,
                      label: "Là món đặc biệt",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xl={24} lg={24} sm={24} xs={24}>
              <Form.Item name="deleted">
                <Checkbox onChange={handleCheck}>Dừng hoạt động</Checkbox>
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} sm={24} xs={24}></Col>
          </Row>

          <Space>
            <Form.Item>
              <Button size="large" onClick={() => navigate("/admin/product")}>
                Quay lại
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
