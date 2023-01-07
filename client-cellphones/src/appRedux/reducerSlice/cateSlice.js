import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    cateList: [],
    cate: [],
    laptops: [],
}

const cateSlice = createSlice({
    name:'Category',
    initialState,
    reducers: {
        getCatePending: (state) => {
            state.isLoading = true;
        },
        getCateSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.cateList = payload;
        },
        getPrdByCate: (state, {payload}) => {
            state.isLoading = false;
            state.cate = payload;
        },
        getLaptopByCate: (state, {payload}) => {
            state.isLoading = false;
            state.laptops = payload;
        },
        getCateFail: (state, {payload}) => {
            state.isLoading = false;
        }
    }
})

const {reducer, actions} = cateSlice;

export const {getCatePending, getCateSuccess, getPrdByCate, getLaptopByCate, getCateFail} = actions;

export default reducer;