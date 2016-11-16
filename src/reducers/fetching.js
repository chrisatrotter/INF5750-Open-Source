//@flow
import type { Action } from '../actions';

export type Fetching = {
  countries: Array<String>,
  variables: Array<String>,
  selectedYears: any, //can not set it to Array<number>
  addSelectedYear: Array<number>,
  removeSelectedYear: Array<number>,
  count: number,
}

const initialFetching = { countries: [], variables: [], selectedYears: [], count: 0, addSelectedYear: [], removeSelectedYear: [] };

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

  if (action.type === 'ADD_YEAR') {
    return {
      ...state,
      selectedYears: [...state.selectedYears, action.addSelectedYear],
    }
  }

  if (action.type === 'REMOVE_YEAR') {
    const {removeSelectedYear} = action;
    return {
      ...state,
      selectedYears: state.selectedYears.filter(year => year !== removeSelectedYear)
    }
  }

  if (action.type === 'INCREASE_COUNT') {
    return {
      ...state,
      count: action.count + 1
    }
  }

  if (action.type === 'DECREASE_COUNT') {
    return {
      ...state,
      count: action.count - 1
    }

  }
  return state;
}

export default fetching;
