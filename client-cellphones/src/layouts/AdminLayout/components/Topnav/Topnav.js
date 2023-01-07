import React from "react";
import classNames from 'classnames/bind';
import styles from './Topnav.module.scss';
import { NotificationOutlined, SettingOutlined } from "@ant-design/icons";
import images from "~/assets/images";
import { Link } from "react-router-dom";
import config from "~/config";
const cx = classNames.bind(styles);
export default function Topbar() {
  return (
    <div className={cx("topbar")}>
      <div className={cx("topbarWrapper")}>
        <div className={cx("topLeft")}>
          <Link to={config.routes.home} className={cx("logo")}>
            <img src={images.logo} alt="logo" />
          </Link>
        </div>
        <div className={cx("topRight")}>
          <div className={cx("topbarIconContainer")}>
            <NotificationOutlined />
            <span className={cx("topIconBadge")}>2</span>
          </div>
          <div className={cx("topbarIconContainer")}>
            <SettingOutlined />
          </div>
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
        </div>
      </div>
    </div>
  );
}
