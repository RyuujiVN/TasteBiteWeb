import Button from "antd/es/button";
import Card from "antd/es/card";
import Divider from "antd/es/divider";
import Dropdown from "antd/es/dropdown";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Pagination from "antd/es/pagination";
import Popconfirm from "antd/es/popconfirm";
import Select from "antd/es/select";
import Space from "antd/es/space";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import Tooltip from "antd/es/tooltip";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fectchDeleteCategory } from "~/redux/category/categorySlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { Flex, Image } from "antd";
import {
  fetchDeleteUser,
  fetchGetListUser,
  fetchUpdateUserStatus,
} from "~/redux/user/userSlice";

const columns = [
  {
    key: "avatar",
    title: "Ảnh đại diện",
    dataIndex: "avatar",
  },

  {
    key: "full_name",
    title: "Họ tên",
    dataIndex: "full_name",
  },

  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },

  {
    key: "phone",
    title: "Số điện thoại",
    dataIndex: "phone",
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

const Customer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailCategory, setDetailCategory] = useState(false);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.listUser);
  const pagination = useSelector((state) => state.user.pagination);

  const debounced = useDebounce(search, 500, setSearchParams);

  const handleSet = (value, setModal) => {
    setCategory(value);
    setModal(true);
  };

  const handleUpdateStatus = async (id, value) => {
    setLoading(true);
    const payload = {
      status: value,
    };
    await dispatch(fetchUpdateUserStatus({ id: id, data: payload }));
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await toast.promise(dispatch(fetchDeleteUser(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
  };

  const handleFilter = (value) => {
    const searchObject = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...searchObject,
      status: value,
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
    const fetchData = async () => {
      setLoading(true);
      const searchObject = Object.fromEntries(searchParams.entries());

      dispatch(fetchGetListUser(searchObject));
      setLoading(false);
    };

    fetchData();
  }, [debounced, dispatch, searchParams]);

  return (
    <div className="category">
      <div className="category__header box-head">
        <h2 className="category__header--title box-head__title">
          Danh sách khách hàng
        </h2>
      </div>

      <div className="category__body">
        <Card className="card">
          <div className="card__header">
            <Flex justify="space-between" align="center">
              <Form className="form-search">
                <Form.Item name="keyword">
                  <Input
                    placeholder="Tìm kiếm theo email..."
                    className="input__search"
                    suffix={<IoIosSearch className="form-search__icon" />}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Item>
              </Form>

              <div className="category__action">
                <Space>
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
                                <Form.Item label="Trạng thái" name="status">
                                  <Select
                                    placeholder="Chọn trạng thái"
                                    onChange={handleFilter}
                                  >
                                    <Select.Option value="">
                                      Tất cả
                                    </Select.Option>

                                    <Select.Option value={true}>
                                      Đang hoạt động
                                    </Select.Option>

                                    <Select.Option value={false}>
                                      Đã khoá
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
                    <Button type="primary">
                      <CiFilter /> Bộ lọc
                    </Button>
                  </Dropdown>
                </Space>
              </div>
            </Flex>
          </div>

          <Divider />

          <div className="card__body">
            {users.length > 0 && (
              <Table
                className="table"
                columns={columns}
                pagination={false}
                loading={loading}
                dataSource={users.map((user) => ({
                  key: user?.id,
                  avatar: (
                    <Image
                      loading="lazy"
                      src={user?.avatar_url}
                      alt={user?.full_name}
                      height={200}
                    />
                  ),
                  email: user?.email,
                  full_name: user?.full_name,
                  phone: user?.phone,
                  status: user?.status ? (
                    <Tag
                      bordered={false}
                      color="green"
                      variant="solid"
                      onClick={() => handleUpdateStatus(user?.id, false)}
                      style={{ cursor: "pointer" }}
                    >
                      Đang hoạt động
                    </Tag>
                  ) : (
                    <Tag
                      bordered={false}
                      color="error"
                      variant="solid"
                      onClick={() => handleUpdateStatus(user?.id, true)}
                      style={{ cursor: "pointer" }}
                    >
                      Đã khoá
                    </Tag>
                  ),
                  action: (
                    <Space size={20}>
                      <Tooltip title="Xem chi tiết">
                        <MdOutlineRemoveRedEye
                          className="table__icon"
                          onClick={() => handleSet(category, setDetailCategory)}
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xoá tài khoản"
                        description="Bạn có chắc muốn xoá tài khoản này"
                        onConfirm={() => handleDelete(user.id)}
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
              showTotal={(total) => `Tổng: ${total} khách hàng`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[10, 20, 50]}
              className="mt-20"
            />
          </div>
        </Card>
      </div>

      {/* {detailCategory && (
        <DetailCategory
          open={detailCategory}
          setOpen={setDetailCategory}
          category={category}
        />
      )} */}
    </div>
  );
};

export default Customer;
