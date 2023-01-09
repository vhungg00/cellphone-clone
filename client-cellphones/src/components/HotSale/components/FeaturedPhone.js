import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import { formatPrice, handlePercentDiscount } from "~/untils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getProductByCategory } from "~/appRedux/actions/cateAction";
import Rating from "~/components/Rating";
const SLUG_CATEGORY = 'dien-thoai';
function FeaturedPhone() {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
        await dispatch(getProductByCategory(SLUG_CATEGORY));
    }
    fetchApi()
  },[dispatch])

  const temps = useSelector(state => state.cate.cate)
  const products = handlePercentDiscount(temps)
  console.log('products: ', products);
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: (
      <SlickButtonFix>
        <RightOutlined />
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <LeftOutlined />
      </SlickButtonFix>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="best__phone pt-15">
      <div className="container">
        <div className="title-section">
          <h2>ĐIỆN THOẠI NỔI BẬT</h2>
        </div>
        <div className="row">
          <div className="best__sell-box">
            <div className="col-xl-12">
              <div className="product__slider">
                <Slider {...settings}>
                  {products &&
                    products.length > 0 &&
                    products.map((product) => (
                      <div
                        className="product__item product__item-2 white-bg"
                        key={product._id}
                      >
                        <div className="product__item-link">
                          <div className="product__thumb p-relative">
                            <NavLink
                              to={`/product-detail/${product.slug}`}
                              className="product__thumb-img w-img"
                            >
                              <img src={product.image} alt="product" />
                            </NavLink>
                          </div>
                          <div className="product__content text-center">
                            <h6 className="product-name">
                              <Link
                                to={`/product-detail/${product.slug}`}
                                className="product-item-link"
                              >
                                {product.name}
                              </Link>
                            </h6>
                            <Rating value={product.rating} text={`${product.numReviews || 0} Đánh giá`}/>
                            <div className="price">
                              <span>{formatPrice(product.salePrice)}đ</span>
                              <span>{formatPrice(product.price)}đ</span>
                            </div>
                            <div className="product__content-percent">
                              <p className="product__content-percent-detail">
                                Giảm {product.percentDiscount}%
                              </p>
                            </div>
                            <div className="promotion">
                              <p className="gift-cont">
                                Giảm 10% loa Soundbar khi mua kèm TV
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPhone;
