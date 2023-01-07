import cellphonesApi from "~/api/cellphonesApi";
import {
  loginFail,
  loginPending,
  loginSuccess,
  logoutSuccess,
  userFailed,
  userPending,
  userSuccess,
} from "../reducerSlice/isAuthSlice";

export const UserLogin = (payload) => async (dispatch) => {
  await dispatch(loginPending());
  const res = await cellphonesApi.login(payload);
  if (res.status === 200 && res.success) {
    await localStorage.setItem("AUTH_INFO", JSON.stringify(res.data) || "");

    await localStorage.setItem(
      "USER_TOKEN",
      JSON.stringify(res.data.token) || ""
    );

    await localStorage.setItem("USER_ID", JSON.stringify(res.data._id) || "");
    await localStorage.setItem("INFO_LOGIN", JSON.stringify(payload) || "");
    await dispatch(loginSuccess(res));
  } else {
    await dispatch(loginFail(res));
  }
  return res;
};

export const LogOutUser = () => async (dispatch) => {
  await dispatch(loginPending());
  await cellphonesApi.logOutUser();
  await dispatch(logoutSuccess());
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch(userPending());
    const { data } = await cellphonesApi.updateProfile(user);
    if (data) {
      dispatch(userSuccess(data));
      dispatch(logoutSuccess());
      await localStorage.setItem("AUTH_INFO", JSON.stringify(data) || "");

      await localStorage.setItem(
        "USER_TOKEN",
        JSON.stringify(data.token) || ""
      );

      await localStorage.setItem("USER_ID", JSON.stringify(data._id) || "");
      await localStorage.setItem("INFO_LOGIN", JSON.stringify(user) || "");
    } else {
      await dispatch(loginFail());
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(loginSuccess());
    }
    dispatch(userFailed());
  }
};

export const register = (payload) => async (dispatch) => {
  await dispatch(userPending());
  const res = await cellphonesApi.register(payload);
  console.log("res: ", res);
  if (res.status === 200 && res.success) {
    await dispatch(userSuccess(res));
    await localStorage.setItem("AUTH_INFO", JSON.stringify(res.data) || "");

    await localStorage.setItem(
      "USER_TOKEN",
      JSON.stringify(res.data.token) || ""
    );

    await localStorage.setItem("USER_ID", JSON.stringify(res.data._id) || "");
    await localStorage.setItem("INFO_LOGIN", JSON.stringify(payload) || "");
  } else {
    dispatch(userFailed());
  }
};
