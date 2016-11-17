//@flow
import type { Action } from '../actions';
import type { Country } from '../components/pages/CountryStep'
import type { Indicator } from '../actions'

export type Fetching = {
  countries: Array<Country>,
  variables: Array<String>,
  years: Array<number>,
  indicators: Array<Indicator>
}

const initialFetching = { countries: [], variables: [], years: [], indicators: [] };

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

  if (action.type === 'INDICATOR_FETCH_SUCCEEDED') {
    return {
      ...state,
      indicators: action.indicators,
    }
  }

  return state;
}

export default fetching;
