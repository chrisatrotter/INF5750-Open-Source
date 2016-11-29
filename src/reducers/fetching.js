//@flow
import type { Action } from '../actions'
import type { Country, Indicator } from '../types'

export type Fetching = {
  countries: Array<Country>,
  variables: ?Array<Object>,
  years: ?Array<number>,
  indicators: Array<Indicator>,
  importResponse: ?Object,
}

const initialFetching = {
  countries: [],
  variables: null,
  years: null,
  indicators: [],
  importResponse: null,
 }

function fetching(state: Fetching = initialFetching, action: Action): Fetching {
  switch (action.type) {
    case 'RECEIPT_CONFIRMED':
      return {
        ...state,
        importResponse: initialFetching.importResponse
      }
    
    case 'DATA_IMPORT_SUCCEEDED':
      return {
        ...state,
        importResponse: action.response
      }
    case 'COUNTRY_FETCH_SUCCEEDED':
      return {
        ...state,
        countries: action.countries,
      }

    case 'META_DATA_FETCH_SUCCEEDED':
      return {
        ...state,
        variables: action.variables,
      }

    case 'YEAR_FETCH_SUCCEEDED':
      return {
        ...state,
        years: action.years,
      }

    case 'INDICATOR_FETCH_SUCCEEDED':
      return {
        ...state,
        indicators: action.indicators,
      }

    case 'PREVIOUS_PAGE_REQUESTED':
      return {
        ...state,
        years: action.stepIndex === 1 ? initialFetching.years : state.years,
        variables: action.stepIndex === 2 ? initialFetching.variables : state.variables
      }
    default:
      return state
  }
}


export default fetching
