import { Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGetListProductClient } from "~/redux/product/productSlice";
import { IoIosArrowForward } from "react-icons/io";
import ProductItem from "~/components/ProductItem/ProductItem";

const ProductSection = () => {
  const products = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetListProductClient({ page: 1, limit: 20 }));
  }, [dispatch]);

  return (
    <>
      <section className="product">
        <div className="container">
          <div className="product__inner">
            <h2 className="product__title">Khám phá thực đơn của chúng tôi</h2>

            <div className="product__list">
              <Row gutter={[20, 20]}>
                {products.length > 0 &&
                  products.map((item) => <ProductItem product={item} />)}
              </Row>
            </div>

            <div className="product__link">
              <Link to="/search">
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
