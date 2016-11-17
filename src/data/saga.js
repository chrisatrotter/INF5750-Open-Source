//@flow
import { takeEvery, take } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { fetchCountries, fetchMetaData, fetchYear } from './fetching'

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

function* saveMetaDataSaga(action: Action) {
  try {
    const variables = yield call(fetchMetaData);
    yield put({type: "META_DATA_FETCH_SUCCEEDED", variables: variables});
  } catch (e) {
    yield put({type: "META_DATA_FETCH_FAILED", message: e.message});
  }
}

function* saveYearSaga(action: Action) {
   try {
      const years = yield call(fetchYear, action.countryCode);
      yield put({type: "YEAR_FETCH_SUCCEEDED", years: years});
   } catch (e) {
      yield put({type: "YEAR_FETCH_FAILED", message: e.message});
   }
}

/*
watcher saga will spawn a new fetchCountries task for every COUNTRY_FETCH_REQUESTED
*/
function* watchCountries(): Generator<*,*,*> {
  yield* takeEvery("COUNTRY_FETCH_REQUESTED", saveCountrySaga)
}

function* watchMetaData(): Generator<*,*,*> {
  yield* takeEvery("META_DATA_FETCH_REQUESTED", saveMetaDataSaga)
}

function* watchYear(): Generator<*,*,*> {
  yield* takeEvery("YEAR_FETCH_REQUESTED", saveYearSaga)
}

export function* rootSaga(): Generator<*,*,*> {
  yield [
    watchCountries(),
    watchMetaData(),
    watchYear(),
  ]
}
