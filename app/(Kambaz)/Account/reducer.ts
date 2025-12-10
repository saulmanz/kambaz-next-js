import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  signInRole: "student"
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSignInRole: (state, action) => {   // <-- NEW
      state.signInRole = action.payload;
    },
  },
});
export const { setCurrentUser, setSignInRole } = accountSlice.actions;
export default accountSlice.reducer;