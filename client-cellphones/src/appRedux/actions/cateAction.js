import cellphonesApi from '~/api/cellphonesApi';
import { getCatePending, getCateSuccess, getCateFail, getPrdByCate, getLaptopByCate, createCate, deleteCate } from '~/appRedux/reducerSlice/cateSlice';

export const getCate = () => async (dispatch) => {
    await dispatch(getCatePending());
    const res = await cellphonesApi.getAllCategory();
    if(res.status === 200 && res.success) {
        await dispatch(getCateSuccess(res));
    }
    else {
        await dispatch(getCateFail());
    }
}
export const getProductByCategory = (slugCate) => async (dispatch) => {
    await dispatch(getCatePending());
    const res = await cellphonesApi.getProductByCate(slugCate);
    if(res.status === 200 && res.success) {
        await dispatch(getPrdByCate(res.data));
    } else {
        await dispatch(getCateFail());
    }
};
export const getLaptopByCategory = (slugCate) => async (dispatch) => {
    await dispatch(getCatePending());
    const res = await cellphonesApi.getProductByCate(slugCate);
    console.log('res: ', res);
    if(res.status === 200 && res.success) {
       await dispatch(getLaptopByCate(res.data));
    } else {
        await dispatch(getCateFail());
    }
};

export const createCategory = (payload) => async (dispatch) => {
    await dispatch(getCatePending());
    const res = await cellphonesApi.createCategory(payload);
    if(res.data) {
        await dispatch(createCate(res.data));
    } else {
        await dispatch(getCateFail());
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    await dispatch(getCatePending());
    await cellphonesApi.deleteCategory(id);
    await dispatch(deleteCate());
};