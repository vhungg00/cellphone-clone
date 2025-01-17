import moment from "moment";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import cellphonesApi from "~/api/cellphonesApi";
import { getOrderDetails, payOrder } from "~/appRedux/actions/orderAction";
import { orderReset } from "~/appRedux/reducerSlice/orderSlice";
import Loading from "~/components/Loading";
import Message from "~/components/LoadingError/Error";

const OrderScreen = () => {
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderResult = useSelector((state) => state.order);
  const { isLoading = false, order, error = "" } = orderResult;
  const orderPay = useSelector((state) => state.order);
  const { loading: loadingPay, success: successPay } = orderPay;
  useEffect(() => {
    const addPayPalScript = async () => {
      const clientId = await cellphonesApi.configPaypal();
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch(orderReset());
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  const {
    orderItems = [],
    isPaid = false,
    paidAt='',
    isDelivered = false,
    deliveredAt = '',
    paymentMethod = "",
    shippingAddress = {},
    shippingPrice = 0,
    taxPrice = 0,
    totalPrice = 1,
    user = {},
  } = order || {};
  const {
    province = "",
    district = "",
    ward = "",
    name = "",
    more = "",
  } = shippingAddress || {};
  const { 
    email = '',
 } = user || {};
  console.log("orderItems", orderItems);
  const successPaymentHandler = (paymentResult) => {
    console.log("paymentResult", paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  return (
    <div className="container">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Khách hàng</strong>
                    </h5>
                    <p>{name}</p>
                    <p>
                      <a href={`mailto:${email}`}>
                        {email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Thông tin đặt hàng</strong>
                    </h5>
                    <p>Thành phố: {province}</p>
                    <p>Hình thức thanh toán: {paymentMethod}</p>
                    {isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã thanh toán: {moment(paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Paid
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Giao hàng đến</strong>
                    </h5>
                    <p>
                      Địa chỉ: {more}, {' '}{ward}, {' '}{district}, {' '}{province}
                    </p>
                    {isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã giao hàng vào lúc {moment(deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa giao hàng
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Bạn chưa có đơn hàng
                  </Message>
                ) : (
                  <>
                    {orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>QUANTITY</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>SUBTOTAL</h4>
                          <h6>${item.qty * item.price}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Sản phẩm</strong>
                      </td>
                      {/* <td>${}</td> */}
                    </tr>
                    <tr>
                      <td>
                        <strong>Giá vận chuyển</strong>
                      </td>
                      <td>${shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Thuế</strong>
                      </td>
                      <td>${taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng tiền</strong>
                      </td>
                      <td>${totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                {!isPaid && (
                  <div className="col-12">
                    {loadingPay && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPalButton
                        amount={totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default OrderScreen;
