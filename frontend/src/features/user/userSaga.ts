import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./userSlice";
import successMsg from "../../components/Alerts/SuccessMsg";
import errorMsg from "../../components/Alerts/ErrorMsg";

interface LoginResponse {
  id: string;
  email: string;
  username: string;
  token: string;
}

interface RegisterResponse {
  id: string;
  email: string;
  username: string;
  token: string;
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      axios.post,
      "/api/login",
      action.payload
    );
    successMsg("User successfully logged in");
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Login failed");
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: AxiosResponse<RegisterResponse> = yield call(
      axios.post,
      "/api/register",
      action.payload
    );
    yield put(registerSuccess(response.data));
  } catch (error: any) {
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
}

export default function* userSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
