import { Col } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "~/utils/formatPrice";
import "./ProductItem.scss";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <>
      <Col xl={6} lg={8} md={12} sm={12} xs={24}>
        <div
          className="product__item"
          onClick={() => navigate(`/product/${product?.slug}`)}
        >
          <div className="product__img">
            <img loading="lazy" src={product?.image_url} alt={product?.title} />
          </div>

          <div className="product__content">
            <h3 className="product__name">{product?.title}</h3>

            <div className="product__price">
              {product?.discount > 0 ? (
                <>
                  <p className="product__price--old">
                    {formatCurrency(product?.price)}
                  </p>

                  <p className="product__price--new">
                    {formatCurrency(product?.new_price)}
                  </p>
                </>
              ) : (
                <p className="product__price--new">
                  {formatCurrency(product?.new_price)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductItem;
