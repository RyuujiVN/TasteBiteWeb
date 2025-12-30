import { Button, Divider, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import useDebounce from "~/hooks/useDebounce";
import productService from "~/services/productService";
import { formatCurrency } from "~/utils/formatPrice";
import Loading from "~/components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [products, setProducts] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isFirstRun = useRef(true);
  const inputRef = useRef();

  const debounce = useDebounce(keyword, 500);

  const handleSearch = () => {
    navigate(`/search?search=${keyword}`);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const fetchProductFilter = async () => {
      setLoading(true);
      try {
        const res = await productService.filter({
          search: debounce.trim(),
        });

        setProducts(res.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (debounce) fetchProductFilter();
  }, [debounce]);

  return (
    <>
      <div className="search">
        <Form className="search__form" onFinish={handleSearch}>
          <Form.Item name="search">
            <Input
              autoComplete="off"
              placeholder="Tìm kiếm món ăn..."
              prefix={<CiSearch />}
              onChange={(e) => setKeyword(e.target.value)}
              // onBlur={() => setShowResult(false)}
              onFocus={() => setShowResult(true)}
              ref={inputRef}
            />
          </Form.Item>

          {showResult && keyword && (
            <div className="search__list">
              {loading ? (
                <div className="search__loading">
                  <div className="search__loading-text">
                    <Loading />
                    Đang tải...
                  </div>
                </div>
              ) : products?.length > 0 ? (
                <>
                  {products.map((item) => (
                    <div className="search__item" key={item?.id}>
                      <div className="search__img">
                        <img src={item?.image_url} alt={item?.title} />
                      </div>

                      <div className="search__info">
                        <h3 className="search__info--title">{item?.title}</h3>
                        <div className="search__price">
                          <span className="search__price--new">
                            {formatCurrency(item?.new_price)}
                          </span>

                          {item?.discount > 0 && (
                            <span className="search__price--old">
                              {formatCurrency(item?.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="search__link">
                    <Button
                      type="link"
                      onClick={handleSearch}
                      className="search__button"
                    >
                      Xem tất cả sản phẩm
                    </Button>
                  </div>
                </>
              ) : (
                <div className="search__no-product">
                  Không có sản phẩm nào...
                </div>
              )}
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default Search;
