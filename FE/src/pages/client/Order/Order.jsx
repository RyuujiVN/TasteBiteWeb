import { Button, Col, Divider, Flex, Form, Radio, Row, Select } from "antd";
import { date } from "~/constants/date";
import "./Order.scss";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllAddress } from "~/redux/address/addressSlice";
import { formatCurrency } from "~/utils/formatPrice";
import { toast } from "react-toastify";
import { fetchCreateOrder } from "~/redux/order/orderSlice";

const Order = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listAddress = useSelector((state) => state.address.listAddress);
  const cart = useSelector((state) => state.cart.cart);
  const addressDefaultId = useSelector((state) => state.cart.addressDefaultId);
  const totalCost = cart?.cart_item?.reduce((total, item) => {
    const sum = total + item?.product?.new_price * item.quantity;
    return sum;
  }, 0);

  const hanldeSubmit = async (values) => {
    const address = listAddress.find(
      (item) => item.id === values.shipping_address
    );

    if (!address) {
      toast.error("Vui lòng điền địa chỉ nhận hàng");
      return;
    }

    const line_items = cart?.cart_item?.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item?.quantity,
        price: {
          retail: item?.product?.price,
          sale: item?.product?.new_price,
        },
      };
    });

    const payload = {
      name: address.full_name,
      phone: address.phone,
      shipping_address: {
        street: address.street,
        ward: address.ward?.name,
        province: address.province?.name,
      },
      line_items: line_items,
      payment_method: values.payment_method,
      note: values.note,
      delivery: {
        date: values.delivery_date,
        delivery_time_type: values.delivery_time_type,
        delivery_time_range: values.delivery_time_range,
      },
    };

    try {
      const response = await dispatch(fetchCreateOrder(payload)).unwrap();
      window.location.href = response.payment_url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchGetAllAddress());
  }, [dispatch]);

  return (
    <>
      <div className="order">
        <div className="container">
          <div className="order__inner">
            <Form
              form={form}
              onFinish={hanldeSubmit}
              initialValues={{
                delivery_date: date.today.format("YYYY-MM-DD"),
                delivery_time_type: "NOW",
                shipping_address: addressDefaultId,
              }}
            >
              <Row gutter={[20, 20]}>
                {/* Order Left */}
                <Col lg={14} md={14} sm={24} xs={24}>
                  <div className="order__card">
                    <h3 className="order__title">Thông tin đơn hàng</h3>
                    <Divider />

                    <h4 className="form__label">Ngày giao hàng</h4>
                    <Form.Item name="delivery_date">
                      <Radio.Group className="delivery-date-group w-full">
                        <Radio.Button value={date.today.format("YYYY-MM-DD")}>
                          <div className="delivery-date-item">
                            <div className="label">Hôm nay</div>
                            <div className="date">
                              {date.today.format("DD/MM")}
                            </div>
                          </div>
                        </Radio.Button>

                        <Radio.Button
                          value={date.tomorrow.format("YYYY-MM-DD")}
                        >
                          <div className="delivery-date-item">
                            <div className="label">Ngày mai</div>
                            <div className="date">
                              {date.tomorrow.format("DD/MM")}
                            </div>
                          </div>
                        </Radio.Button>

                        <Radio.Button
                          value={date.dayAfterTomorrow.format("YYYY-MM-DD")}
                        >
                          <div className="delivery-date-item">
                            <div className="label">Ngày mốt</div>
                            <div className="date">
                              {date.dayAfterTomorrow.format("DD/MM")}
                            </div>
                          </div>
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    <h4 className="form__label">Thời gian giao hàng</h4>

                    <Form.Item name="delivery_time_type">
                      <Radio.Group>
                        <Radio value="NOW">Giao ngay khi xong</Radio>
                        <Radio value="SCHEDULE">Giao vào giờ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: 0 }}
                      shouldUpdate={(prev, curr) =>
                        prev.delivery_time_type !== curr.delivery_time_type
                      }
                    >
                      {({ getFieldValue }) => {
                        const isSchedule =
                          getFieldValue("delivery_time_type") === "SCHEDULE";

                        return (
                          <Form.Item
                            name="delivery_time_range"
                            rules={[
                              {
                                required: isSchedule,
                                message: "Vui lòng chọn khung giờ",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Chọn khung giờ"
                              options={date.timeOptions}
                              disabled={!isSchedule}
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>

                    <h4 className="form__label">Ghi chú đơn hàng</h4>
                    <Form.Item name="note" style={{ margin: 0 }}>
                      <TextArea
                        rows={4}
                        style={{ resize: "none" }}
                        placeholder="Nhập ghi chú..."
                      />
                    </Form.Item>
                  </div>

                  <div className="order__card">
                    <Flex align="center" justify="space-between">
                      <h3 className="order__title">Địa chỉ nhận hàng</h3>
                      <Button type="primary">+ Thêm địa chỉ</Button>
                    </Flex>

                    <Form.Item
                      name="shipping_address"
                      initialValue={addressDefaultId}
                    >
                      <Radio.Group className="order__address w-100">
                        {listAddress.map((item) => (
                          <Radio
                            key={item.id}
                            value={item.id}
                            className="w-100"
                          >
                            <div className="order__address--item address">
                              <Flex justify="space-between" align="center">
                                <div className="address__user">
                                  <span className="address__user--name">
                                    {item?.full_name}
                                  </span>

                                  <div className="split"></div>

                                  <span className="address__user--phone">
                                    {item?.phone}
                                  </span>
                                </div>
                              </Flex>

                              <Flex justify="space-between" align="center">
                                <div className="address__info">
                                  <p>
                                    {item?.street} <br />
                                    {item?.ward?.name}, {item?.province?.name}
                                  </p>
                                </div>
                              </Flex>
                            </div>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Col>

                {/* Order Right */}
                <Col lg={10} md={10} sm={24} xs={24}>
                  <div className="order__card order__card--right">
                    <h3 className="order__title">Đơn hàng</h3>
                    <table className="order__products">
                      <tbody className="order__products--item">
                        <tr>
                          <td>Tên món</td>
                          <td>Giá</td>
                        </tr>

                        {cart?.cart_item &&
                          cart?.cart_item?.map((item) => (
                            <tr key={item?.id}>
                              {/* Tên sản phẩm */}
                              <td className="order__products--name">
                                {item?.product?.title} x {item?.quantity}
                              </td>

                              {/* Giá */}
                              <td className="order__products--price">
                                {formatCurrency(item?.product?.new_price)}đ
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <Divider />

                    <Flex
                      justify="space-between"
                      className="order__cost order__cost--total"
                    >
                      <div className="order__cost--title">Tiền hàng</div>
                      <div>{formatCurrency(totalCost)}đ</div>
                    </Flex>

                    <Flex
                      justify="space-between"
                      className="order__cost order__cost--shipping"
                    >
                      <div className="order__cost--title">Phí vận chuyển</div>
                      <div>{formatCurrency(30000)}đ</div>
                    </Flex>

                    <Divider />

                    <h3 className="order__title">Thanh toán</h3>

                    <Form.Item
                      name="payment_method"
                      initialValue="CASH"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn phương thức thanh toán",
                        },
                      ]}
                    >
                      <Radio.Group className="order__payment">
                        <Radio value="CASH">Tiền mặt</Radio>
                        <Radio value="BANK">Chuyển khoản</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Flex
                      justify="space-between"
                      className="order__cost order__cost--final"
                    >
                      <div className="order__cost--title">Tổng tiền</div>
                      <div className="price">
                        {formatCurrency(totalCost + 30000)}đ
                      </div>
                    </Flex>

                    <Form.Item>
                      <Button
                        block
                        size="large"
                        type="primary"
                        htmlType="submit"
                      >
                        Đặt hàng
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
