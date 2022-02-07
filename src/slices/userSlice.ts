import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'


export interface User {
  isLogged: boolean,
  name: string,
  uid: string
}


const proof = new Promise((resolve: (value: User) => void, reject) => {
  setTimeout(() => {
    resolve({
      isLogged: true,
      name: 'pablo',
      uid: '9876554'
    })
  }, 3000);
})



// First, create the thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userId, thunkAPI) => {
    const response = await proof;
    return response
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
        isLogged: false,
        name: '',
        uid: '',
  },

  reducers: {
    login: (state, action: PayloadAction<User>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      /*
      if(state.isLogged === action.payload.isLogged)
      {
        return state
      }
      else{
        return action.payload
      }
    */
      if(state.isLogged === action.payload.isLogged && state.name === action.payload.name
        && state.uid === action.payload.uid)
        return state;
      else  
        return action.payload;
    },

    logout: () => {
      return {
        isLogged: false,
        name: '',
        uid: '',
      }
    },

  },

  extraReducers: (builder) => {

    builder.addCase( loginUser.fulfilled, (state, action) => {  
      return action.payload;
    });

    
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer