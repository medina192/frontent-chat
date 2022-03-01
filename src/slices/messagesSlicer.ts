import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit'
import { generalCallApi } from '../services/api/apiCalls';
//import { AnyAction } from 'redux';



export const bringMessages = createAsyncThunk(
  'messages/bringMessages',
  async ({ uid, friendUid, friendName }: { uid: string, friendUid: string, friendName: string} ) => {
    const response = await generalCallApi('Post','/api/messages/bringFriendMessages',{
      myUid: uid,
      friendUid
    });
    //return response

    return {
      currentMessages: response?.data.messages,
      currentFriend: {
        uid: friendUid,
        name: friendName
      },
      status: 'completed'
    }
  }
)



export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    currentMessages: [],
    currentFriend: {
      uid: '',
      name: ''
    },
    status: 'loading'
  },

  reducers: {
    addNewMessage: (state, action: PayloadAction<any>) => {
      return action.payload;
    },

    setCurrentUser: (state, action: PayloadAction<any>) => {

        return action.payload
      },
  },

  extraReducers: (builder) => {

    builder
      .addCase( bringMessages.fulfilled, (state, action) => {  
        return action.payload;
      })
      .addCase( bringMessages.pending, (state, action) => {  
        state.status = 'loading';
      });
    

    
  }

})

// Action creators are generated for each case reducer function
export const { addNewMessage, setCurrentUser } = messagesSlice.actions

export default messagesSlice.reducer