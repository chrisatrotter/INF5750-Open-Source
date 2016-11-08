//@flow
import type { Action } from '../actions';

export type Fetching = {
  countries: Array<String>
}

const initialFetching = { countries: [] };

function fetching(state: Fetching = initialFetching, action: Action): Fetching {
  if (action.type === 'COUNTRY_FETCH_SUCCEEDED') {
    return {
      ...state,
      countries: action.countries,
    }
  }
  return state;
}

export default fetching;
