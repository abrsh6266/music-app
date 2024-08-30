import { all } from 'redux-saga/effects';
import musicSaga from '../features/music/musicSaga';

export default function* rootSaga() {
  yield all([musicSaga()]);
}
