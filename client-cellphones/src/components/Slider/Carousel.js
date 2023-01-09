import React, { useState, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Carousel({ sliderList }) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
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
    <div
      className={cx("slider", "slider__inner")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Slider {...settings} ref={ref}>
        {sliderList.map((slide) => (
          <div className={cx("slider-item")} key={slide.id}>
            <a href="/" className={cx("item-link")}>
              {""}
            </a>
            <img src={slide.img} alt={slide.name} />
          </div>
        ))}
      </Slider>
      <div
        className={cx("carousel-nav")}
        style={{ visibility: isHovering ? "visible" : "hidden" }}
      >
        <button className={cx("carousel-prev")} onClick={previous}>
          <LeftOutlined className={cx("arows")} />
        </button>
        <button className={cx("carousel-next")} onClick={next}>
          <RightOutlined className={cx("arows")} />
        </button>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  sliderList: PropTypes.array.isRequired
};

export default Carousel;
