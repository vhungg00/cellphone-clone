import cellphonesApi from "~/api/cellphonesApi";
import {
  orderDetail,
  orderFailed,
  orderInfo,
  orderMyList,
  getAllOrder,
  orderPayment,
  orderPendding,
  orderSuccess,
  orderDelivered,
} from "~/appRedux/reducerSlice/orderSlice";
import { cartEmty } from "../reducerSlice/cartSlice";
import { logoutSuccess } from "../reducerSlice/isAuthSlice";

export const orderInfor = (payload) => async (dispatch) => {
  await dispatch(orderPendding());
  await dispatch(orderInfo(payload));
};

// CREATE ORDER
export const createOrder = (order) => async (dispatch) => {
  try {
    await dispatch(orderPendding());
    const result = await cellphonesApi.createOrd(order);
    await dispatch(orderSuccess(result.data));
    await dispatch(cartEmty());
    localStorage.removeItem("CART_ITEM");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logoutSuccess());
    }
    dispatch(orderFailed());
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderPendding());
    const res = await cellphonesApi.getOrderDetail(id);
    if (res.status === 201 && res.success) {
      dispatch(orderDetail(res.data));
    } else {
      dispatch(orderFailed());
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logoutSuccess());
    }
    dispatch(orderFailed());
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPendding());
      const { data } = await cellphonesApi.orderPayment(orderId, paymentResult);
      dispatch(orderPayment(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logoutSuccess());
      }
      dispatch(orderFailed());
    }
  };

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch(orderPendding());
    const result = await cellphonesApi.orderMyList();
    if (result.status === 201 && result.success) {
      dispatch(orderMyList(result.data));
    } else {
      dispatch(orderFailed());
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logoutSuccess());
    }
    dispatch(orderFailed());
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(orderPendding());
    const res = await cellphonesApi.getALLOrders();
    console.log('logger: ', res)
    if( res.status === 200 && res.success ) {
      dispatch(getAllOrder(res.data));
    } else {
      dispatch(orderFailed());
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logoutSuccess());
    }
    dispatch(orderFailed());
  }
};


// ORDER DELIVER
export const deliverOrder = (orderId, order) => async (dispatch) => {
  try {
    dispatch(orderPendding());
    const data = await cellphonesApi.deliveredOrd(orderId, order);
    dispatch(orderDelivered(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logoutSuccess());
    }
    dispatch(orderFailed());
  }
};

