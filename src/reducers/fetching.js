//@flow
import type { Action } from '../actions';

export type Fetching = {
  countries: Array<String>,
  years: any
}

const initialFetching = { countries: [], years: [] };

function fetching(state: Fetching = initialFetching, action: Action): Fetching {
  if (action.type === 'COUNTRY_FETCH_SUCCEEDED') {
    return {
      ...state,
      countries: action.countries,
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
