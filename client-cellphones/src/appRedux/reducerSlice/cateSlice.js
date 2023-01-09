import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cateList: [],
  cate: [],
  createCate: {},
  laptops: [],
};

const cateSlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    getCatePending: (state) => {
      state.isLoading = true;
    },
    getCateSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.cateList = payload;
    },
    createCate: (state, { payload }) => {
      state.isLoading = false;
      state.createCate = payload;
    },
    deleteCate: (state, { payload }) => {
      state.isLoading = false;
      state.createCate = {};
    },
    getPrdByCate: (state, { payload }) => {
      state.isLoading = false;
      state.cate = payload;
    },
    getLaptopByCate: (state, { payload }) => {
      state.isLoading = false;
      state.laptops = payload;
    },
    getCateFail: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = cateSlice;

export const {
  getCatePending,
  getCateSuccess,
  createCate,
  deleteCate,
  getPrdByCate,
  getLaptopByCate,
  getCateFail,
} = actions;

export default reducer;
