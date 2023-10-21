import { configureStore } from '@reduxjs/toolkit'
import quesSlice from '../features/quesSlice'
import userSlice from '../features/userSlice'

export const store = configureStore({
    reducer:{
        ques:quesSlice,
        user:userSlice

    }
});

