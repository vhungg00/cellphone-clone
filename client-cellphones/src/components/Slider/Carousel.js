import React, { useState, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";
import slides from "~/assets/slide";

const cx = classNames.bind(styles);

function Carousel() {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  }
  const handleMouseLeave = () => {
    setIsHovering(false);
  }
  const ref = useRef();
  const next = () => {
    ref.current.slickNext();
  };
  const previous = () => {
    ref.current.slickPrev();

  };
  const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
  };



  return (
          <div className={cx("slider", "slider__inner")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Slider {...settings} ref={ref}>
              {slides.map(slide => 
                (<div className={cx("slider-item")} key={slide.id}>
                  <a className={cx('item-link')} href=""></a>
                  <img src={slide.image} alt="" />
                </div>)
              )}
            </Slider>
            <div className={cx('carousel-nav')}
            style={{visibility: isHovering ? 'visible' : 'hidden'}}
            
            >
              <button className={cx('carousel-prev')} onClick={previous}>
              <LeftOutlined className={cx("arows")} />
              </button>
              <button className={cx('carousel-next')} onClick={next}>
              <RightOutlined className={cx("arows")} />
              </button>
            </div>
          </div>);
}

export default Carousel;
