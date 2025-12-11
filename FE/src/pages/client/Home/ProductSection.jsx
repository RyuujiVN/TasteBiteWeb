import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGetListProductClient } from "~/redux/product/productSlice";
import { formatCurrency } from "~/utils/formatPrice";
import { IoIosArrowForward } from "react-icons/io";

const ProductSection = () => {
  const products = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetListProductClient({ limit: 10 }));
  }, [dispatch]);

  console.log(products);
  return (
    <>
      <section className="product">
        <div className="container">
          <div className="product__inner">
            <h2 className="product__title">Khám phá thực đơn của chúng tôi</h2>

            <div className="product__list">
              <Row gutter={[20, 20]}>
                {products.length > 0 &&
                  products.map((item) => (
                    <Col xl={6} lg={8} md={12} sm={12} xs={24} key={item?.id}>
                      <div className="product__item">
                        <div className="product__img">
                          <img src={item?.image_url} alt={item?.title} />
                        </div>

                        <div className="product__content">
                          <h3 className="product__name">{item?.title}</h3>

                          <div className="product__price">
                            {item?.discount > 0 ? (
                              <>
                                <p className="product__price--old">
                                  {formatCurrency(item?.price)}
                                </p>

                                <p className="product__price--new">
                                  {formatCurrency(item?.new_price)}
                                </p>
                              </>
                            ) : (
                              <p className="product__price--new">
                                {formatCurrency(item?.new_price)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>

            <div className="product__link">
              <Link>
                <IoIosArrowForward />
                Xem danh sách món
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSection;
