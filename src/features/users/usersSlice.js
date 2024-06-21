import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentUsers: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    Login: (state, action) => {
      state.currentUsers = action.payload;
   
    },LogOut:(state,action)=>{
        state.currentUsers=null;
    }
   
  },
});

export const { Login,LogOut } = usersSlice.actions;
export default usersSlice.reducer;
