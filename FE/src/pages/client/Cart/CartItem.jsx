import { Button, InputNumber, Space } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Cart.scss";
import { formatCurrency } from "~/utils/formatPrice";

const Cart = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      {/* IMAGE */}
      <div className="cart-item__image">
        <img src={product?.image_url} alt={product?.title} loading="lazy" />
      </div>

      {/* CONTENT */}
      <div className="cart-item__content">
        <div className="cart-item__top">
          <div className="cart-item__info">
            <h4 className="cart-item__title webkit">{product.title}</h4>
          </div>

          <div className="cart-item__price">
            {/* GIÁ MỚI */}
            <span className="cart-item__price--new">
              {formatCurrency(product?.new_price)}
            </span>

            {/* GIÁ CŨ */}
            {product?.discount > 0 && (
              <span className="cart-item__price--old">
                {formatCurrency(product?.price)}
              </span>
            )}
          </div>
        </div>

        <div className="cart-item__bottom">
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            className="cart-item__remove"
            onClick={() => onRemove(item)}
            type="primary"
          >
            Xóa
          </Button>

          {/* QUANTITY */}
          <Space className="cart-item__quantity">
            <Button
              size="small"
              icon={<MinusOutlined />}
              onClick={() => onDecrease(item)}
              disabled={quantity <= 1}
            />

            <InputNumber
              size="small"
              min={1}
              value={quantity}
              readOnly
              className="cart-item__qty-input"
            />

            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={() => onIncrease(item)}
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Cart;
