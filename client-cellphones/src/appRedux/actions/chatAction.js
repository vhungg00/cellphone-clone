import cellphonesApi from "~/api/cellphonesApi";
import {
  chatFailed,
  chatPending,
  chatSuccess,
  updateIdConver,
  updateLastmessageConver,
  showConver,
} from "~/appRedux/reducerSlice/chatSlice";
import { logoutSuccess } from "../reducerSlice/isAuthSlice";

export const getAllConversationList = () => async (dispatch) => {
  try {
    dispatch(chatPending());
    const data = await cellphonesApi.chatList();
    console.log('data: ', data);
    if (data) {
      dispatch(chatSuccess(data));
    } else {
      dispatch(chatFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(logoutSuccess());
  }
};

export const updateIdConversation = (conversation) => async (dispatch) => {
    if(conversation) {
        dispatch(updateIdConver(conversation));
    } else {
        dispatch(chatFailed())
    }
};

export const updateLastMessageConversation = (message) => async (dispatch) => {
  dispatch(updateLastmessageConver(message));
};

export const showConversation = (conversation) => async (dispatch) => {
  dispatch(showConver(conversation));
};

export const SeenConversation = (idConversation) => async (dispatch) => {
  console.log("seen:", idConversation);
  dispatch({ type: "SEEN_CONVERSATION", payload: idConversation });
};
