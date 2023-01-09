import Title from "~/components/Title";
import { subSlides } from "~/assets/slide";
import Bessell from "./components/Bessell";
import Feature from "./components/Features";
import ScrollToTop from "~/components/ScrollToTop";
import Carousel from "~/components/Slider/Carousel";
import Categoryweb from "./components/Category/CategoryWeb";
import Laptop from "~/components/HotSale/components/Laptop";
import FeaturedPhone from "~/components/HotSale/components/FeaturedPhone";
import { getAllSlider } from "~/appRedux/actions/SliderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function Home() {
  const dispatch = useDispatch()
  const sliderList = useSelector(state => state.slider.imageList)
  useEffect(() => {
    dispatch(getAllSlider());
  }, [dispatch]);
  return (
    <>
      <section className="slider__area pt-50">
        <Title title={'CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng'}  />
        <div className="container">
          <div className="row">
            <div className="col-xl-2 custom-col-2 d-none d-xl-block">
              <Categoryweb />
            </div>
            <div className="col-xl-10 custom-col-10 col-lg-12">
              <div className="row">
                <div className="col-xl-9 custom-col-9 col-lg-8">
                  <Carousel sliderList = {sliderList} />
                </div>
                <div className="col-xl-3 custom-col-3 col-lg-4 d-none d-md-block">
                  {subSlides.map((subSlide) => (
                    <div className="banner__area" key={subSlide.id}>
                      <div className="banner__item mb-20 w-img">
                        <a href="product-details.html">
                          <img src={subSlide.image} alt="" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Feature />
      <Bessell />
      <FeaturedPhone/>
      <Laptop/>
      <ScrollToTop/>
    </>
  );
}

export default Home;
