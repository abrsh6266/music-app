import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  email: string | null;
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
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
      console.log(action.payload);
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
      state.id = action.payload.id;
      state.loading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
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
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ email: string; username: string; id: string }>
    ) {
      state.id = action.payload.id;
      state.loading = false;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.email = null;
      state.username = null;
      state.token = null;
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
