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
import "./Order.scss";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { Flex } from "antd";
import {
  fetchGetListOrderAdmin,
  fetchUpdateOrderStatus,
  fetchUpdatePaymentStatus,
} from "~/redux/order/orderSlice";
import dayjs from "dayjs";
import { orderConfig } from "~/constants/order";
import { DownOutlined } from "@ant-design/icons";
import { formatCurrency } from "~/utils/formatPrice";

const Order = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailCategory, setDetailCategory] = useState(false);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.listOrder);
  const pagination = useSelector((state) => state.order.pagination);

  const debounced = useDebounce(search, 500, setSearchParams);

  const handleUpdateStatus = async (orderId, status) => {
    setLoading(true);
    await dispatch(
      fetchUpdateOrderStatus({
        id: orderId,
        data: {
          status: status,
        },
      })
    );
    setLoading(false);
  };

  const handleUpdatePaymentStatus = async (orderId, payment_status) => {
    setLoading(true);
    await dispatch(
      fetchUpdatePaymentStatus({
        id: orderId,
        data: {
          payment_status: payment_status,
        },
      })
    );
    setLoading(false);
  };

  const handleSet = (value, setModal) => {
    setCategory(value);
    setModal(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    toast.promise(dispatch(fectchDeleteCategory(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
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

  const columns = [
    {
      key: "order_code",
      title: "Mã đơn hàng",
      dataIndex: "order_code",
    },

    {
      key: "customer_name",
      title: "Tên khách hàng",
      dataIndex: "customer_name",
    },

    {
      key: "order_date",
      title: "Ngày đặt",
      dataIndex: "order_date",
    },

    {
      key: "total_cost",
      title: "Tổng tiền",
      dataIndex: "total_cost",
    },

    {
      key: "payment_method",
      title: "Phương thức",
      dataIndex: "payment_method",
    },

    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => {
        const current = orderConfig.ORDER_STATUS[status];

        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items: Object.entries(orderConfig.ORDER_STATUS).map(
                ([key, value]) => ({
                  key,
                  label: (
                    <Tag color={value.color} style={{ margin: 0 }}>
                      {value.text}
                    </Tag>
                  ),
                  onClick: () => handleUpdateStatus(record.key, key),
                })
              ),
            }}
          >
            <Tag
              color={current?.color || "default"}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {current?.text || status}
              <DownOutlined style={{ fontSize: 10 }} />
            </Tag>
          </Dropdown>
        );
      },
    },

    {
      key: "payment_status",
      title: "Thanh toán",
      dataIndex: "payment_status",
      render: (status, record) => {
        const current = orderConfig.ORDER_PAYMENT_STATUS[status];

        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items: Object.entries(orderConfig.ORDER_PAYMENT_STATUS).map(
                ([key, value]) => ({
                  key,
                  label: (
                    <Tag color={value?.color} style={{ margin: 0 }}>
                      {value?.text}
                    </Tag>
                  ),
                  onClick: () => handleUpdatePaymentStatus(record.key, key),
                })
              ),
            }}
          >
            <Tag
              color={current?.color || "default"}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {current?.text || status}
              <DownOutlined style={{ fontSize: 10 }} />
            </Tag>
          </Dropdown>
        );
      },
    },

    {
      key: "action",
      dataIndex: "action",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const searchObject = Object.fromEntries(searchParams.entries());

      await dispatch(fetchGetListOrderAdmin(searchObject));
      setLoading(false);
    };

    fetchData();
  }, [debounced, dispatch, searchParams]);

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
            {orders.length > 0 && (
              <Table
                className="table"
                columns={columns}
                pagination={false}
                loading={loading}
                dataSource={orders.map((order) => ({
                  key: order?.id,
                  order_code: order?.order_code,
                  customer_name: order?.name,
                  order_date: dayjs(order?.created_at).format("DD/MM/YYYY"),
                  total_cost: `${formatCurrency(order?.total_cost)}đ`,
                  payment_method: order?.payment_method,
                  status: order?.status,
                  payment_status: order?.payment_status,
                  action: (
                    <Space size={20}>
                      <Tooltip title="Xem chi tiết">
                        <MdOutlineRemoveRedEye
                          className="table__icon"
                          onClick={() => handleSet(category, setDetailCategory)}
                        />
                      </Tooltip>
                    </Space>
                  ),
                }))}
              />
            )}

            <Pagination
              current={parseInt(searchParams.get("page")) || 1}
              total={pagination?.itemCount}
              align="end"
              showTotal={(total) => `Tổng: ${total} đơn hàng`}
              showSizeChanger
              onChange={handleChangePage}
              pageSizeOptions={[1, 10, 20, 50]}
              className="mt-20"
            />
          </div>
        </Card>
      </div>

      {detailCategory && (
        <DetailCategory
          open={detailCategory}
          setOpen={setDetailCategory}
          category={category}
        />
      )}
    </div>
  );
};

export default Order;
