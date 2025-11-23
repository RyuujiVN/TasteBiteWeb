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
import AddCategory from "./AddAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  fectchDeleteCategory,
  fetchGetListCategory,
} from "~/redux/category/categorySlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import "./Admin.scss";
import EditCategory from "./EditAdmin";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { fectchDeleteAdmin, fetchGetListAdmin } from "~/redux/admin/adminSlice";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";
// import DetailCategory from "./DetailCategory";

const columns = [
  {
    key: "avatar",
    title: "Avatar",
    dataIndex: "avatar",
  },

  {
    key: "full_name",
    title: "Họ tên",
    dataIndex: "full_name",
  },

  {
    key: "email",
    title: "Emaill",
    dataIndex: "email",
  },

  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },

  {
    key: "action",
    dataIndex: "action",
  },
];

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [addAdmin, setAddAdmin] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [detailCategory, setDetailCategory] = useState(false);
  const [search, setSearch] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin.listAdmin);
  const pagination = useSelector((state) => state.admin.pagination);

  const debounced = useDebounce(search, 500, setSearchParams);

  const handleSet = (value, setModal) => {
    setAdmin(value);
    setModal(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    toast.promise(dispatch(fectchDeleteAdmin(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
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

    dispatch(fetchGetListAdmin(searchObject));
  }, [debounced, dispatch, searchParams]);

  return (
    <div className="category">
      <div className="category__header box-head">
        <h2 className="category__header--title box-head__title">
          Danh sách admin
        </h2>
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
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Item>
              </Form>

              <div className="category__action">
                <Space>
                  <Button type="primary" onClick={() => setAddAdmin(true)}>
                    <FaPlus /> Thêm Admin
                  </Button>
                </Space>
              </div>
            </Flex>
          </div>

          <Divider />

          <div className="card__body">
            {admins.length > 0 && (
              <Table
                className="table"
                columns={columns}
                pagination={false}
                dataSource={admins.map((admin) => ({
                  key: admin?.id,
                  full_name: admin?.full_name,
                  email: admin?.email,
                  avatar: admin?.avatar_url,
                  role: admin?.role?.title,
                  action: (
                    <Space size={20}>
                      <Tooltip title="Xem chi tiết">
                        <MdOutlineRemoveRedEye
                          className="table__icon"
                          // onClick={() => handleSet(category, setDetailCategory)}
                        />
                      </Tooltip>

                      <Tooltip title="Chỉnh sửa">
                        <AiOutlineEdit
                          className="table__icon"
                          onClick={() => handleSet(admin, setEditAdmin)}
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xoá admin"
                        description="Bạn có chắc muốn xoá admin này"
                        onConfirm={() => handleDelete(admin.id)}
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
              showTotal={(total) => `Tổng: ${total} loại`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[1, 10, 20, 50]}
              className="mt-20"
            />
          </div>
        </Card>
      </div>

      {addAdmin && <AddAdmin addAdmin={addAdmin} setAddAdmin={setAddAdmin} />}

      {editAdmin && (
        <EditAdmin
          editAdmin={editAdmin}
          setEditAdmin={setEditAdmin}
          admin={admin}
        />
      )}

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

export default Admin;
