import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Tag,
} from "antd";
import { date } from "~/constants/date";
import "./Order.scss";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllAddress } from "~/redux/address/addressSlice";

const Order = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listAddress = useSelector((state) => state.address.listAddress);

  const hanldeSubmit = (values) => {
    console.log(values);
  };

  const handleAddressChange = (e) => {
    const address = listAddress.find((item) => item.id === e.target.value);

    if (address) {
      form.setFieldsValue({
        shipping_address: {
          id: address.id,
          full_name: address.full_name,
          phone: address.phone,
          street: address.street,
          ward: address.ward?.name,
          province: address.province?.name,
        },
      });
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
              }}
            >
              <Row gutter={[20, 20]}>
                {/* Order Left */}
                <Col lg={12} md={24} sm={24}>
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
                    <Form.Item name="description">
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
                    <Divider />

                    <Form.Item
                      name={["shipping_address", "id"]}
                      rules={[
                        { required: true, message: "Vui lòng chọn địa chỉ" },
                      ]}
                    >
                      <Radio.Group className="address__radio-group">
                        {listAddress.map((item) => (
                          <Radio key={item.id} value={item.id}>
                            <div className="address__item">
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

                              {item?.is_default && (
                                <Tag variant="outlined" color="volcano">
                                  Mặc định
                                </Tag>
                              )}
                            </div>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name={["shipping_address", "id"]}
                      rules={[
                        { required: true, message: "Vui lòng chọn địa chỉ" },
                      ]}
                    >
                      <Radio.Group className="address__radio-group">
                        <Radio key={1} value={1}>
                          <div className="address__item">
                            <Flex justify="space-between" align="center">
                              <div className="address__user">
                                <span className="address__user--name">
                                  Nguyễn Bảo Long
                                </span>

                                <div className="split"></div>

                                <span className="address__user--phone">
                                  0796510027
                                </span>
                              </div>
                            </Flex>

                            <Flex justify="space-between" align="center">
                              <div className="address__info">
                                <p>
                                  44 Nguyễn Bỉnh Khiêm <br />
                                  Phường Phú Xuân, Thành phố Huế
                                </p>
                              </div>
                            </Flex>
                            <Tag variant="outlined" color="volcano">
                              Mặc định
                            </Tag>
                          </div>
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Col>

                {/* Order Right */}
                <Col lg={12} md={24} sm={24}></Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
