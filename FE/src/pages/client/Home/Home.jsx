import "./Home.scss";
import HeroSection from "./HeroSection";
import ProductSection from "./ProductSection";

const Home = () => {
  console.log("hi");
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
