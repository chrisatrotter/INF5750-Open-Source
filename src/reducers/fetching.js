//@flow
import type { Action } from '../actions';

export type Fetching = {
  countries: Array<String>,
  variables: Array<String>,
  years: any
}

const initialFetching = { countries: [], variables: [], years: [] };

function fetching(state: Fetching = initialFetching, action: Action): Fetching {
  if (action.type === 'COUNTRY_FETCH_SUCCEEDED') {
    return {
      ...state,
      countries: action.countries,
    }
  }
  if (action.type === 'META_DATA_FETCH_SUCCEEDED') {
    return {
      ...state,
      variables: action.variables,
    }
  }
  if (action.type === 'YEAR_FETCH_SUCCEEDED') {
    return {
      ...state,
      years: action.years,
    }
  }
  return state;
}

export default fetching;
