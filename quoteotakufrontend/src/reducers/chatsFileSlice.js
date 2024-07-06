import { createSlice } from '@reduxjs/toolkit'
const shortUUID = require('short-uuid');

const reducers = {
    createChat: (state, action) => {
        state.value.push({
            id: shortUUID.generate(),
            createdEpoch: Date.now()
        });
        if (state.value.length > process.env.REACT_APP_MAX_CHATS) {
            state.value.shift();
        }
    },
    createChatConditionally: (state, action) => {
        if (state.value.length == 0) {
            state.value.push({
                id: shortUUID.generate(),
                createdEpoch: Date.now()
            });
        } else {
            // 86400000 is number of ms in a day
            if (state.value[state.value.length - 1].createdEpoch > Date.now() + 86400000 * process.env.REACT_APP_NEW_CHAT_DAYS_THRES) {
                state.value.push({
                    id: shortUUID.generate(),
                    createdEpoch: Date.now()
                });
            }
            if (state.value.length > process.env.REACT_APP_MAX_CHATS) {
                state.value.shift();
            }
        };
    },
    removeChat: (state, action) => {
        state.value.filter((value) => { return value.id != action.payload });
    }
}
export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        value: localStorage.getItem("chats") || localStorage.getItem("chats") != undefined ? JSON.parse(localStorage.getItem("chats")) : []
    },
    reducers: reducers
})

export const { createChat, createChatConditionally, removeChat } = chatsSlice.actions;
export const selectChats = (state) => state.chats.value;
export const selectRecentChat = (state) => state.chats.value[state.chats.value.length - 1];
export default chatsSlice.reducer;

