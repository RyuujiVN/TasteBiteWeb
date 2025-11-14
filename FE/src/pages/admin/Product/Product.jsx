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
import { fectchDeleteCategory } from "~/redux/category/categorySlice";
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
import { fetchGetListProduct } from "~/redux/product/productSlice";

const columns = [
  {
    key: "image",
    title: "Tên sản phẩm",
    dataIndex: "image",
  },

  {
    key: "title",
    title: "Tên sản phẩm",
    dataIndex: "title",
  },

  {
    key: "description",
    title: "Mô tả",
    dataIndex: "description",
  },

  {
    key: "type",
    title: "Thuộc",
    dataIndex: "type",
  },

  {
    key: "action",
    dataIndex: "action",
  },
];

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [detailCategory, setDetailCategory] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.listProduct);
  const pagination = useSelector((state) => state.product.pagination);

  const debounced = useDebounce(searchParams.get("keyword"), 500);

  const handleSet = (value, setModal) => {
    setProduct(value);
    setModal(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    toast.promise(dispatch(fectchDeleteCategory(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchParams({
      keyword: e.target.value,
    });
  };

  const handleFilter = (value) => {
    const searchObject = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...searchObject,
      type: value,
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

  useEffect(() => {
    const searchObject = Object.fromEntries(searchParams.entries());

    dispatch(fetchGetListProduct(searchObject));
  }, [debounced, dispatch, searchParams]);

  console.log(products);

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
                    onChange={handleSearch}
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
                                    <Select.Option value="Đồ ăn">
                                      Đồ ăn
                                    </Select.Option>

                                    <Select.Option value="Nước uống">
                                      Nước uống
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
                      <CiFilter /> Bộ lọc
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
                dataSource={products.map((product) => ({
                  key: product?._id,
                  title: product?.title,
                  description: product?.description,
                  type:
                    product?.type === "Đồ ăn" ? (
                      <Tag bordered={false} color="error">
                        Đồ ăn
                      </Tag>
                    ) : (
                      <Tag bordered={false} color="cyan">
                        Nước uống
                      </Tag>
                    ),
                  action: (
                    <Space size={20}>
                      <Tooltip title="Xem chi tiết">
                        <MdOutlineRemoveRedEye
                          className="table__icon"
                          onClick={() => handleSet(product, setDetailCategory)}
                        />
                      </Tooltip>

                      <Tooltip title="Chỉnh sửa">
                        <AiOutlineEdit
                          className="table__icon"
                          onClick={() => handleSet(product, setEditCategory)}
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xoá loại"
                        description="Bạn có chắc muốn xoá loại này"
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

            <Pagination
              current={parseInt(searchParams.get("page")) || 1}
              total={pagination?.itemCount}
              align="end"
              showTotal={(total) => `Tổng: ${total} sản phẩm`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[1, 10, 20, 50]}
              className="mt-20"
            />
          </div>
        </Card>
      </div>

      {/* {addCategory && (
        <AddCategory
          addCategory={addCategory}
          setAddCategory={setAddCategory}
        />
      )}

      {editCategory && (
        <EditCategory
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          category={category}
        />
      )}

      {detailCategory && (
        <DetailCategory
          open={detailCategory}
          setOpen={setDetailCategory}
          category={category}
        />
      )} */}
    </div>
  );
};

export default Product;
