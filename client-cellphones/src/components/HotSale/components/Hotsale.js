import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import Rating from "~/components/Rating";
import { formatPrice } from "~/untils";
function Hotsale({ products}) {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
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
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
  return (
    <Slider {...settings}>
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div className="product__item product__item-2 white-bg" key={product._id}>
              <div className="product__item-link">
                <div className="product__thumb p-relative">
                  <NavLink to={`/product-detail/${product.slug}`} className="product__thumb-img w-img">
                    <img
                      src={product.image}
                      alt="product"
                    />
                  </NavLink>
                </div>
                <div className="product__content text-center">
                  <h6 className="product-name">
                    <Link to={`/product-detail/${product.slug}`} className="product-item-link" >
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
  );
}

export default Hotsale;
