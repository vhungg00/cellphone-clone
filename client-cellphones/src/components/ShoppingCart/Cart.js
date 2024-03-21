
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "~/config";

import { LeftOutlined } from "@ant-design/icons";
import { CartEmpty } from "~/components/Icons";
import Item from "./Item";

import classNames from "classnames/bind";
import { formatPrice } from "~/untils";
import styles from "./Shopping.module.scss";
import { useCallback } from "react";
import Title from "../Title";
const cx = classNames.bind(styles);

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.carts);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.salePrice,
    0
  );

  const handleRedirect = useCallback(() => {
    isLogin ? navigate(routes.shipping):
    navigate("/login?redirect=shipping")
  }, [navigate, isLogin])


  return (
    <div className={cx("wrapper")}>
      <Title title="CellphoneS Cart" />
      <div className={cx("header")}>
        <Link to={routes.home} className={cx("back")}>
          <LeftOutlined />
          <p>Trở về</p>
        </Link>
        <h4 className={cx("title")}>Giỏ hàng</h4>
      </div>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map(item => <Item key={item.name} data={item} />) 
      ) : (
        <div className={cx("empty")}>
          {<CartEmpty />}
          <h4>Không có sản phẩm nào trong giỏ hàng , vui lòng quay lại</h4>
        </div>
      )}
      {cartItems && cartItems.length <= 0 ? (
        <div className={cx("empty_link")}>
          <Link to={routes.home}>Quay lại trang chủ</Link>
        </div>
      ) : (
        
        <div className={cx("bottom")}>
          <div className={cx("total_price")}>
            <p>Tổng tiền tạm tính:</p>
            <span>{formatPrice(totalPrice)}đ</span>
          </div>
          <div className={cx("order")}>
            <button 
              onClick={handleRedirect}
            >Tiến hành đặt hàng</button>
          </div>
          <Link to={routes.home} className={cx("link", "mt-2")}>
            Chọn thêm sản phẩm khác{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
