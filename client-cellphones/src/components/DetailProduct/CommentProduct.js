import React, { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { commentPrD } from "~/appRedux/actions/productAction";

import AllComment from "./AllComment";
import { IconPaperPlane } from "../Icons";
import { getPrdDetailBySlug } from "~/appRedux/actions/productAction";
import Message from "../LoadingError/Error";
import config from "~/config";

import className from "classnames/bind";
import styles from "./Comment.module.scss";
const cn = className.bind(styles);

function CommentProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueComment, setValueComment] = useState("");
  const { data: user } = useSelector((state) => state.auth.user);
  // const allComment = useSelector(state => state.getProductById.product.comments)

  const handleComment = () => {
    if (user) {
      const comment = {
        author: user.name,
        isAdmin: user.isAdmin,
        content: valueComment,
        byUser: user._id,
      };
      dispatch(commentPrD(slug, comment));
      setValueComment("");
    } else message.info("Bạn vui lòng đăng nhập để thực hiện tác vụ này");
  };
  useEffect(() => {
    dispatch(getPrdDetailBySlug(slug));
  }, [dispatch, slug]);

  const handleRedirect = useCallback(() => {
    navigate(`${config.routes.login}?redirect=product-detail/${slug}`);
  }, [slug, navigate]);

  return (
    <div className={cn("Wrapper", "mt-2")}>
      <p className={cn("Title", "mb-2")}>Hỏi và đáp</p>
      <div className={cn("comment-area", "w-100")}>
        <textarea
          className={cn("textarea")}
          placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời trong 1h từ 8h - 22h mỗi ngày."
          value={valueComment}
          onChange={(e) => setValueComment(e.target.value)}
        ></textarea>
        <button onClick={() => handleComment()}>
          <span className={cn("icon-paper-plane")}>
            <IconPaperPlane />
          </span>
          <span>Gửi</span>
        </button>
      </div>
      {!user ? (
        <div className={cn("Navigate-login")}>
          <Message variant={"alert-warning mt-4"}>
            Vui lòng{" "}
            <a
              href="#/"
              className={cn("login-link")}
              onClick={handleRedirect}
            >
              " <strong>Đăng nhập</strong> "
            </a>{" "}
            để viết bình luận{" "}
          </Message>
        </div>
      ) : null}
      <AllComment />
    </div>
  );
}

export default CommentProduct;
