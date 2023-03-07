import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import { Menu, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import config from '~/config';
import images from "~/assets/images";
import Quantity from '../Quantity';

import Loading from '~/components/Loading';
import DropdownC from '~/components/DropdownC';
import Search from "~/layouts/components/Search"

import { getFirstCharacterUser } from '~/untils';
import { LogOutUser } from '~/appRedux/actions/userAction';
import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";

import 'tippy.js/dist/tippy.css';
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Header() {
  const isLogin = useSelector(state => state.auth.isLogin);
  let isLoading = useSelector(state => state.auth.isLoading);

  const user = JSON.parse(localStorage.getItem('AUTH_INFO'));
  const userName = user?.name ? user?.name : [];
  const isAdmin = user?.isAdmin;

  const sendDataToGTM = useGTMDispatch();
  const handleClick = () => {
    sendDataToGTM({
      event: "tst_click",
      category: "Button"
    });
  };
  const dispatch = useDispatch()
  const handleLogOutClick = async () => {
    await dispatch(LogOutUser())
    if(isLogin) {
      message.success('Đăng xuất thành công!')
    } else {
      console.log('Đăng xuất thất bại')
    }
  }
  const items = [
    {
      label: isAdmin && <Link to={config.routesAdmin.home}>Admin</Link>,
      key: "0",
    },
    {
      label: <Link to={config.routes.profile}>Hồ sơ</Link>,
      key: "1",
    },
    {
      label: (
        <a href="#/"
          className="ant-dropdown-menu-title-content-item"
          onClick={handleLogOutClick}
        >
          {" "}
          <LogoutOutlined /> <p>Đăng xuất</p>
        </a>
      ),
      key: "2",
    },
  ];
  const temps = isAdmin ? items : items.slice(1);
  const menu = <Menu items={temps} />;
  console.log("render")
  return (
    <header className="yellow-header">
      {isLoading && <Loading />}
      <div className={cx('header__area')}>
        <div className="header__top d-none d-sm-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-5 d-none d-md-block">
                <div className="header__welcome">
                  <span></span>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-7">
                <div className="header__action d-flex justify-content-center justify-content-md-end">
                  <ul>
                    <li>
                      <a onClick={() => handleClick()} href="true">SP Yêu thích</a>
                    </li>
                    <li>
                      {isLogin ? (<DropdownC menu={menu} placement="bottomRight">
                        <span className={cx('custom_name')}>
                          {getFirstCharacterUser(userName)} 
                        </span> 
                      </DropdownC>) : 
                      (<Link to={config.routes.login}>Đăng nhập</Link>)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__info">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-4 d-none d-md-block col-lg-3">
                <div className="header__info-left d-flex justify-content-center justify-content-sm-between align-items-center">
                  <div className={cx('logo-link')}>
                    <Link to="/" className={cx('link')} >
                      <img src={images.logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="header__hotline align-items-center d-none d-sm-flex d-lg-none d-xl-flex">
                    <div className="header__hotline-icon">
                      <i className="fal fa-headset" />
                    </div>
                    <button onClick={handleClick}>Click</button>
                    <a href="tel:06-900-6789-00" className="header__hotline-info">
                      <span>Liên hệ</span>
                      <h6>06-900-6789-00</h6>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9">
                <div className="header__info-right d-flex justify-content-between align-items-center">
                  <div className={cx("header__search", "f-left d-none d-sm-block")}>
                   <Search />
                  </div>
                  <div className="cart__mini-wrapper d-none d-md-flex f-right p-relative align-items-center">
                    <Quantity />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
