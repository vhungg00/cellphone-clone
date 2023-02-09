import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { repCommentProduct } from "~/appRedux/actions/productAction";
import { getFirstCharacterUser } from "~/untils";
import AllRepComment from "./AllRepComment";
import { LockOutlined, PushpinOutlined, WechatOutlined } from "@ant-design/icons";

import className from "classnames/bind";
import styles from "./Comment.module.scss";
const cn = className.bind(styles);

function AllComment() {
  const { slug } = useParams();
  const [temp] = useSelector((state) => state.product.products);
  const {
    comments = []
  } = temp || {};
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.auth.user);

  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const [repValue, setRepValue] = useState("");
  const showRepComment = (id) => {
    setRepCmt({ key: id, status: !repCmt.status });
  };
  const handleRepComment = () => {
    if (user) {
      const comment = {
        idComment: repCmt.key,
        isAdmin: user.isAdmin,
        content: repValue,
        nameUser: user.name,
        byUser: user._id
      };
      console.log('commet', comment);
      dispatch(repCommentProduct(slug, comment));
      setRepValue("");
      setRepCmt({ key: "", status: false });
    } else message.info("Bạn vui lòng đăng nhập để thực hiện tác vụ này");;
  };

  const PinComment = (comment) => {
    // const UpdateComment = { ...comment, status: "pin" };
    // console.log(UpdateComment);

    // dispatch(pinCommentProduct(id, UpdateComment));
  };

  return (
    <div className={cn('AllComment')}>
      { comments.map((comment) => (
        <div key={comment._id}>
          <div className={cn('Item', 'mt-2')}>
            <div className={cn('Info')}>
              <div className={cn('avatar')} style={{ display: "flex" }}>
                {comment?.isAdmin ? (
                  <div className={cn('image')}>
                    <img src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png" alt="hoa"></img>
                  </div>
                ) : (
                  <div className={cn('image', 'user')}>
                    {getFirstCharacterUser(comment.author)}
                  </div>
                )}
                {comment.isAdmin ? (
                  <strong className={cn('adminFlag')}>
                    {comment.author} <span>QTV</span>
                  </strong>
                ) : (
                  <strong>{comment.author}</strong>
                )}
              </div>

              {user?.isAdmin ? (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                    onClick={() => PinComment(comment)}
                  >
                    {
                      comment.status === 'pin' ? (<LockOutlined />) : (<PushpinOutlined />) 
                    }
                  </div>
                </div>
              ) : (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                  >
                    {
                      comment.status === 'pin' ? (<PushpinOutlined></PushpinOutlined>) : ''
                    }
                  </div>
                </div>
              )}
            </div>
            <div className={cn('boxRep')}>
              <div className={cn('content')}>{comment.content}</div>
              <div className={cn('more-replied')}>
                <button
                  className={cn('action-icon')}
                  onClick={() => showRepComment(comment._id)}
                >
                  <WechatOutlined style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
                </button>
              </div>
            </div >
            {comment.replies.length > 0 ? (
              <AllRepComment
                allrepcomment={comment.replies}
                showRepComment={showRepComment}
              ></AllRepComment>
            ) : (
              ""
            )}
          </div>
          {repCmt.status === true && repCmt.key === comment._id ? (
            <div className={cn('boxRepComment', 'mt-4')}>
              <div
                className={cn("comment-area")}
                style={{ display: "flex", alignItems: "center" }}
              >
                <textarea
                  placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời trong 1h từ 8h - 22h mỗi ngày."
                  vaule={repValue}
                  onChange={(e) => setRepValue(e.target.value)}
                ></textarea>
              </div>

              <div className={cn("comment-send")}>
                <button onClick={() => handleRepComment()}>Trả lời</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default AllComment;
