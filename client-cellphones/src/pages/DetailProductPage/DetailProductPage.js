import { useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { formatPrice } from "~/untils";
import Loading from "~/components/Loading";
import Breadcrumb from "~/components/Breadcrumb";

import Slide from "~/components/DetailProduct/components/Slide";
import {
  getPrdDetailBySlug,
  createProductReview,
} from "~/appRedux/actions/productAction";
import { addCart } from "~/appRedux/actions/cartAction";
import { message, Rate } from "antd";
import config from "~/config";
import Rating from "~/components/Rating";

import classNames from "classnames/bind";
import styles from "./Product_detail.module.scss";
import Message from "~/components/LoadingError/Error";
import { useState } from "react";
import { prdCreateReviewReset } from "~/appRedux/reducerSlice/productSlice";
import moment from "moment";
import AppChat from "~/components/AppChat";
import Title from "~/components/Title";

const cx = classNames.bind(styles);
const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

function DetailProductPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [temp] = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.isLoading);
  const { data: user } = useSelector((state) => state.auth.user);
  const productReviewCreate = useSelector((state) => state.product);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;
  const {
    _id = 1,
    name = "",
    price = 0,
    salePrice = 0,
    numReviews= 1,
    rating: ratingCall = 1,
    category = {},
    reviews = [],
    type = "",
    status = "",
    descriptions = "",
  } = temp || {};
  const { name: nameCate = "" } = category || {};
  useEffect(() => {
    const fetchApi = async () => {
      const res = await dispatch(getPrdDetailBySlug(slug));
      return res;
    };
    if (successCreateReview) {
      alert("Đã gửi bài đánh giá");
      setRating(0);
      setComment("");
      fetchApi()
      dispatch(prdCreateReviewReset());
    } else if( errorCreateReview ){
      dispatch(prdCreateReviewReset());
    }
    fetchApi();
  }, [dispatch, slug, successCreateReview]);

  const handleAddCart = async (payload) => {
    await dispatch(addCart(payload));
    message.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  const navigateToCart = async (payload) => {
    await dispatch(addCart(payload));
    navigate(`/cart/${slug}}`);
  };
  const handleRedirect = useCallback(() => {
    navigate(`${config.routes.login}?redirect=product-detail/${slug}`);
  }, [slug]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const value = { rating, comment };
    await dispatch(createProductReview(_id, value));
  };
  return (
    <main>
      <Breadcrumb slugCate={nameCate} brands={type} name={name} />
      {loading && <Loading />}
      <Title title={name || 'CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng'}  />
      <section className="product__area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-xxl-5 col-xl-5 col-lg-5">
              <div className="product__details-nav flex-column d-sm-flex align-items-start">
                <Slide
                  image={temp?.image}
                  images={temp?.images}
                  brands={type}
                />
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="product__details-wrapper">
                <div className="product__details">
                  <h3 className="product__details-title">{name}</h3>
                  <div className="product__price">
                    <span className="new">{formatPrice(salePrice)} đ</span>
                    <span className="old">{formatPrice(price)} đ</span>
                  </div>
                  <div className="product__stock">
                    <span>Tình trạng :</span>
                    <span>{status}</span>
                  </div>
                  <Rating
                        value={ratingCall}
                        text={`${numReviews} Đánh giá`}
                      />
                  <div className="product__details-des mb-30">
                    <p>{descriptions}</p>
                  </div>
                  <div className="product__details-quantity mb-20">
                    <div className="pro-quan-area d-lg-flex align-items-center">
                      <div className="product-quantity">
                        <div
                          className="cart-plus-minus p-relative"
                          onClick={() => navigateToCart(temp)}
                        >
                          <p>Mua ngay</p>
                          <span>(Giao hàng tận nơi hoặc lấy tại cưa hàng)</span>
                        </div>
                      </div>
                      <div className="pro-cart-btn ml-25">
                        <button
                          className="t-y-btn"
                          type="button"
                          onClick={() => handleAddCart(temp)}
                        >
                          <i className="fas fa-cart-plus"></i>
                          <span>Thêm vào giỏ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product__details-action">
                    <ul>
                      <li>
                        <a href="#" title="Add to Wishlist">
                          <i className="fal fa-heart" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Compare">
                          <i className="far fa-sliders-h" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Print">
                          <i className="fal fa-print" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Print">
                          <i className="fal fa-share-alt" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-12">
              <div className={cx("boxReview")}>
                <div className={cx("ReviewWrapper")}>
                  <h6>Viết đánh giá của khách hàng</h6>
                  <div className="my-4">
                    {loadingCreateReview && <Loading />}
                    {errorCreateReview && (
                      <Message variant="alert-danger">
                        {errorCreateReview}
                      </Message>
                    )}
                  </div>
                  {user ? (
                    <form onSubmit={submitHandler}>
                      <div className="my-4">
                        <strong>Xếp hạng: </strong>
                        <span className="d-flex align-items-center">
                          <Rate
                            disabled={errorCreateReview}
                            tooltips={desc}
                            onChange={setRating}
                            value={rating}
                          />
                          {rating ? (
                            <span className="ant-rate-text">
                              {desc[rating - 1]}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                      <div className="my-4">
                        <strong>Chia sẻ cảm nhận về sản phẩm</strong>
                        <textarea
                          disabled={errorCreateReview}
                          row="3"
                          maxLength={500}
                          placeholder="Chia sẻ cảm nhận về sản phẩm"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        ></textarea>
                      </div>
                      <div className="my-3">
                        <button
                          disabled={errorCreateReview}
                          className="col-12 bg-black border-0 p-3 rounded text-white"
                        >
                          Hoàn thành
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="my-3">
                      <Message variant={"alert-warning"}>
                        Vui lòng{" "}
                        <p
                          className={cx("login-link")}
                          onClick={handleRedirect}
                        >
                          " <strong>Đăng nhập</strong> "
                        </p>{" "}
                        để viết bình luận{" "}
                      </Message>
                    </div>
                  )}
                </div>
                <h6 className={cx("title", "mb-3")}>
                  Đánh giá & nhận xét {name}
                </h6>
                {reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>
                    Chưa có đánh giá cho sản phẩm này
                  </Message>
                )}
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <div className="d-flex justify-content-between">
                      <strong>{review.name}</strong>
                      <span>{moment(review.createdAt).calendar()}</span>
                    </div>
                    <div className="alert alert-info mt-3 flex-column">
                      <Rate allowHalf value={review.rating} />
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {user ? <AppChat /> : null}
    </main>
  );
}

export default DetailProductPage;
