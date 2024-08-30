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
      "/api/music"
    );
    yield put(fetchMusicsSuccess(response.data.musics));
  } catch (error: any) {
    yield put(fetchMusicsFailure(error.message));
  }
}

// Create Music Saga
function* createMusicSaga(action: PayloadAction<Music>): Generator {
  try {
    const response: AxiosResponse<Music> = yield call(
      axios.post,
      "/api/music",
      action.payload
    );
    yield put(createMusicSuccess(response.data));
  } catch (error: any) {
    yield put(createMusicFailure(error.message));
  }
}

// Root Music Saga
export default function* musicSaga() {
  yield takeLatest(fetchMusicsRequest.type, fetchMusicsSaga);
  yield takeLatest(createMusicRequest.type, createMusicSaga);
}
