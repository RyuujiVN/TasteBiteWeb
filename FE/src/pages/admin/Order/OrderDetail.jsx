import { Modal, Row, Col, Divider, Tag, Button, Form, Input } from "antd";
import dayjs from "dayjs";
import "./OrderDetail.scss";
import InfoRow from "./InfoRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGetDetailOrder } from "~/redux/order/orderSlice";
import { LuCalendarDays } from "react-icons/lu";
import { PiPerson } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import TextArea from "antd/es/input/TextArea";
import { formatCurrency } from "~/utils/formatPrice";
import { orderConfig } from "~/constants/order";
import { MdOutlineEditNote } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { MdOutlineLocalShipping, MdOutlinePayments } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiStickyNote } from "react-icons/ci";

const OrderDetail = ({ open, setOpen, id }) => {
  const order = useSelector((state) => state.order.orderDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchGetDetailOrder(id));
  }, [id, dispatch]);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={900}
      closeIcon
      title={<h3>CHI TIẾT ĐƠN HÀNG</h3>}
    >
      <Row gutter={24}>
        {/* LEFT */}
        <Col span={11}>
          {order?.orderItems?.map((item) => (
            <div className="order-item" key={item?.id}>
              <img src={item?.product?.image_url} alt={item?.product?.title} />

              <div className="order-item__info">
                <div className="name">{item?.product?.title}</div>
                <div className="qty">SL: {item?.quantity}</div>
              </div>

              <div className="price">{formatCurrency(item?.sale)}đ</div>
            </div>
          ))}
        </Col>

        {/* RIGHT */}
        <Col span={13}>
          <div className="order-info">
            <InfoRow
              icon={<LuCalendarDays className="order-info__icon" />}
              label="Ngày đặt hàng"
            >
              {dayjs(order?.created_at).format("DD/MM/YYYY")}
            </InfoRow>

            <InfoRow
              icon={<PiPerson className="order-info__icon" />}
              label="Người nhận"
            >
              {order?.name}
            </InfoRow>

            <InfoRow
              icon={<MdOutlinePhone className="order-info__icon" />}
              label="Số điện thoại"
            >
              {order?.phone}
            </InfoRow>

            <InfoRow
              icon={<FaRegClock className="order-info__icon" />}
              label="Thời gian giao"
            >
              {order?.delivery?.delivery_time_type === "SCHEDULE"
                ? `${order?.delivery?.delivery_time_range} - ${dayjs(
                    order?.delivery?.date
                  ).format("DD/MM/YYYY")}`
                : `Giao ngay - ${dayjs(order?.delivery?.date).format(
                    "DD/MM/YYYY"
                  )}`}
            </InfoRow>

            <InfoRow
              icon={<TbTruckDelivery className="order-info__icon" />}
              label="Phí giao hàng"
            >
              {formatCurrency(order?.shipping_fee)}đ
            </InfoRow>

            <InfoRow
              icon={<HiOutlineCreditCard className="order-info__icon" />}
              label="Phương thức thanh toán"
            >
              {orderConfig.ORDER_PAYMENT_METHOD[order?.payment_method]}
            </InfoRow>

            <InfoRow
              icon={<MdOutlineLocalShipping className="order-info__icon" />}
              label="Trạng thái đơn hàng"
            >
              <Tag color={orderConfig.ORDER_STATUS[order?.status]?.color}>
                {orderConfig.ORDER_STATUS[order?.status]?.text}
              </Tag>
            </InfoRow>

            <InfoRow
              icon={<MdOutlinePayments className="order-info__icon" />}
              label="Trạng thái thanh toán"
            >
              <Tag
                color={
                  orderConfig.ORDER_PAYMENT_STATUS[order?.payment_status]?.color
                }
              >
                {orderConfig.ORDER_PAYMENT_STATUS[order?.payment_status]?.text}
              </Tag>
            </InfoRow>

            <Form layout="vertical">
              <Form.Item
                label={
                  <span className="form-label">
                    <CiLocationOn className="order-info__icon" /> Địa chỉ nhận
                  </span>
                }
              >
                <Input
                  readOnly
                  value={`${order?.shipping_address?.street}, ${order?.shipping_address?.ward}, ${order?.shipping_address?.province}`}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="form-label">
                    <CiStickyNote className="order-info__icon" /> Ghi chú
                  </span>
                }
              >
                <TextArea readOnly rows={4} value={order?.note} />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      <Divider />

      {/* FOOTER */}
      <div className="order-footer">
        <div className="total">
          <span>Thành tiền</span>
          <strong>{formatCurrency(order?.total_cost)}đ</strong>
        </div>

        <div className="actions">
          <Tag color={orderConfig.ORDER_STATUS[order?.status]?.color}>
            {orderConfig.ORDER_STATUS[order?.status]?.text}
          </Tag>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetail;
