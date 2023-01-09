import cellphonesApi from "~/api/cellphonesApi";
import {
  sliPending,
  createSliSuccess,
  getAllSli,
  sliFailed,
  deleteSliSuccess
} from "../reducerSlice/SliderSlice";

export const getAllSlider = () => async (dispatch) => {
  await dispatch(sliPending());
  const res = await cellphonesApi.getAllSlider();
  if (res.status === 200 && res.success) {
    await dispatch(getAllSli(res.data));
  } else {
    await dispatch(sliFailed());
  }
};
export const createSlider = (payload) => async (dispatch, getState) => {
  await dispatch(sliPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    console.log(payload);
    let res = await cellphonesApi.createSlider(payload, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(createSliSuccess(res.data));
    } else {
      await dispatch(sliFailed());
    }
  } catch (err) {
    console.log("error: " + err);
  }
};

export const deleteSlider = (id) => async (dispatch, getState) => {
  await dispatch(sliPending());
  try {
    const {
      auth: { user },
    } = getState();
    const { isAdmin = false } = user.data;
    let res = await cellphonesApi.deleteSlider(id, isAdmin);
    if (res.status === 200 && res.success) {
      await dispatch(deleteSliSuccess(res.data));
    }
  } catch (err) {
    console.log("error: " + err);
  }
};
