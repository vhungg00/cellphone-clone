
import { addCartPending, addCartSuccess, cartEmty, cartSaveShippingAddress, cartSavePaymentMethod, decreaseCart, deleteCart } from '~/appRedux/reducerSlice/cartSlice';

export const addCart = (payload) => async (dispatch) => {
    await dispatch(addCartPending());
    try {
       await dispatch(addCartSuccess(payload));
    } catch (err) {
        console.log(err);
    }
};

export const decrease = (payload) => async (dispatch) => {
    await dispatch(addCartPending());
    await dispatch(decreaseCart(payload));
};

export const deteleCartItem = (id) => async (dispatch) => {
    await dispatch(addCartPending());
    await dispatch(deleteCart(id));
};
export const cartempty = () => async (dispatch) => {
    await dispatch(cartEmty());
};

export const cartSaveAddress = (payload) => async (dispatch) => {
    await dispatch(cartSaveShippingAddress(payload));
    localStorage.setItem("SHIPPING_ADDRESS", JSON.stringify(payload));
};

export const cartSavePayment = (payload) => async (dispatch) => {
    await dispatch(cartSavePaymentMethod(payload));
    localStorage.setItem("PAYMENT_METHOD", JSON.stringify(payload));
}; 