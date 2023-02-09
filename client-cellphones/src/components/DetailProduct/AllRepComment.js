import React from 'react';
import { WechatOutlined } from '@ant-design/icons';
import { getFirstCharacterUser } from '../../untils';
import className from "classnames/bind";
import styles from "./Comment.module.scss";
const cn = className.bind(styles);
function AllRepComment(props) {
    const {allrepcomment, showRepComment} = props;
    
    return (
      <div className="all-comment-rep-list">
        <div className="arrow-up"></div>
        {allrepcomment.map((repComment) => (
          <div className={cn('Item', 'mt-2')} style={{width: '90%', marginLeft: '10%'}} key={repComment._id}>
            <div className={cn('Info')}>
            <div className={cn('avatar')} style={{ display: "flex" }}>
                {repComment.isAdmin ? (
                  <div className={cn('image')}>
                    <img src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png" alt='hoa'></img>
                  </div>
                ) : (
                  <div className={cn('image', 'user')}>
                    {getFirstCharacterUser(repComment.nameUser)}
                  </div>
                )}
                {
                  repComment.isAdmin ? (<strong>{repComment.nameUser} <span>QTV</span></strong>): (<strong>{repComment.nameUser}</strong>)
                }
            </div >
              
            </div>

            <div className={cn('boxRep')}>
              <div className={cn('content')}>{repComment.content}</div>
              <div className={cn('more-replied')}>
                <button
                  className={cn('action-icon')}
                  onClick={() => showRepComment(repComment._id)}
                >
                  <WechatOutlined style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
                </button>
              </div>
            </div >
          </div>
        ))}
      </div>
    );
}

export default AllRepComment;