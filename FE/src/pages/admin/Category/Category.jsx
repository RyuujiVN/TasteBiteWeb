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
import AddCategory from "./AddCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  fectchDeleteCategory,
  fetchGetListCategory,
} from "~/redux/category/categorySlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import "./Category.scss";
import EditCategory from "./EditCategory";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";

const columns = [
  {
    key: "title",
    title: "Tên loại",
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

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.listCategory);
  const pagination = useSelector((state) => state.category.pagination);

  const debounced = useDebounce(searchParams.get("keyword"), 500);

  const handleSet = (value, setModal) => {
    setCategory(value);
    setModal(true);
  };

  const handleDelete = (id) => {
    toast.promise(dispatch(fectchDeleteCategory(id)), {
      pending: "Đang xoá...",
    });
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

    dispatch(fetchGetListCategory(searchObject));
  }, [debounced, dispatch, searchParams]);

  console.log(category);

  return (
    <div className="category">
      <div className="category__header box-head">
        <h2 className="category__header--title box-head__title">Loại món</h2>
      </div>

      <div className="category__body">
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

              <div className="category__action">
                <Space>
                  <Button type="primary" onClick={() => setAddCategory(true)}>
                    <FaPlus /> Thêm loại
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
            {categories.length > 0 && (
              <Table
                className="table"
                columns={columns}
                pagination={false}
                dataSource={categories.map((category) => ({
                  key: category?._id,
                  title: category?.title,
                  description: category?.description,
                  type:
                    category?.type === "Đồ ăn" ? (
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
                        <MdOutlineRemoveRedEye className="table__icon" />
                      </Tooltip>

                      <Tooltip title="Chỉnh sửa">
                        <AiOutlineEdit
                          className="table__icon"
                          onClick={() => handleSet(category, setEditCategory)}
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xoá loại"
                        description="Bạn có chắc muốn xoá loại này"
                        onConfirm={() => handleDelete(category._id)}
                        okText="Xoá"
                        cancelText="Huỷ"
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
              showTotal={(total) => `Tổng: ${total} loại`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[1, 10, 20, 50]}
              className="mt-20"
            />
          </div>
        </Card>
      </div>

      {addCategory && (
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
    </div>
  );
};

export default Category;
