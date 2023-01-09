import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageList: [],
    image: {},
    isLoading: false,
    success: false,
    error: '',
}

const sliderSlice = createSlice({
    name: 'Slider',
    initialState,
    reducers: {
        sliPending: (state) => {
            state.isLoading = true;
        },
        createSliSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.image = payload;
            state.success = true;
        },  
        getAllSli: (state, {payload}) => {
            state.isLoading = false;
            state.imageList = payload;
            state.success = true;
        },
        deleteSliSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.image = {};
        },
        sliFailed: (state, {payload}) => {
            state.isLoading = false;
            state.success = false;
            state.error = payload;
        }
    }
});

const { reducer, actions } = sliderSlice;

export const { sliPending, createSliSuccess, deleteSliSuccess, getAllSli, sliFailed } = actions;

export default reducer;