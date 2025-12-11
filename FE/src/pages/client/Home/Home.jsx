import "./Home.scss";
import HeroSection from "./HeroSection";
import ProductSection from "./ProductSection";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="home__inner">
            <HeroSection />

            <ProductSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
