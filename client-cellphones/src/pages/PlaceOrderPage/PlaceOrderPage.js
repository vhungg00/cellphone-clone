import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "~/appRedux/actions/orderAction";
import { orderReset } from "~/appRedux/reducerSlice/orderSlice";
import Message from "~/components/LoadingError/Error";
import { changePriceUsa, formatPrice } from "~/untils";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)
  const userInfo = useSelector(state => state.auth.user.data)
  
  const cartItem = cart.carts.map(item => {
    console.log(changePriceUsa(item.salePrice))
    return {
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: changePriceUsa(item.salePrice),
      product: item._id
    }
  })

    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
  
    const itemsPrice = addDecimals(
      cart.carts.reduce((acc, item) => acc + item.salePrice * item.qty, 0)
    );
    console.log('itemsPrice: ', itemsPrice);
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
    const taxPrice = addDecimals(Number((0.001 * itemsPrice).toFixed(2)));
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);

  const orderCreate = useSelector((state) => state.order);
  const { order, success, error } = orderCreate;
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderReset());
    }
  }, [navigate, dispatch, success, order]);
  const placeOrderHandler = async () => {
    const valueOrder = {
        orderItems: cartItem,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: changePriceUsa(itemsPrice),
        shippingPrice: changePriceUsa(shippingPrice),
        taxPrice: changePriceUsa(taxPrice),
        totalPrice: changePriceUsa(totalPrice),
    }
    await dispatch(createOrder(valueOrder))
  };

  return (
    <>
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
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
                  <strong>Thông tin đơn hàng</strong>
                </h5>
                <p>Vận chuyển: {cart.shippingAddress.province}</p>
                <p>Hình thức thanh toán: {cart.paymentMethod}</p>
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
                  Địa chỉ:{cart.shippingAddress.more},{" "}, 
                  {cart.shippingAddress.district}, {" "},{cart.shippingAddress.ward}, {cart.shippingAddress.province}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.carts.length === 0 ? (
              <a variant="alert-info mt-5">Your cart is empty</a>
            ) : (
              <>
                {cart.carts.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/product-detail/${item.slug}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{(item.qty)}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>{formatPrice(item.qty * item.price)}đ</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-4 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Giá sản phẩm</strong>
                  </td>
                  <td>{formatPrice(itemsPrice)}đ</td>
                </tr>
                <tr>
                  <td>
                    <strong>Giá vận chuyển</strong>
                  </td>
                  <td>{formatPrice(shippingPrice)}đ</td>
                </tr>
                <tr>
                  <td>
                    <strong>Thuế</strong>
                  </td>
                  <td>{formatPrice(taxPrice)}đ</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng tiền</strong>
                  </td>
                  <td>{formatPrice(totalPrice)}đ</td>
                </tr>
              </tbody>
            </table>
            {cart.carts.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
               Đặt hàng
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
