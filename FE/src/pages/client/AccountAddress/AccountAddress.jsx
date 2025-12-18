import { Button, Flex, Popconfirm, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddAddress from "./AddAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  fectchDeleteAddress,
  fetchChangeDefaultAddress,
  fetchGetAllAddress,
} from "~/redux/address/addressSlice";
import UpdateAddress from "./UpdateAddress";
import { toast } from "react-toastify";

const AccountAddress = () => {
  const [addAddress, setAddAddress] = useState();
  const [updateAddress, setUpdateAddress] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const listAddress = useSelector((state) => state.address.listAddress);
  const dispatch = useDispatch();

  const hanldeChangeDefault = async (id) => {
    setLoading(true);
    await dispatch(fetchChangeDefaultAddress(id));
    setLoading(false);
  };

  const handleSetModal = (address) => {
    setAddress(address);
    setUpdateAddress(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await toast.promise(dispatch(fectchDeleteAddress(id)), {
      pending: "Đang xoá...",
    });

    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchGetAllAddress());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="address">
        <Flex justify="space-between" align="center" className="address__head">
          <h3 className="address__head--title">Địa chỉ của tôi</h3>

          <Button
            type="primary"
            size="large"
            onClick={() => setAddAddress(true)}
          >
            <FaPlus />
            Thêm địa chỉ mới
          </Button>
        </Flex>

        <div className="address__body">
          <Spin spinning={loading}>
            <div className="address__list">
              {listAddress.length > 0 &&
                listAddress.map((item) => (
                  <div className="address__item" key={item.id}>
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

                      <div className="address__user--button">
                        <Button
                          type="link"
                          size="middle"
                          onClick={() => handleSetModal(item)}
                        >
                          Cập nhật
                        </Button>

                        {!item?.is_default && (
                          <Popconfirm
                            title="Xoá địa chỉ"
                            description="Bạn có chắc muốn xoá địa chỉ này"
                            onConfirm={() => handleDelete(item?.id)}
                            okText="Xoá"
                            cancelText="Huỷ"
                            okButtonProps={{ loading: loading }}
                          >
                            <Button type="link" size="middle">
                              Xoá
                            </Button>
                          </Popconfirm>
                        )}
                      </div>
                    </Flex>

                    <Flex justify="space-between" align="center">
                      <div className="address__info">
                        <p>
                          {item?.street} <br />
                          {item?.ward?.name}, {item?.province?.name}
                        </p>
                      </div>

                      <Button
                        disabled={item?.is_default}
                        variant="outlined"
                        size="middle"
                        onClick={() => hanldeChangeDefault(item?.id)}
                        loading={loading}
                      >
                        Thiết lập mặc định
                      </Button>
                    </Flex>

                    {item?.is_default && (
                      <Tag variant="outlined" color="volcano">
                        Mặc định
                      </Tag>
                    )}
                  </div>
                ))}
            </div>
          </Spin>
        </div>
      </div>

      {addAddress && (
        <AddAddress
          addAddress={addAddress}
          setAddAddress={setAddAddress}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {updateAddress && (
        <UpdateAddress
          updateAddress={updateAddress}
          setUpdateAddress={setUpdateAddress}
          address={address}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </>
  );
};

export default AccountAddress;
