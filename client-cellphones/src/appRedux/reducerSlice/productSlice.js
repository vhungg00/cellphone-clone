import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  allProductAdmin: [],
  product: {},
  temp: [],
  typePrds: [],
  type: {},
  selects: [],
  select: {},
  error: "",
  success: false,
  pages: 1,
  current: 1,
};
const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    getPrdPending: (state) => {
      state.isLoading = true;
    },
    getPrdSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload.data;
      state.pages = payload.pages;
      state.current = payload.current;
    },
    getAllPrdAdmin: ( state, {payload}) => {
      state.isLoading = false;
      state.allProductAdmin = payload.data;
    },
    ascendingPrd: (state, { payload }) => {
      state.isLoading = false;
      let newList = [ ...state.products];
      newList = newList.sort((a,b) => b.salePrice - a.salePrice )
        state.products = newList;
    },
    descendingPrd: (state, { payload }) => {
      state.isLoading = false;
      let newList = [ ...state.products];
      
      newList = newList.sort((a,b) => a.salePrice - b.salePrice )
      state.products = newList;
    },

    filterPrdByPrice: ( state, {payload} ) => {
      let newList = [...state.products]
      console.log(payload)
      state.isLoading = false;
      newList = newList.filter(item => item.salePrice >= payload.a && item.salePrice <= payload.b)
      console.log(newList)
      state.products = newList;

    },

    getPrdFail: (state) => {
      state.isLoading = false;
      state.products = [];
      state.error = "ERROR";
    },
    createPrd: (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
    },

    updatePrd: (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
    },
    deletePrd: (state, { payload }) => {
      state.isLoading = false;
      state.product = {};
    },

    searchProductSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.temp = payload;
    },

    getAllTypePrd: (state, { payload }) => {
      state.isLoading = false;
      state.typePrds = payload;
    },

    createNewTypePrd: (state, { payload }) => {
      state.isLoading = false;
      state.type = payload;
    },
    deleteTypePrd: (state, { payload }) => {
      state.isLoading = false;
      state.type = {};
    },

    createSelectPrd: (state, { payload }) => {
      state.isLoading = false;
      state.select = payload;
    },
    getAllSelectPrd: (state, { payload }) => {
      state.isLoading = false;
      state.selects = payload;
    },

    deleteSelectPrd: (state, { payload }) => {
      state.isLoading = false;
      state.select = {};
    },
    updateSelectPrd: (state, { payload }) => {
      state.isLoading = false;
      state.select = payload;
    },

    prdCreateReviewPending: (state, { payload }) => {
      state.isLoading = true;
    },
    prdCreateReviewSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
    },
    prdCreateReviewFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    prdCreateReviewReset: (state) => {
      state.isLoading = false;
      state.error = '';
      state.success = false;
    },
  },
});

const { reducer, actions } = productSlice;

export const {
  getPrdPending,
  getPrdSuccess,
  ascendingPrd,
  filterPrdByPrice,
  getAllPrdAdmin,
  descendingPrd,
  getPrdFail,
  searchProductSuccess,
  getAllTypePrd,
  createNewTypePrd,
  deleteTypePrd,
  createSelectPrd,
  getAllSelectPrd,
  deleteSelectPrd,
  updateSelectPrd,
  createPrd,
  updatePrd,
  deletePrd,
  prdCreateReviewPending,
  prdCreateReviewSuccess,
  prdCreateReviewFailed,
  prdCreateReviewReset
} = actions;

export default reducer;
