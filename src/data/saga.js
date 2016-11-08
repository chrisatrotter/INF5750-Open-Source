//@flow
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { fetchCountries } from './fetching'

import type { Action } from '../actions'

// worker Saga: will be fired on COUNTRY_FETCH_REQUESTED actions
function* saveCountrySaga(action: Action) {
   try {
      const countries = yield call(fetchCountries);
      yield put({type: "COUNTRY_FETCH_SUCCEEDED", countries: countries});
   } catch (e) {
      yield put({type: "COUNTRY_FETCH_FAILED", message: e.message});
   }
}

/*
watcher saga will spawn a new fetchCountries task for every COUNTRY_FETCH_REQUESTED
*/
export function* watchCountries(): Generator<*,*,*> {
  yield* takeEvery("COUNTRY_FETCH_REQUESTED", saveCountrySaga)
}
