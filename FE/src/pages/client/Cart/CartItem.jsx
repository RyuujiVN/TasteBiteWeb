import { Button, InputNumber, Popconfirm, Space } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Cart.scss";
import { formatCurrency } from "~/utils/formatPrice";
import { useDispatch } from "react-redux";
import {
  fetchRemoveCardItem,
  fetchUpdateCardItem,
} from "~/redux/cart/cartSlice";
import { useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";

const Cart = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const debounce = useDebounce(quantity, 300);
  const dispatch = useDispatch();

  const hanldeUpdateQuantity = (value, type) => {
    switch (type) {
      case "increase":
        if (quantity < 9999) setQuantity(quantity + 1);
        break;
      case "decrease":
        if (quantity > 1) setQuantity(quantity - 1);
        break;
      default: {
        const num = Number(value);

        if (isNaN(num) || num < 1) setQuantity(1);
        else if (num > 999) setQuantity(999);
        else setQuantity(num);
      }
    }
  };

  useEffect(() => {
    if (debounce !== item?.quantity) {
      const payload = {
        cart_id: item?.cart_id,
        product_id: item?.cart_id,
        quantity: quantity,
      };
      dispatch(fetchUpdateCardItem({ id: item?.id, data: payload }));
    }
  }, [debounce, dispatch]);

  const handleRemove = () => {
    dispatch(fetchRemoveCardItem(item?.id));
  };

  return (
    <>
      <div className="cart-item">
        {/* IMAGE */}
        <div className="cart-item__image">
          <img
            src={item?.product?.image_url}
            alt={item?.product?.title}
            loading="lazy"
          />
        </div>

        {/* CONTENT */}
        <div className="cart-item__content">
          <div className="cart-item__top">
            <div className="cart-item__info">
              <h4 className="cart-item__title webkit">
                {item?.product?.title}
              </h4>
            </div>

            <div className="cart-item__price">
              {/* GIÁ MỚI */}
              <span className="cart-item__price--new">
                {formatCurrency(item?.product?.new_price)}
              </span>

              {/* GIÁ CŨ */}
              {item?.product?.discount > 0 && (
                <span className="cart-item__price--old">
                  {formatCurrency(item?.product?.price)}
                </span>
              )}
            </div>
          </div>

          <div className="cart-item__bottom">
            <Popconfirm
              title="Xoá sản phẩm khỏi giỏ hàng"
              description="Bạn có chắc chắc muốn xoá không?"
              onConfirm={handleRemove}
              okText="Có"
              cancelText="Huỷ"
            >
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                className="cart-item__remove"
                type="primary"
              >
                Xóa
              </Button>
            </Popconfirm>

            {/* QUANTITY */}
            <Space className="cart-item__quantity">
              <Button
                size="small"
                icon={<MinusOutlined />}
                onClick={() => hanldeUpdateQuantity(quantity, "decrease")}
                disabled={quantity <= 1}
              />

              <InputNumber
                size="small"
                value={quantity}
                className="cart-item__qty-input"
                onChange={(value) => hanldeUpdateQuantity(value, "change")}
                controls={false}
              />

              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => hanldeUpdateQuantity(quantity, "increase")}
              />
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
