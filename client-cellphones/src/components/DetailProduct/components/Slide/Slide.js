import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/thumbs/thumbs.min.css";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import Image from "~/components/Image";

function Slide({ image, images, brands }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigation = {
    navigation: {
      nextEl: ".review-swiper-button-next",
      prevEl: ".review-swiper-button-prev",
    },
  };
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={navigation}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <div className="box-ksb">
            <p className="title desktop">Tính năng nổi bật</p>
            <Image src={image} alt={brands} />
            <div className="desktop">
              <ul>
                <li>
                  {" "}
                  Màu sắc rực rỡ, hiển thị chân thực - Màn hình 6.5 inches,
                  Super AMOLED
                </li>
                <li>
                  {" "}
                  Trọng lượng nhẹ, kháng bụi kháng nước tốt - Nhẹ chỉ 190g,
                  kháng nước, bụi IP67
                </li>
                <li>
                  {" "}
                  Ảnh chụp có chi tiết cao, nhiều tính năng mới mẻ - Cụm 4
                  camera 64MP, đa dạng chế độ chụp
                </li>
                <li> Trải nghiệm mượt mà trên mọi tác vụ</li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
        {images &&
          images.map((item, index) => (
            <SwiperSlide key={index}>
              <Image src={item?.url} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={image} alt={brands} />
        </SwiperSlide>
        {images &&
          images.map((item, index) => (
            <SwiperSlide key={index}>
              <Image src={item?.url} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default Slide;
