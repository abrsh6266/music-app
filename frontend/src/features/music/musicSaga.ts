import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchMusicsFailure,
  createMusicSuccess,
  createMusicFailure,
  createMusicRequest,
} from "./musicSlice";
import { AxiosResponse } from "axios";
import { FetchMusicsResponse, Music } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import successMsg from "../../components/Alerts/SuccessMsg";
import errorMsg from "../../components/Alerts/ErrorMsg";
import { clearUserDataFromLocalStorage } from "../../utils/localStorage";

const handleLogout = () => {
  clearUserDataFromLocalStorage();
  window.location.reload();
};

// Fetch Musics Saga
function* fetchMusicsSaga(
  action: PayloadAction<{ search?: string }>
): Generator {
  try {
    // Get search query from action payload
    const { search } = action.payload;

    // Define query params
    const params = { search };

    const response: AxiosResponse<FetchMusicsResponse> = yield call(
      axios.get,
      "http://localhost:4000/api/v1/musics",
      { params } // Pass search query in params
    );

    yield put(fetchMusicsSuccess(response.data.musics));
  } catch (error: any) {
    errorMsg(error.message);
    yield put(fetchMusicsFailure(error.message));
  }
}

// Create Music Saga
function* createMusicSaga(action: PayloadAction<Music>): Generator {
  try {
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
      formData
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

// Root Music Saga
export default function* musicSaga() {
  yield takeLatest(fetchMusicsRequest.type, fetchMusicsSaga);
  yield takeLatest(createMusicRequest.type, createMusicSaga);
}
