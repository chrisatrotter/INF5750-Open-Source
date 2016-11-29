//@flow
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { fetchCountries, fetchIndicator, fetchMetaData, fetchYear } from './fetching'
import { postCountriesAsOrgUnits, postMetaData } from './posting'

import type { Action } from '../actions'

// worker Saga: will be fired on COUNTRY_FETCH_REQUESTED actions
function* saveCountrySaga(action: Action) {
   try {
      const countries = yield call(fetchCountries)
      yield put({type: "COUNTRY_FETCH_SUCCEEDED", countries: countries})
   } catch (e) {
      yield put({type: "COUNTRY_FETCH_FAILED", message: e.message})
   }
}

function* postCountriesSaga(action: Action) {
  try {
    if (action.countries) {
      const response = yield call(postCountriesAsOrgUnits, action.countries)
      yield put({type: "POST_COUNTRIES_SUCCEEDED", response: response})
    }
  } catch (e) {
     yield put({type: "POST_COUNTRIES_FAILED", message: e.message})
  }
}

function* saveMetaDataSaga(action: Action) {
  try {
    if (action.countryCode && action.surveyYears) {
      const variables = yield call(fetchMetaData, action.countryCode, action.surveyYears)
      yield put({type: "META_DATA_FETCH_SUCCEEDED", variables: variables})
    }
  } catch (e) {
    yield put({type: "META_DATA_FETCH_FAILED", message: e.message})
  }
}

function* importDataSaga(action: Action) {
  try {
    if (action.dataElements && action.importData) {
      const response = yield call(postMetaData, action.dataElements, action.importData) 
      yield put({type: "DATA_IMPORT_SUCCEEDED", response: response})
    }
  } catch (e) {
     yield put({type: "DATA_IMPORT_FAILED", message: e.message})
  }
}

function* saveYearSaga(action: Action) {
   try {
      if (action.countryCode) {
        const years = yield call(fetchYear, action.countryCode)
        yield put({type: "YEAR_FETCH_SUCCEEDED", years: years})
      }
   } catch (e) {
      yield put({type: "YEAR_FETCH_FAILED", message: e.message})
   }
}

function* saveIndicatorSaga(action: Action) {
  try {
     const indicators = yield call(fetchIndicator)
     yield put({type: "INDICATOR_FETCH_SUCCEEDED", indicators: indicators})
  } catch (e) {
     yield put({type: "INDICATOR_FETCH_FAILED", message: e.message})
  }
}

/*
watcher saga will spawn a new fetchCountries task for every COUNTRY_FETCH_REQUESTED
*/
function* watchIndicator(): Generator<*,*,*> {
  yield* takeEvery("INDICATOR_FETCH_REQUESTED", saveIndicatorSaga)
}

function* watchCountries(): Generator<*,*,*> {
  yield* takeEvery("COUNTRY_FETCH_REQUESTED", saveCountrySaga)
}

function* watchDataImport(): Generator<*,*,*> {
  yield* takeEvery("DATA_IMPORT_REQUESTED", importDataSaga)
}

function* watchPostCountries(): Generator<*,*,*> {
  yield* takeEvery("POST_COUNTRIES_REQUESTED", postCountriesSaga)
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
    watchIndicator(),
    watchMetaData(),
    watchYear(),
    watchPostCountries(),
    watchDataImport(),
  ]
}
