import { Button, Col, InputNumber, Rate, Row, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FoodLoading from "~/components/Loading/FoodLoading";
import productService from "~/services/productService";
import { formatCurrency } from "~/utils/formatPrice";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BiShieldQuarter } from "react-icons/bi";
import "./ProductDetail.scss";
import { fetchAddCardItem } from "~/redux/cart/cartSlice";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState();
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleAddCart = () => {
    const payload = {
      cart_id: cart?.id,
      product_id: product?.id,
      quantity: quantity,
    };
    dispatch(fetchAddCardItem(payload));
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await productService.getDetail(slug);

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

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

  if (loading) return <FoodLoading />;

  return (
    <>
      <div className="product-detail">
        <div className="container">
          <div className="product-detail__inner">
            <div className="product-detail__content">
              <div className="product-detail__info">
                {/* Left */}
                <div className="product-detail__img">
                  <img src={product?.image_url} alt={product?.title} />
                </div>

                {/* Right */}
                <div className="product-detail--right">
                  <h3 className="product-detail__title">{product?.title}</h3>
                  <div className="product-detail__price">
                    <span className="product-detail__price--new">
                      {formatCurrency(product?.new_price)}
                    </span>

                    {product?.discount > 0 && (
                      <>
                        <span className="product-detail__price--old">
                          {formatCurrency(product?.price)}
                        </span>
                        <span className="product-detail__price--discount">
                          {product?.discount}%
                        </span>
                      </>
                    )}
                  </div>

                  <Divider />

                  {/* Thông tin vận chuyển */}
                  <div className="product-detail__shipping">
                    <div className="product-detail__feature">
                      <MdOutlineDeliveryDining className="feature-icon" />
                      <div>
                        <div className="feature-title">Giao hàng nhanh</div>
                        <div className="feature-desc">
                          Giao trong vòng 30-45 phút
                        </div>
                      </div>
                    </div>

                    <div className="product-detail__feature">
                      <BiShieldQuarter className="feature-icon" />
                      <div>
                        <div className="feature-title">Đảm bảo chất lượng</div>
                        <div className="feature-desc">
                          Hoàn tiền 100% nếu không hài lòng
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="product-detail__quantity">
                    <Button
                      onClick={() => hanldeUpdateQuantity(null, "increase")}
                    >
                      +
                    </Button>
                    <InputNumber
                      controls={false}
                      value={quantity}
                      onChange={(value) =>
                        hanldeUpdateQuantity(value, "change")
                      }
                    />
                    <Button
                      onClick={() => hanldeUpdateQuantity(null, "decrease")}
                    >
                      -
                    </Button>
                  </div>

                  <div className="product-detail__order">
                    <Button
                      className="product-detail__cart"
                      onClick={handleAddCart}
                    >
                      <BsCartPlus /> Thêm vào giỏ hàng
                    </Button>

                    <Button className="product-detail__payment" type="primary">
                      Mua ngay
                    </Button>
                  </div>
                </div>
              </div>
              {/* Mô tả sản phẩm */}
              <div className="product-detail__description">
                <h3 className="section-title">Mô tả món ăn</h3>
                <div className="section-content">
                  <div
                    className="tinymce-wrapper"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
