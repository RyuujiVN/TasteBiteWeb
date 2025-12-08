import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AccountAddress.scss";
import {
  fetchAddAddress,
  fetchGetProvince,
  fetchGetWard,
  resetWard,
} from "~/redux/address/addressSlice";
import { toast } from "react-toastify";

const AddAddress = ({ addAddress, setAddAddress }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const provinces = useSelector((state) => state.address.listProvince);
  const wards = useSelector((state) => state.address.listWard);

  const hanldeSubmit = async (values) => {
    setLoading(true);
    values.user_id = await toast.promise(dispatch(fetchAddAddress(values)), {
      pending: "Đang thêm...",
    });
    setLoading(false);
  };

  const handleChangeProvince = (id) => {
    if (id) dispatch(fetchGetWard(id));
    else {
      dispatch(resetWard());
      form.setFieldsValue({
        ward: null,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchGetProvince());
  }, []);

  return (
    <div className="address__add">
      <Modal
        className="modal"
        open={addAddress}
        onCancel={() => setAddAddress(false)}
        okText="Thêm"
        cancelText="Hủy"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <div className="modal__header">
          <h2 className="modal__header--title">Thêm Địa chỉ</h2>
        </div>

        <div className="modal__body">
          <Form form={form} layout="vertical" onFinish={hanldeSubmit}>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ và tên"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "Họ và tên không được để trống",
                    },

                    {
                      pattern: /^\D+$/,
                      message: "Họ và tên không được chứa số",
                    },
                  ]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống",
                    },

                    {
                      pattern: /^\d{10}$/,
                      message: "Số điện thoại chỉ chứa 10 chữ số",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item label="Tỉnh/Thành phố" name="province">
                  <Select
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={provinces.map((item) => ({
                      value: item?.code,
                      label: item?.name,
                    }))}
                    placeholder="Tỉnh/Thành phố"
                    onChange={handleChangeProvince}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item label="Phường/Xã" name="ward">
                  <Select
                    allowClear
                    showSearch
                    disabled={wards.length === 0}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={wards.map((item) => ({
                      value: item?.code,
                      label: item?.name,
                    }))}
                    placeholder="Phường/Xã"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24}>
                <Form.Item
                  label="Địa chỉ cụ thể"
                  name="street"
                  rules={[
                    {
                      min: 10,
                      message: "Địa chỉ phải lớn hơn 10 kí tự",
                    },
                  ]}
                >
                  <Input placeholder="Số nhà" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddAddress;
