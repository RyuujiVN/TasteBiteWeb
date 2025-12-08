import { Button, Flex } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddAddress from "./AddAddress";

const AccountAddress = () => {
  const [addAddress, setAddAddress] = useState();

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
      </div>

      {addAddress && (
        <AddAddress addAddress={addAddress} setAddAddress={setAddAddress} />
      )}
    </>
  );
};

export default AccountAddress;
