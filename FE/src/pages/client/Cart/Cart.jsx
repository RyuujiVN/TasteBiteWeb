import { Drawer, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartItem from "./CartItem";
import "./Cart.scss";
import { useSelector } from "react-redux";
import { formatCurrency } from "~/utils/formatPrice";
import { useNavigate } from "react-router-dom";

const Cart = ({ open, onClose }) => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const totalCost = cart?.cart_item?.reduce((total, item) => {
    const sum = total + item?.product?.new_price * item.quantity;
    return sum;
  }, 0);

  const hanldeOrder = () => {
    onClose();
    navigate("/order");
  };

  return (
    <Drawer
      title={
        <div className="cart-drawer__header">
          <span>Giỏ hàng</span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      footer={
        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>Tổng tiền:</span>
            <strong>{formatCurrency(totalCost)}đ</strong>
          </div>

          <div className="cart-drawer__actions">
            <Button
              block
              size="large"
              className="cart-drawer__checkout"
              type="primary"
              onClick={hanldeOrder}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      }
    >
      <div className="cart-drawer__content">
        {cart?.cart_item?.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingCartOutlined />
            <p>Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          cart?.cart_item?.map((item) => (
            <CartItem key={item?.id} item={item} />
          ))
        )}
      </div>
    </Drawer>
  );
};

export default Cart;
