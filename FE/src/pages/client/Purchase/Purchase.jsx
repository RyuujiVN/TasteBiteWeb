import { Button, Flex, Pagination, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderConfig } from "~/constants/order";
import {
  fetchGetListOrderClient,
  fetchUpdateOrderStatus,
} from "~/redux/order/orderSlice";
import "./Purchase.scss";
import { formatCurrency } from "~/utils/formatPrice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import OrderDetail from "~/pages/admin/Order/OrderDetail";
import { Spin } from "antd";
import { useSearchParams } from "react-router-dom";

const Purchase = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.listOrder);
  const [searchParams, setSearchParams] = useSearchParams();
  const pagination = useSelector((state) => state.order.pagination);
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState(false);
  const [filter, setFilter] = useState({
    status: "",
  });
  const [orderId, setOrderId] = useState(null);

  const statusTabs = [
    {
      key: "",
      label: "Tất cả",
    },
    ...Object.entries(orderConfig.ORDER_STATUS).map(([key, value]) => ({
      key,
      label: value.text,
    })),
  ];

  const handleChangePage = (page, size) => {
    const searchObject = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...searchObject,
      page: page,
      limit: size,
    });
  };

  const handleSet = (value, setModal) => {
    setOrderId(value);
    setModal(true);
  };

  const handleCancelOrder = async (orderId) => {
    setLoading(true);
    await dispatch(
      fetchUpdateOrderStatus({
        id: orderId,
        data: {
          status: "CANCELLED",
        },
      })
    );

    await dispatch(fetchGetListOrderClient(filter));
    setLoading(false);
  };

  const handleChange = (key) => {
    setFilter({
      ...filter,
      status: key,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchGetListOrderClient(filter));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, filter]);

  console.log(pagination);

  return (
    <>
      <Spin spinning={loading} tip="Đang tải đơn hàng...">
        <div className="purchase">
          <h3 className="purchase__title">Quản lý đơn hàng</h3>

          <Tabs centered items={statusTabs} onChange={handleChange} />

          <div className="purchase__list">
            {orders.map((order) => (
              <div key={order?.id} className="purchase__item">
                {/* Header */}
                <div className="purchase__item-header">
                  <span className="purchase__order-code">
                    {order?.order_code}
                  </span>

                  <Tag
                    color={orderConfig.ORDER_STATUS[order?.status].color}
                    className="purchase__status"
                  >
                    {orderConfig.ORDER_STATUS[order.status].text}
                  </Tag>
                </div>

                <div className="purchase__products">
                  {order?.orderItems?.map((item) => (
                    <div key={item?.id} className="purchase__product">
                      <img
                        src={item?.product?.image_url}
                        alt={item?.product?.title}
                        className="purchase__product-img"
                      />

                      <div className="purchase__product-info">
                        <p className="purchase__product-name">
                          {item?.product?.title}
                        </p>
                        <span className="purchase__product-qty">
                          x{item?.quantity}
                        </span>
                      </div>

                      <div className="purchase__price">
                        {item?.sale !== item?.retail ? (
                          <>
                            <span className="purchase__price--retail">
                              {formatCurrency(item?.retail)}đ
                            </span>
                            <span className="purchase__price--sale">
                              {formatCurrency(item?.sale)}đ
                            </span>
                          </>
                        ) : (
                          <span className="purchase__price--sale">
                            {formatCurrency(item?.retail)}đ
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="purchase__footer">
                  <div className="purchase__actions">
                    <Button
                      className="purchase__btn purchase__btn--detail"
                      onClick={() => handleSet(order?.id, setOrderDetail)}
                    >
                      <MdOutlineRemoveRedEye /> XEM CHI TIẾT
                    </Button>
                  </div>

                  <Flex align="center" gap={12}>
                    {order?.status === "IN_PROGRESS" &&
                      order?.payment_status !== "PAID" && (
                        <Button
                          type="text"
                          size="small"
                          className="purchase__cancel"
                          onClick={() => handleCancelOrder(order?.id)}
                        >
                          HUỶ ĐƠN
                        </Button>
                      )}

                    <div className="purchase__total">
                      Tổng tiền:
                      <span>{formatCurrency(order?.total_cost)}đ</span>
                    </div>
                  </Flex>
                </div>
              </div>
            ))}
          </div>
          {orderDetail && (
            <OrderDetail
              open={orderDetail}
              setOpen={setOrderDetail}
              id={orderId}
            />
          )}
        </div>

        <Pagination
          current={parseInt(searchParams.get("page")) || 1}
          total={pagination?.itemCount}
          align="center"
          showTotal={(total) => `Tổng: ${total} đơn hàng`}
          showSizeChanger
          onChange={handleChangePage}
          pageSizeOptions={[1, 10, 20, 50]}
          className="mt-20"
        />
      </Spin>
    </>
  );
};

export default Purchase;
