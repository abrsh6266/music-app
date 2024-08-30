import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchMusicsRequest, fetchMusicsSuccess, fetchMusicsFailure } from './musicSlice';
import { AxiosResponse } from 'axios';
import { FetchMusicsResponse } from '../../utils';

function* fetchMusicsSaga(): Generator {
  try {
    const response: AxiosResponse<FetchMusicsResponse> = yield call(axios.get, '/api/music');
    yield put(fetchMusicsSuccess(response.data.musics));
  } catch (error: any) {
    yield put(fetchMusicsFailure(error.message));
  }
}

export default function* musicSaga() {
  yield takeLatest(fetchMusicsRequest.type, fetchMusicsSaga);
}
