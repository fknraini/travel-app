import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  isLogin: boolean;
  account: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  account: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.account = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.account = null;
    },
  },
});

// Export the action creators with correct typings
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLogin: false,
//   account: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isLogin = true;
//       state.account = action.payload;
//     },
//     logout: (state) => {
//       state.isLogin = false;
//       state.account = null;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;
