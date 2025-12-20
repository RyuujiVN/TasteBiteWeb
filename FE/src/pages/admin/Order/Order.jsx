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
import { MdOutlineRemoveRedEye } from "react-icons/md";
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
import DatePicker from "antd/es/date-picker";
import OrderDetail from "./OrderDetail";
const { RangePicker } = DatePicker;

const Order = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderDetail, setOrderDetail] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.listOrder);
  const pagination = useSelector((state) => state.order.pagination);

  const debounced = useDebounce(search, 500, setSearchParams);

  const updateParams = (filters) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...currentParams,
      ...filters,
      page: 1,
    });
  };

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
    setOrderId(value);
    setModal(true);
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
      setLoading(true);
      const searchObject = Object.fromEntries(searchParams.entries());

      await dispatch(fetchGetListOrderAdmin(searchObject));
      setLoading(false);
    };

    fetchData();
  }, [debounced, dispatch, searchParams]);

  return (
    <div className="order-admin">
      <div className="order-admin__header box-head">
        <h2 className="order-admin__header--title box-head__title">
          Danh sách đơn hàng
        </h2>
      </div>

      <div className="order-admin__body">
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

              <Dropdown
                trigger={["click"]}
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
                            {/* STATUS */}
                            <Form.Item label="Trạng thái đơn hàng">
                              <Select
                                placeholder="Chọn trạng thái"
                                defaultValue="ALL"
                                onChange={(value) => {
                                  updateParams({
                                    status: value === "ALL" ? "" : value,
                                  });
                                }}
                              >
                                <Select.Option value="ALL">
                                  Tất cả
                                </Select.Option>

                                {Object.entries(orderConfig.ORDER_STATUS).map(
                                  ([key, value]) => (
                                    <Select.Option key={key} value={key}>
                                      {value.text}
                                    </Select.Option>
                                  )
                                )}
                              </Select>
                            </Form.Item>

                            {/* PAYMENT */}
                            <Form.Item label="Trạng thái thanh toán">
                              <Select
                                placeholder="Chọn trạng thái thanh toán"
                                defaultValue="ALL"
                                onChange={(value) => {
                                  updateParams({
                                    payment_status:
                                      value === "ALL" ? "" : value,
                                  });
                                }}
                              >
                                <Select.Option value="ALL">
                                  Tất cả
                                </Select.Option>

                                {Object.entries(
                                  orderConfig.ORDER_PAYMENT_STATUS
                                ).map(([key, value]) => (
                                  <Select.Option key={key} value={key}>
                                    {value.text}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>

                            {/* DATE RANGE */}
                            <Form.Item label="Khoảng ngày">
                              <RangePicker
                                format="DD/MM/YYYY"
                                onChange={(dates) => {
                                  if (!dates) {
                                    updateParams({
                                      from_date: undefined,
                                      to_date: undefined,
                                    });
                                    return;
                                  }

                                  updateParams({
                                    date_start: dates[0].format("YYYY-MM-DD"),
                                    date_end: dates[1].format("YYYY-MM-DD"),
                                  });
                                }}
                              />
                            </Form.Item>
                          </Form>
                        </div>
                      ),
                    },
                  ],
                }}
              >
                <Button>
                  <CiFilter /> Bộ lọc
                </Button>
              </Dropdown>
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
                  payment_method:
                    orderConfig.ORDER_PAYMENT_METHOD[order?.payment_method] ||
                    order?.payment_method,
                  status: order?.status,
                  payment_status: order?.payment_status,
                  action: (
                    <Space size={20}>
                      <Tooltip title="Xem chi tiết">
                        <MdOutlineRemoveRedEye
                          className="table__icon"
                          onClick={() => handleSet(order?.id, setOrderDetail)}
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

      {orderDetail && (
        <OrderDetail open={orderDetail} setOpen={setOrderDetail} id={orderId} />
      )}
    </div>
  );
};

export default Order;
