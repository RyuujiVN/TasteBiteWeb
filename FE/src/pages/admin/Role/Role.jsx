import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import "./Role.scss";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { FaPlus } from "react-icons/fa6";
import { fetchDeleteProduct } from "~/redux/product/productSlice";
import { fetchGetListRole } from "~/redux/role/roleSlice";
import AddRole from "./AddRole";
import UpdateRole from "./UpdateRole";

const columns = [
  {
    key: "title",
    title: "Tên role",
    dataIndex: "title",
  },

  {
    key: "description",
    title: "Mô tả",
    dataIndex: "description",
  },

  {
    key: "action",
    dataIndex: "action",
  },
];

const Role = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(false);
  const [addRole, setAddRole] = useState(false);
  const [updateRole, setUpdateRole] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector((state) => state.role.listRole);
  const pagination = useSelector((state) => state.role.pagination);

  const debounced = useDebounce(search, 500, setSearchParams);

  const handleDelete = (id) => {
    setLoading(true);
    toast.promise(dispatch(fetchDeleteProduct(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
  };

  console.log(roles);

  const handleChangePage = (page, size) => {
    const searchObject = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...searchObject,
      page: page,
      limit: size,
    });
  };

  const handleSetUpdateRole = (item) => {
    setRole(item);
    setUpdateRole(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const searchObject = Object.fromEntries(searchParams.entries());

      dispatch(fetchGetListRole(searchObject));
    };

    fetchData();
  }, [dispatch, searchParams]);

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
                  <Button type="primary" onClick={() => setAddRole(true)}>
                    <FaPlus /> Thêm role
                  </Button>
                </Space>
              </div>
            </Flex>
          </div>

          <Divider />

          <div className="card__body">
            {roles.length > 0 && (
              <Table
                className="table"
                columns={columns}
                pagination={false}
                dataSource={roles.map((role) => ({
                  key: role?.id,
                  title: role?.title,
                  description: role?.description,
                  action: (
                    <Space size={20}>
                      <Tooltip title="Chỉnh sửa">
                        <AiOutlineEdit
                          className="table__icon"
                          onClick={() => handleSetUpdateRole(role)}
                        />
                      </Tooltip>

                      <Popconfirm
                        title="Xoá role"
                        description="Bạn có chắc muốn xoá role này"
                        // onConfirm={() => handleDelete(product.id)}
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
              showTotal={(total) => `Tổng: ${total} role`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[1, 10, 20, 50]}
              className="mt-20"
            />
          </div>
        </Card>

        {addRole && <AddRole addRole={addRole} setAddRole={setAddRole} />}

        {updateRole && (
          <UpdateRole
            role={role}
            updateRole={updateRole}
            setUpdateRole={setUpdateRole}
          />
        )}
      </div>
    </div>
  );
};

export default Role;
