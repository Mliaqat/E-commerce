import { createSlice } from "@reduxjs/toolkit";
const newLocal = localStorage.getItem("islogged");

const initialState: any = {
  accountCreated: false,
  isloggedIn: newLocal !== null ? JSON.parse(newLocal) : false,
  loggedInfo: localStorage.getItem("userEmail")
    ? localStorage.getItem("userEmail")
    : "",
  isAdmin: false,
};

const AuthAccount = createSlice({
  name: "header",
  initialState,
  reducers: {
    setAccountCreated(state, action) {
      state.accountCreated = action.payload;
    },

    setIsLoggedIn(state, action) {
      state.isloggedIn = action.payload;
    },

    setLoggedInfo(state, action) {
      state.loggedInfo = action.payload;
    },

    deleteItemToCartHandler(state, action) {},
  },
});

export const { setAccountCreated, setIsLoggedIn, setLoggedInfo } =
  AuthAccount.actions;
export default AuthAccount.reducer;
