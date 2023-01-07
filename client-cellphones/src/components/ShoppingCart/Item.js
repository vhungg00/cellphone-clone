import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import {
  DeleteQtyProduct, DeleteToCart
} from "../../actions/CartAction";

import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { formatPrice } from "~/untils";
import { addCart, decrease, deteleCartItem } from "~/appRedux/actions/cartAction";


import classNames from "classnames/bind";
import styles from "./Shopping.module.scss";
const cx = classNames.bind(styles);

function Item({data}) {
  const { _id = 1, name = "", image="", salePrice = 1, qty = 1, price = 1, descriptions = "Chưa có ưu đãi nào dành cho sản phẩm này"} = data || {};
  const handlePercentDiscount = () => {
    const percentDiscount = 100 - Math.round((salePrice * 100) / price)
    return percentDiscount;
  }
  const dispatch = useDispatch();

  function handleDeleteProduct(product) {
    const action = DeleteToCart(product);
    dispatch(action);
  }

  const handleAddProduct = async (data) =>{
    await dispatch(addCart(data));
  }

  const handleDecease =  async (data) => {
    await dispatch(decrease(data));
  }

  const handleDeleteCartItem = async (id) => {
    await dispatch(deteleCartItem(id));
  };
  return (
    <div className={cx("content")}>
      <div
        onClick={() => handleDeleteCartItem(_id)}
        className={cx("clear")}
      ><CloseOutlined /></div>
      <div className={cx("image")}>
        <img src={image} alt="cart"></img>
      </div>

      <div className={cx("body")}>

        <p className={cx("name")}>{name}</p>
        <div className={cx("price")}>
            <p className={cx("sale_price")}>{formatPrice(salePrice)}</p>
            <p className={cx("price")}>{formatPrice(price)}</p>
            <p className={cx('promotion')}>{`Giảm ${handlePercentDiscount()}%`}</p>
        </div>

        <div className={cx('action')}>
            <p>Chọn số lượng: </p>
            <ul className={cx('btn_event')}>
                <li
                  onClick={() => handleDecease(data)}
                ><MinusOutlined /></li>
                <li>{qty}</li>
                <li
                  onClick={() => handleAddProduct(data)}
                ><PlusOutlined /></li>
            </ul>
        </div>
        <div className={cx("description", "mt-2")}>{descriptions}</div>
      </div>
    </div>
  );
}

Item.propTypes = {
  data: PropTypes.object.isRequired
}
export default Item;
