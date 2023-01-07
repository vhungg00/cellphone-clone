import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    order: undefined,
    orderInfo: {},
    orders: [],
    allOrder: [],
    error: '',
    success: false,
}

const orderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        orderPendding: (state) => {
            state.isLoading = true;
        },
        orderSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.success = true;
            state.order = payload;
        },
        orderDetail: (state, {payload}) => {
            state.isLoading = false;
            state.order = payload;
        },
        orderPayment: (state, {payload}) => {
            state.isLoading = false;
            state.success = true;
        },
        orderMyList: (state, {payload}) => {
            state.isLoading = false;
            state.orders = payload
        },
        orderDelivered: (state, {payload}) => {
            state.isLoading = false;
            state.success = true;
        },
        getAllOrder: (state, {payload}) => {
            state.isLoading = false;
            state.allOrder = payload;
        },
        orderFailed: (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
        },
        orderReset: (state) => {
            state.success = false;
        },
        orderInfo: (state, {payload}) => {
            state.isLoading = false;
            state.orderInfo = payload;
        },
    }
});

let {reducer, actions} = orderSlice;

export const {
    orderPendding,
    orderSuccess,
    orderDelivered,
    getAllOrder,
    orderMyList,
    orderDetail,
    orderPayment,
    orderFailed,
    orderReset,
    orderInfo
} = actions;

export default reducer;