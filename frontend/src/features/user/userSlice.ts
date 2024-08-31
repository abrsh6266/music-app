import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  saveUserDataToLocalStorage,
  getUserDataFromLocalStorage,
  clearUserDataFromLocalStorage,
} from "../../utils/localStorage"; // Adjust the import path as needed

interface UserState {
  id: string | null;
  email: string | null;
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initialize state with data from localStorage if available
const initialState: UserState = getUserDataFromLocalStorage() || {
  id: null,
  email: null,
  username: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      console.log(action);
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        token: string;
        id: string;
      }>
    ) {
      console.log(action);
      state.id = action.payload.id;
      state.loading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;

      // Save user data to localStorage
      saveUserDataToLocalStorage(action.payload);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest(
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        password: string;
      }>
    ) {
      console.log(action);
      state.loading = true;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ email: string; username: string }>
    ) {
      state.loading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.id = null;
      state.email = null;
      state.username = null;
      state.token = null;

      // Clear user data from localStorage
      clearUserDataFromLocalStorage();
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
