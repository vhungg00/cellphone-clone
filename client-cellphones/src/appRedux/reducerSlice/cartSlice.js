import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  isLoading: false,
  shippingAddress: {},
  error: "",
  paymentMethod: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartPending: (state) => {
      state.isLoading = true;
    },
    addCartSuccess: (state, { payload }) => {
      state.isLoading = false;
      let temps = [...state.carts];

      const exists = temps.find((item) => item._id === payload._id);
      if (exists) {
        temps = temps.map((item) => {
          let boolean = item._id === payload._id;
          return boolean && boolean ? { ...exists, qty: exists.qty + 1 } : item;
        });
      } else {
        const temp = {
          ...payload,
          qty: 1,
        };
        temps.push(temp);
      }
      state.carts = temps;
    },
    decreaseCart: (state, { payload }) => {
      state.isLoading = false;
      let temps = [...state.carts];
      const exists = temps.find((item) => item._id === payload._id);
      if (exists.qty === 1) {
        temps = temps.filter((item) => item._id !== exists._id);
        localStorage.removeItem("CART_ITEM");
      } else {
        temps = temps.map((item) => {
          let boolean = item._id === payload._id;
          return boolean && boolean ? { ...exists, qty: exists.qty - 1 } : item;
        });
      }

      state.carts = temps;
    },
    addCartFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = "Add Cart Failed";
    },
    deleteCart: (state, { payload }) => {
      state.isLoading = false;
      let temps = [...state.carts];
      console.log(temps);
      temps = temps.filter((item) => item._id !== payload);
      localStorage.removeItem("CART_ITEM");

      state.carts = temps;
    },
    cartSaveShippingAddress: (state, { payload }) => {
      state.isLoading = false;
      state.shippingAddress = payload;
    },
    cartSavePaymentMethod: (state, { payload }) => {
      state.isLoading = false;
      state.paymentMethod = payload;
    },
    cartEmty: (state) => {
      state.isLoading = false;
      state.carts = [];
    },
  },
});

let { reducer, actions } = cartSlice;

export const {
  addCartPending,
  addCartSuccess,
  decreaseCart,
  deleteCart,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
  addCartFailed,
  cartEmty,
} = actions;

export default reducer;
