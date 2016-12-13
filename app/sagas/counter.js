import { delay, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { actions, types } from '../redux/counter'

function* incrementAsync(action) {
  yield call(delay, 1000, null)
  yield put(actions.increment(action.payload))
}

export function* incrementAsyncSaga() { // eslint-disable-line
  yield* takeLatest(types.INCREMENT_ASYNC, incrementAsync)
}
