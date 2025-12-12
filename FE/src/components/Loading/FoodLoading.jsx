import FoodLoadingAnimation from "~/assets/images/food-animation3.gif";
import Loading from "./Loading";

const FoodLoading = () => {
  return (
    <>
      <div className="food__loading">
        <div className="food__loading--inner">
          <Loading />
          <div className="food__loading--content">Đang tải...</div>
        </div>
      </div>
    </>
  );
};

export default FoodLoading;
