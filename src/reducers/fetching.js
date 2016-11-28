//@flow
import type { Action } from '../actions';
import type { Country, Indicator } from '../types'

export type Fetching = {
  countries: Array<Country>,
  variables: ?Array<Object>,
  years: ?Array<number>,
  indicators: Array<Indicator>
}

const initialFetching = {
  countries: [],
  variables: null,
  years: null,
  indicators: []
 };

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

  if (action.type === 'PREVIOUS_PAGE_REQUESTED') {
    return {
      ...state,
      years: action.stepIndex === 1 ? initialFetching.years : state.years,
      variables: action.stepIndex === 2 ? initialFetching.variables : state.variables
    };
  }

  return state;
}

export default fetching;
