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

// Fetch Musics Saga
function* fetchMusicsSaga(): Generator {
  try {
    const response: AxiosResponse<FetchMusicsResponse> = yield call(
      axios.get,
      "http://localhost:4000/api/v1/musics"
    );
    yield put(fetchMusicsSuccess(response.data.musics));
  } catch (error: any) {
    yield put(fetchMusicsFailure(error.message));
  }
}

// Create Music Saga
function* createMusicSaga(action: PayloadAction<Music>): Generator {
  try {
    // Convert payload to FormData inside the saga
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
    console.log(response.data)
    yield put(createMusicSuccess(response.data));
  } catch (error: any) {
    console.log(error.response.data);
    yield put(createMusicFailure(error.message));
  }
}

// Root Music Saga
export default function* musicSaga() {
  yield takeLatest(fetchMusicsRequest.type, fetchMusicsSaga);
  yield takeLatest(createMusicRequest.type, createMusicSaga);
}
