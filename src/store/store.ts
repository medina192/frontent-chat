import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice';
import { useDispatch } from 'react-redux'
import  messagesSlice  from '../slices/messagesSlicer';
import moveScreenSlice from '../slices/moveScreenSlice';


export const store = configureStore({
  reducer: {
    user: userSlice,
    messages: messagesSlice,
    move: moveScreenSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
