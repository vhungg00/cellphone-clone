import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authReducer from '~/appRedux/reducerSlice/isAuthSlice';
import cateReducer from '~/appRedux/reducerSlice/cateSlice';
import prdReducer from '~/appRedux/reducerSlice/productSlice';
import cartReducer from '~/appRedux/reducerSlice/cartSlice';
import orderReducer from '~/appRedux/reducerSlice/orderSlice';
import chatReducer from '~/appRedux/reducerSlice/chatSlice';
const rootReducer = combineReducers({
    auth: authReducer,
    cate: cateReducer,
    product: prdReducer,
    cart: cartReducer,
    order: orderReducer,
    chat: chatReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("CART_ITEM")
  ? JSON.parse(localStorage.getItem("CART_ITEM"))
  : [];

// login
const userInfoFromLocalStorage = localStorage.getItem("AUTH_INFO")
  ? JSON.parse(localStorage.getItem("AUTH_INFO"))
  : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
    cart: {
      cartItems: cartItemsFromLocalStorage,
      shippingAddress: shippingAddressFromLocalStorage,
    },
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    initialState,
    middleware: getDefaultMiddleware({
        serializableCheck:false
    })
})

export default store;