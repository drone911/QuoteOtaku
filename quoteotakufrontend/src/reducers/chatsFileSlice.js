import { createSlice } from '@reduxjs/toolkit'
const shortUUID = require('short-uuid');

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        value: localStorage.getItem("chats") ? JSON.parse(localStorage.getItem("chats")) : []
    },
    reducers: {
        createChat: (state, action) => {
            state.value.push({
                id: shortUUID.generate(),
                createdEpoch: Date.now()
            });
            if (state.value.length > process.env.REACT_APP_MAX_CHATS) {
                state.value.shift();
            }
        },
        getRecentChat: (state, action) => {
            if (state.value == []) {
                state.value.push({
                    id: shortUUID.generate(),
                    createdEpoch: Date.now()
                });
            } else {
                // 86400000 is number of ms in a day
                if (state.value.at(-1).createdEpoch > Date.now() + 86400000 * process.env.REACT_APP_NEW_CHAT_DAYS_THRES) {
                    state.value.push({
                        id: shortUUID.generate(),
                        createdEpoch: Date.now()
                    });
                }
                if (state.value.length > process.env.REACT_APP_MAX_CHATS) {
                    state.value.shift();
                }
                return state.value.at(-1);
            }
        },
        removeChat: (state, action) => {
            state.value.filter((value) => { return value.id != action.payload });
        }
    }
})

export const { appendValue } = chatsSlice.actions
export const selectUploadedFileHashesArray = (state) => state.uploadedFileHashes.value;
export default chatsSlice.reducer

