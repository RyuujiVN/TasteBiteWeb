import { Button, Flex, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddAddress from "./AddAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChangeDefaultAddress,
  fetchGetAllAddress,
} from "~/redux/address/addressSlice";

const AccountAddress = () => {
  const [addAddress, setAddAddress] = useState();
  const [loading, setLoading] = useState(false);
  const listAddress = useSelector((state) => state.address.listAddress);
  const dispatch = useDispatch();

  const hanldeChangeDefault = (id) => {
    setLoading(true);
    dispatch(fetchChangeDefaultAddress(id));
    setLoading(false);
  };

  console.log(listAddress);

  useEffect(() => {
    dispatch(fetchGetAllAddress());
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
                      <Button type="link" size="middle">
                        Cập nhật
                      </Button>
                      {!item?.is_default && (
                        <Button type="link" size="middle">
                          Xoá
                        </Button>
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
        </div>
      </div>

      {addAddress && (
        <AddAddress addAddress={addAddress} setAddAddress={setAddAddress} />
      )}
    </>
  );
};

export default AccountAddress;
