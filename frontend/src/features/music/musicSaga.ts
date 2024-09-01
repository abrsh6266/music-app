import { call, put, takeLatest, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchMusicsFailure,
  createMusicSuccess,
  createMusicFailure,
  createMusicRequest,
  updateMusicSuccess,
  updateMusicFailure,
  updateMusicRequest,
} from "./musicSlice";
import { FetchMusicsResponse, Music } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import successMsg from "../../components/Alerts/SuccessMsg";
import errorMsg from "../../components/Alerts/ErrorMsg";
import { RootState } from "../../store"; // Import RootState for typing
import { clearUserDataFromLocalStorage } from "../../utils/localStorage";

// Handle logout if token is invalid or expired
const handleLogout = () => {
  clearUserDataFromLocalStorage();
  window.location.reload();
};

// Fetch Musics Saga
function* fetchMusicsSaga(
  action: PayloadAction<{ search?: string }>
): Generator {
  try {
    const { search } = action.payload;
    const params = { search };

    const response: AxiosResponse<FetchMusicsResponse> = yield call(
      axios.get,
      "http://localhost:4000/api/v1/musics",
      { params }
    );
    yield put(fetchMusicsSuccess(response.data.musics));
  } catch (error: any) {
    console.log(error.response);
    errorMsg(error.message);
    yield put(fetchMusicsFailure(error.message));
  }
}

// Create Music Saga with Authorization Header
function* createMusicSaga(action: PayloadAction<Music>): Generator {
  try {
    // Select the token from the Redux state
    const token: string = yield select((state: RootState) => state.user.token);

    const formData = new FormData();
    formData.append("title", action.payload.title);
    formData.append("artist", action.payload.artist);
    formData.append("album", action.payload.album);
    formData.append("genre", action.payload.genre);
    if (action.payload.file) {
      formData.append("file", action.payload.file);
    }

    const response: AxiosResponse<Music> = yield call(
      axios.post,
      "http://localhost:4000/api/v1/musics",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    successMsg("Music successfully added to your playlist");
    yield put(createMusicSuccess(response.data));
  } catch (error: any) {
    errorMsg(error?.response?.data?.message);
    if (error?.response?.data?.message === "Expired/Invalid Token") {
      handleLogout();
    }
    yield put(createMusicFailure(error?.response?.data?.message));
  }
}
// Update Music Saga with Authorization Header
function* updateMusicSaga(
  action: PayloadAction<{ id: string; data: Partial<Music> }>
): Generator {
  try {
    const token: string = yield select((state: RootState) => state.user.token);
    const { id, data } = action.payload;

    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("artist", data.artist || "");
    formData.append("album", data.album || "");
    formData.append("genre", data.genre || "");
    if (data.file) {
      formData.append("file", data.file);
    }

    const response: AxiosResponse<Music> = yield call(
      axios.put,
      `http://localhost:4000/api/v1/musics/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    successMsg("Music successfully updated");
    yield put(updateMusicSuccess(response.data));
  } catch (error: any) {
    errorMsg(error?.response?.data?.message);
    if (error?.response?.data?.message === "Expired/Invalid Token") {
      handleLogout();
    }
    yield put(updateMusicFailure(error?.response?.data?.message));
  }
}

// Root Music Saga
export default function* musicSaga() {
  yield takeLatest(fetchMusicsRequest.type, fetchMusicsSaga);
  yield takeLatest(createMusicRequest.type, createMusicSaga);
  yield takeLatest(updateMusicRequest.type, updateMusicSaga);
}
