//*flow
import type { Action } from './action' 

export type Countries = {
  fetching: boolean,
  fetched: boolean,
  countries: any,
}

const initialCountries = {
  fetching: false,
  fetched: false,
  countries: [],
}

function fetchCountries(state: Countries = initialCountries, action: Action): Countries {
  if (action.type === "FETCH_COUNTRIES") {
    return {...state, fetching: true}
  }
  if (action.type === "FETCH_COUNTRIES_REJECTED") {
    return {...state, fetching: false, error: action.payload}
  }
  if (action.type === "FETCH_COUNTRIES_FULFILLED") {
    return {
      ...state,
      fetching: false,
      fetched: true,
      countries: action.payload,
    }
  }
  return state;
}

export default fetchCountries;
