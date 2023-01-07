import axios from "axios";

import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartempty } from "~/appRedux/actions/cartAction";
import { createOrder } from '~/appRedux/actions/orderAction'

import VnPay from "./VnPay";
import { PayPalButton } from "react-paypal-button-v2";

import classNames from 'classnames/bind';
import styles from './Order.module.scss';
const cx = classNames.bind(styles);

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [choosePay, setChoosePay] = useState({
    paymentLater: false,
    paymentOnline: false,
  });

  const order = useSelector((state) => state.order.orderInfo);

  const paymentLater = () => {
    setChoosePay({ paymentOnline: false, paymentLater: true });
  };

  const paymentOnline = () => {
    setChoosePay({ paymentLater: false, paymentOnline: true });
  };
  
  const SendOrderPayLater = async () => {
    const OrderPaid = {
      ...order,
      status: "pendding",
      paymentMethod: "paymentLater",
    };
    await dispatch(createOrder(OrderPaid))
    localStorage.removeItem("CART_ITEM");
    await dispatch(cartempty())
    navigate("/orderSuccess");
  };

  // const successPaymentHandler = async (paymentResult) => {
  //   const OrderPaid = {
  //     ...order,
  //     status: "pendding",
  //     paymentMethod: "paymentOnline",
  //     paymentResult: {...paymentResult},
  //   };
  //   await dispatch(createOrder(OrderPaid));
  //   history.push("/orderSuccess");
  // };



  // useEffect(() => {
  //   const addPayPalScript = async () => {
  //     const { data } = await axios.get(
  //       "http://localhost:5000/api/config/paypal"
  //     );
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //     script.async = true;
  //     script.onload = () => {
  //       setSdkReady(true);
  //     };
  //     document.body.appendChild(script);

  //     addPayPalScript();
  //   };
  // }, []);
  return (
    <div className={cx("choose_pay")}>
      <h4>Chọn phương thức thanh toán</h4>  
      <div className={cx("choose")}>
        <button
          type="submit"
          className={cx(choosePay.paymentLater ? "active" : "")}
          onClick={paymentLater}
        >
          Thanh toán khi nhận hàng
        </button>
        <button
          type="submit"
          className={cx(choosePay.paymentOnline ? "active" : "")}
          onClick={paymentOnline}
        >
          Thanh toán Online
        </button>
      </div>
      {choosePay.paymentLater ? (
        <div className={cx("customer_order")}>
          <button
            type="submit"
            className={cx('btn-submit')} 
            onClick={SendOrderPayLater}
          >
            Đặt Hàng 
          </button>
        </div>
      ) : (
        ""
      )}
      {choosePay.paymentOnline ? (
        <button type="submit" className="paypal">
          
          <VnPay />
          <PayPalButton
            className="paypal-btn"
            style={{ color: "white", marginTop: '1rem' }}
            amount={1}
            // onSuccess={successPaymentHandler}
          ></PayPalButton>
        </button>
      ) : (
        ""
      )}

    </div>
  );
}

export default memo(Payment);