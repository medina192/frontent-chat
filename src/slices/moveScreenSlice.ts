import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit'
//import { AnyAction } from 'redux';



export const moveScreenSlice = createSlice({
  name: 'moveScreen',
  initialState: {
    showUsersScreen: false,
    showChatScreen: false
  },

  reducers: {
    moveToUsers: (state, action: PayloadAction<any>) => {
      return action.payload;
    },

    moveToChat: (state, action: PayloadAction<any>) => {

        return action.payload
      },
  },

})

// Action creators are generated for each case reducer function
export const { moveToUsers, moveToChat } = moveScreenSlice.actions

export default moveScreenSlice.reducer