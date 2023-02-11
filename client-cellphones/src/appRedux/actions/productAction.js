import cellphonesApi from "~/api/cellphonesApi";
import {
  getPrdPending,
  getPrdSuccess,
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
  deletePrd,
  ascendingPrd,
  descendingPrd,
  filterPrdByPrice,
  prdCreateReviewPending,
  prdCreateReviewSuccess,
  prdCreateReviewFailed,
  getAllPrdAdmin,
  prdComment,
  prdCommentFalied,
  repCmtPrd,
  pinCmtPrd
} from "~/appRedux/reducerSlice/productSlice";
import { logoutSuccess } from "../reducerSlice/isAuthSlice";

export const searchProduct = (params) => async (dispatch) => {
  await dispatch(getPrdPending());
  const res = await cellphonesApi.searchProduct(params);
  if (res.status === 200 && res.success) {
    await dispatch(searchProductSuccess(res.data));
  } else {
    await dispatch(getPrdFail());
  }
};

export const getAllProducts = (q, page) => async (dispatch) => {
  await dispatch(getPrdPending());
  const res = await cellphonesApi.getAllProduct(q, page);
  if (res.status === 200 && res.success) {
    await dispatch(getPrdSuccess(res));
  } else {
    dispatch(getPrdFail());
  }
};

export const getAllProductAdmin = () => async (dispatch) => {
  const res = await cellphonesApi.getAllProductAdmin();
  if(res.status === 200 && res.success) {
    await dispatch(getAllPrdAdmin(res));
  } else {
    dispatch(getPrdFail());
  }
};

export const getPrdDetailBySlug = (slug) => async (dispatch) => {
  await dispatch(getPrdPending());
  const res = await cellphonesApi.getPrdDetailBySlug(slug);
  if (res.status === 200 && res.success) {
    await dispatch(getPrdSuccess(res));
  } else {
    dispatch(getPrdFail());
  }
};

export const getAllTypeProduct = () => async (dispatch) => {
  await dispatch(getPrdPending());
  const res = await cellphonesApi.getallTypePrd();
  if (res.status === 200 && res.success) {
    await dispatch(getAllTypePrd(res.data));
  } else {
    await dispatch(getPrdFail());
  }
};
export const createTypeProduct = (payload) => async (dispatch, getState) => {
  await dispatch(getPrdPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    console.log(payload);
    let res = await cellphonesApi.createTypePrd(payload, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(createNewTypePrd(res.data));
    } else {
      await dispatch(getPrdFail());
    }
  } catch (err) {
    console.log("error: " + err);
  }
};

export const deleteTypeProduct = (id) => async (dispatch, getState) => {
  await dispatch(getPrdPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    let res = await cellphonesApi.deleteTypePrd(id, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(deleteTypePrd(res.data));
    }
  } catch (err) {
    console.log("error: " + err);
  }
};

export const getAllSelectProduct = () => async (dispatch) => {
  await dispatch(getPrdPending());
  try {
    let res = await cellphonesApi.getAllSelectPrd();
    if (res.status === 200 && res.success) {
      await dispatch(getAllSelectPrd(res.data));
    } else {
      console.log("error");
      await dispatch(getPrdFail());
    }
  } catch (error) {
    console.log(error);
  }
};
export const createSelectProduct = (payload) => async (dispatch, getState) => {
  await dispatch(getPrdPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    let res = await cellphonesApi.createSelectPrd(payload, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(createSelectPrd(res.data));
    } else {
      console.log("error");
      await dispatch(getPrdFail());
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteSelectProduct = (id) => async (dispatch, getState) => {
  await dispatch(getPrdPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    let res = await cellphonesApi.deleteSelectPrd(id, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(deleteSelectPrd(res));
    } else {
      await dispatch(getPrdFail());
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateSelectProduct =
  (id, payload) => async (dispatch, getState) => {
    await dispatch(getPrdPending());
    console.log(payload);
    try {
      const {
        auth: { user },
      } = getState();
      const { isAdmin = false } = user.data;
      let res = await cellphonesApi.updateSelectPrd(id, payload, isAdmin);
      if (res.status === 200 && res.success) {
        await dispatch(updateSelectPrd(res.data));
      } else {
        await dispatch(getPrdFail());
      }
    } catch (e) {
      console.log(e);
    }
  };

export const createProduct = (payload) => async (dispatch, getState) => {
  await dispatch(getPrdPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    let res = await cellphonesApi.createPrd(payload, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(createPrd(res.data));
    } else {
      await dispatch(getPrdFail());
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  await dispatch(getPrdPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    let res = await cellphonesApi.deletePrd(id, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(deletePrd(res));
    } else {
      await dispatch(getPrdFail());
    }
  } catch (e) {
    console.log(e);
  }
};

export const ascendingProduct = () => async (dispatch) => {
  await dispatch(getPrdPending());
  await setTimeout(() => dispatch(ascendingPrd()), 500);
};

export const descendingProduct = () => async (dispatch) => {
  await dispatch(getPrdPending());
  await setTimeout(() => dispatch(descendingPrd()), 500);
};

export const filterProductByPrice = (a) => async (dispatch) => {
  await dispatch(getPrdPending());
  await setTimeout(() => dispatch(filterPrdByPrice(a)), 500);
};

export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch(prdCreateReviewPending());
    const res = await cellphonesApi.createReviewProduct(productId, review);
    if(res.alreadyReviewed) {
      dispatch(prdCreateReviewFailed(res.message));
    } else {
      dispatch(prdCreateReviewSuccess());
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logoutSuccess());
    }
    dispatch(prdCreateReviewFailed(message));
  }
};


export const commentPrD = (slug, commentInfo) => async (dispatch) => {
  try{
    dispatch(prdCreateReviewPending())
    const res = await cellphonesApi.commentPrd(slug, commentInfo);
    if(res.status === 200 && res.success) {
      dispatch(prdComment(res.data))
    } else {
      dispatch(prdCommentFalied())
    }
  } catch(err){
    dispatch(prdCommentFalied())
  }
};

export const repCommentProduct = (slug, comment) => async (dispatch) => {
  try {
    dispatch(prdCreateReviewPending())
    const res = await cellphonesApi.repCommentPrd(slug, comment);
    if(res.status === 200 && res.success) {
      dispatch(repCmtPrd(res.data))
    } else {
      dispatch(prdCommentFalied())
    }
  } catch(err) {
    dispatch(prdCommentFalied())
  }
};

export const pinCommentProduct = (slug, comment) => async (dispatch, getState) => {
  try {
    dispatch(prdCreateReviewPending())
    const res = await cellphonesApi.pinCommentPrd(slug, comment);
    if(res.status === 200 && res.success) {
      dispatch(pinCmtPrd(res));
    }
    else {
      dispatch(prdCommentFalied())
    }
  } catch (error) {
    dispatch(prdCommentFalied())
  }
};