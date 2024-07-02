import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import chatReducer from './reducers/uploadedFilesSlice'

export default function createStore(preloadedState) {
    const middlewares = [thunk]

    const reducers = {
        chats: chatReducer
    }
    const store = configureStore({ reducer: reducers }, undefined, middlewares)

    return store
}