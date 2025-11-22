import {
  Button,
  Card,
  Divider,
  Dropdown,
  Flex,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllCategory } from "~/redux/category/categorySlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import "./Product.scss";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import {
  fetchDeleteProduct,
  fetchGetListProduct,
  fetchUpdateMultiProduct,
} from "~/redux/product/productSlice";
import { formatCurrency } from "~/utils/formatPrice";
import ProductDetail from "./DetailProduct";
import { FaSortAmountDown } from "react-icons/fa";

const columns = [
  {
    key: "image",
    title: "Hình ảnh",
    dataIndex: "image",
  },

  {
    key: "title",
    title: "Tên sản phẩm",
  },

  {
    key: "price",
    title: "Giá",
    dataIndex: "price",
  },

  {
    key: "created_at",
    title: "Ngày tạo",
    dataIndex: "created_at",
  },

  {
    key: "updated_at",
    title: "Ngày cập nhật",
    dataIndex: "updated_at",
  },

  {
    key: "type",
    title: "Thuộc",
    dataIndex: "type",
  },

  {
    key: "status",
    title: "Trạng thái",
    dataIndex: "status",
  },

  {
    key: "action",
    dataIndex: "action",
  },
];

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.listProduct);
  const categories = useSelector((state) => state.category.listCategory);
  const pagination = useSelector((state) => state.product.pagination);

  const debounced = useDebounce(search, 500, setSearchParams);

  const handleDelete = (id) => {
    setLoading(true);
    toast.promise(dispatch(fetchDeleteProduct(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
  };

  const hanldeUpdateMulti = (value) => {
    setLoading(true);

    value.ids = selectedRowKeys;
    toast.promise(dispatch(fetchUpdateMultiProduct(value)), {
      pending: "Đang cập nhật...",
    });

    const searchObject = Object.fromEntries(searchParams.entries());

    dispatch(fetchGetListProduct(searchObject));
    setLoading(false);
  };

  const handleFilter = (value) => {
    const searchObject = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...searchObject,
      category_id: value,
    });
  };

  const handleChangePage = (page, size) => {
    const searchObject = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...searchObject,
      page: page,
      limit: size,
    });
  };

  const handleSetProductDetail = (item) => {
    setProductDetail(item);
    setOpenDetail(true);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSort = (value) => {
    const searchObject = Object.fromEntries(searchParams.entries());
    const [sortBy, order] = value.split("|");

    console.log(sortBy, order);

    setSearchParams({
      ...searchObject,
      sort_by: sortBy,
      order: order,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const searchObject = Object.fromEntries(searchParams.entries());

      await Promise.all([
        dispatch(fetchGetListProduct(searchObject)),
        dispatch(fetchGetAllCategory()),
      ]);
    };

    fetchData();
  }, [debounced, dispatch, searchParams]);

  return (
    <div className="product">
      <div className="product__header box-head">
        <h2 className="product__header--title box-head__title">Loại món</h2>
      </div>

      <div className="product__body">
        <Card className="card">
          <div className="card__header">
            <Flex justify="space-between" align="center">
              <Form className="form-search">
                <Form.Item name="keyword">
                  <Input
                    placeholder="Tìm kiếm..."
                    className="input__search"
                    suffix={<IoIosSearch className="form-search__icon" />}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Item>
              </Form>

              <div className="product__action">
                <Space>
                  <Button
                    type="primary"
                    onClick={() => navigate("/admin/product/add")}
                  >
                    <FaPlus /> Thêm sản phẩm
                  </Button>

                  {/* Filter */}
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "filter",
                          label: (
                            <div
                              className="filter-dropdown__content"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Form layout="vertical">
                                <Form.Item
                                  label="Danh mục sản phẩm"
                                  name="category"
                                >
                                  <Select
                                    placeholder="Chọn danh mục"
                                    onChange={handleFilter}
                                  >
                                    <Select.Option value="">
                                      Tất cả
                                    </Select.Option>

                                    {categories.length > 0 &&
                                      categories.map((item) => (
                                        <Select.Option value={item.id}>
                                          {item.title}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Form>
                            </div>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button>
                      <CiFilter /> Bộ lọc
                    </Button>
                  </Dropdown>

                  {/* Sort */}
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: (
                            <div
                              className="sort-dropdown__content"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Form layout="vertical">
                                <Form.Item label="Sắp xếp theo" name="sort">
                                  <Select
                                    placeholder="Chọn kiểu sắp xếp"
                                    onChange={handleSort}
                                  >
                                    <Select.Option value="title|asc">
                                      Tên: A → Z
                                    </Select.Option>

                                    <Select.Option value="title|desc">
                                      Tên: Z → A
                                    </Select.Option>

                                    <Select.Option value="price|asc">
                                      Giá: Thấp → Cao
                                    </Select.Option>

                                    <Select.Option value="price|desc">
                                      Giá: Cao → Thấp
                                    </Select.Option>

                                    <Select.Option value="created_at|desc">
                                      Mới nhất
                                    </Select.Option>

                                    <Select.Option value="created_at|asc">
                                      Cũ nhất
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Form>
                            </div>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button>
                      <FaSortAmountDown />
                      Sắp xếp
                    </Button>
                  </Dropdown>

                  {/* Update Multi */}
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "update-multi",
                          label: (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{ padding: 10, width: 250 }}
                            >
                              <Form
                                layout="vertical"
                                onFinish={hanldeUpdateMulti}
                              >
                                <Form.Item name="type">
                                  <Select placeholder="Chọn hành động">
                                    <Select.Option value="active">
                                      Hoạt động
                                    </Select.Option>

                                    <Select.Option value="inactive">
                                      Dừng hoạt động
                                    </Select.Option>

                                    <Select.Option value="special">
                                      Là món đặc trưng
                                    </Select.Option>

                                    <Select.Option value="not_special">
                                      Không phải là món đặc trưng
                                    </Select.Option>

                                    <Select.Option value="delete">
                                      Xoá tất cả
                                    </Select.Option>
                                  </Select>
                                </Form.Item>

                                <Button type="primary" block htmlType="submit">
                                  Áp dụng
                                </Button>
                              </Form>
                            </div>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button disabled={selectedRowKeys.length === 0}>
                      Cập nhật nhiều
                    </Button>
                  </Dropdown>
                </Space>
              </div>
            </Flex>
          </div>

          <Divider />

          <div className="card__body">
            {products.length > 0 && (
              <Table
                className="table"
                columns={columns}
                pagination={false}
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                dataSource={products.map((product) => ({
                  key: product?.id,
                  image: (
                    <img src={product?.image_url} height={100} width={150} />
                  ),
                  title: product?.title,
                  price: formatCurrency(product?.price),
                  created_at: product?.created_at,
                  updated_at: product?.updated_at,
                  type:
                    product?.category?.type === "Đồ ăn" ? (
                      <Tag bordered={false} color="orange">
                        {product?.category?.title}
                      </Tag>
                    ) : (
                      <Tag bordered={false} color="cyan">
                        {product?.category?.title}
                      </Tag>
                    ),
                  status: product?.deleted ? (
                    <Tag color="error">Dừng hoạt động</Tag>
                  ) : (
                    <Tag color="green">Hoạt động</Tag>
                  ),
                  action: (
                    <Space size={20}>
                      <Tooltip title="Xem chi tiết">
                        <MdOutlineRemoveRedEye
                          className="table__icon"
                          onClick={() => handleSetProductDetail(product)}
                        />
                      </Tooltip>

                      <Tooltip title="Chỉnh sửa">
                        <AiOutlineEdit
                          className="table__icon"
                          onClick={() =>
                            navigate(`/admin/product/update/${product.id}`)
                          }
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xoá sản phẩm"
                        description="Bạn có chắc muốn xoá sản phẩm này"
                        onConfirm={() => handleDelete(product.id)}
                        okText="Xoá"
                        cancelText="Huỷ"
                        okButtonProps={{ loading: loading }}
                      >
                        <Tooltip title="Xoá">
                          <AiOutlineDelete className="table__icon" />
                        </Tooltip>
                      </Popconfirm>
                    </Space>
                  ),
                }))}
              />
            )}

            {/* <Pagination
              current={parseInt(searchParams.get("page")) || 1}
              total={pagination?.itemCount}
              align="end"
              showTotal={(total) => `Tổng: ${total} sản phẩm`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[1, 10, 20, 50]}
              className="mt-20"
            /> */}
          </div>
        </Card>

        {/* <ProductDetail
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          product={productDetail}
        /> */}
      </div>
    </div>
  );
};

export default Product;
