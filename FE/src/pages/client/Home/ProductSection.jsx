import { Col, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const ProductSection = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="product">
        <div className="container">
          <div className="product__inner">
            <h2 className="product__title">Món mới</h2>

            <div className="product__list">
              <Row gutter={[20, 20]}>
                <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                  <div className="product__item"></div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
