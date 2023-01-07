import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    conversationList: [],
    idConversation: '',
    nameConversation: '',
    success: false,
    error: '',
}

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        chatPending: (state, {payload}) => {
            state.isLoading = true;
        },
        chatSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.conversationList = payload;
            state.success = true;
        },
        updateIdConver: (state, {payload}) => {
            state.idConversation = payload._id;
            state.nameConversation = payload.nameConversation
        },
        updateLastmessageConver: (state, {payload}) => {
            const temp = [...state.conversationList];
            const index = temp.findIndex( item => item.idUser === payload.idUser);
            temp[index] = payload;
            console.log('temps:', temp);
            state.conversationList = temp;
        },
        showConver: (state, {payload}) => {
            const temp = [...state.conversationList];
            const index = temp.findIndex( item => item.idUser === payload.idUser);
            if(index < 0) {
                temp.push(payload);
            }
            console.log('temps2:', temp);

            state.conversationList = temp;
        },
        chatFailed: (state, {payload}) => {
            state.isLoading = false;
            state.success = false;
        },
    }
})

let {reducer, actions} = chatSlice

export const {
    chatPending,
    chatSuccess,
    updateIdConver,
    updateLastmessageConver,
    showConver,
    chatFailed,
} = actions;

export default reducer