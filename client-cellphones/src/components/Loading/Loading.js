import { Spin } from "antd";
import React from "react";
import classNames from "classnames/bind";
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);
const LoadingConfig = ({ title = "" }) => {
  return (
    <div className={cx("loadingConfig")}>
      <Spin size="large" />

      <div className={cx("text")}>{title}</div>
    </div>
  );
};
export default LoadingConfig;
