import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Button,
  Form,
  Slider,
  Row,
  Pagination,
  Spin,
} from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { formatCurrency } from "~/utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllCategory } from "~/redux/category/categorySlice";
import { useSearchParams } from "react-router-dom";
import "./ProductFilter.scss";
import productService from "~/services/productService";
import ProductItem from "~/components/ProductItem/ProductItem";
import { FiSearch } from "react-icons/fi";

const DEFAULT_VALUES = {
  search: "",
  category_id: null,
  order: null,
  price: [0, 1000000],
};

const LIMIT = 20;

const ProductFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.listCategory);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const price = Form.useWatch("price", form) ?? DEFAULT_VALUES.price;

  useEffect(() => {
    dispatch(fetchGetAllCategory());
  }, [dispatch]);

  const buildPayload = (values, page = 1) => ({
    page,
    limit: LIMIT,
    search: values.search || null,
    category_id: values.category_id || null,
    order: values.order || null,
    min_price: values.price?.[0] ?? 0,
    max_price: values.price?.[1] ?? 1000000,
  });

  const fetchData = async (values, page = 1) => {
    setLoading(true);
    try {
      const payload = buildPayload(values, page);
      const res = await productService.filter(payload);

      setProducts(res.data?.items || []);
      setMeta(res.data?.meta || null);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const initValues = { ...DEFAULT_VALUES, search };

    form.setFieldsValue(initValues);
    fetchData(initValues, 1);
  }, []);

  const onFinish = (values) => {
    fetchData(values, 1);
    setSearchParams(values.search ? { search: values.search } : {});
  };

  const handleReset = () => {
    form.resetFields();
    setSearchParams({});
    fetchData(DEFAULT_VALUES, 1);
  };

  const categoryOptions = [
    { value: null, label: "Tất cả" },
    ...(categories?.map((item) => ({
      value: item.id,
      label: item.title,
    })) || []),
  ];

  return (
    <div className="product-filter container mt-20">
      <h2 className="box-head__title">Lọc sản phẩm</h2>

      <Form
        form={form}
        layout="vertical"
        initialValues={DEFAULT_VALUES}
        onFinish={onFinish}
      >
        {/* SEARCH */}
        <div className="filter-search-bar">
          <Form.Item name="search" style={{ flex: 1, marginBottom: 0 }}>
            <Input
              size="large"
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Tìm kiếm
          </Button>

          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            size="large"
            disabled={loading}
          >
            Reset
          </Button>
        </div>

        {/* FILTER GRID */}
        <div className="filter-grid">
          <Form.Item label="Danh mục:" name="category_id">
            <Select size="large" options={categoryOptions} />
          </Form.Item>

          <Form.Item label="Giá:" name="order">
            <Select
              size="large"
              allowClear
              placeholder="Chọn kiểu sắp xếp"
              options={[
                { value: "ASC", label: "Giá tăng dần" },
                { value: "DESC", label: "Giá giảm dần" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Khoảng giá:" name="price">
            <Slider
              range
              min={0}
              max={1000000}
              step={10000}
              value={price}
              onChange={(val) => form.setFieldValue("price", val)}
            />
            <div className="price-labels">
              <span>{formatCurrency(price[0])}</span>
              <span>{formatCurrency(price[1])}</span>
            </div>
          </Form.Item>
        </div>
      </Form>

      {/* PRODUCT LIST */}
      <div className="product-filter__list">
        <h3 className="product-filter__title">Tất cả sản phẩm</h3>

        {/* LOADING */}
        {loading && (
          <div className="product-filter__loading">
            <Spin size="large" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="product-filter__empty">
            <FiSearch className="empty-icon" />

            <h4>Không tìm thấy sản phẩm</h4>
            <p>
              Không có sản phẩm nào phù hợp với bộ lọc hiện tại.
              <br />
              Hãy thử thay đổi hoặc đặt lại bộ lọc.
            </p>
          </div>
        )}

        {/* LIST */}
        {!loading && products.length > 0 && (
          <>
            <Row gutter={[20, 20]}>
              {products.map((item) => (
                <ProductItem key={item.id} product={item} />
              ))}
            </Row>

            {meta && meta.totalItems > meta.itemsPerPage && (
              <div className="product-filter__pagination">
                <Pagination
                  current={meta.currentPage}
                  total={meta.totalItems}
                  pageSize={meta.itemsPerPage}
                  onChange={(page) => fetchData(form.getFieldsValue(), page)}
                  showSizeChanger={false}
                  align="center"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
