//@flow
import type { Action } from '../actions';

export type Survey = {
  countryName: string,
  countryCode: string,
  years: Array<number>
}

const initialSurvey = { countryName: '', countryCode: '', years: [] };

function survey(state: Survey = initialSurvey, action: Action): Survey {
  if (action.type === 'YEAR_SELECTED') {
    return {
      ...state,
      years: [...state.years, action.year]
    }
  }
  if (action.type === 'YEAR_DESELECTED') {
    const {year} = action;
    return {
      ...state,
      years: state.years.filter(storedYear => storedYear !== year)
    }
  }
  if (action.type === 'COUNTRY_SELECTED') {
    return {
      ...state,
      countryName: action.countryName,
      countryCode: action.countryCode
    }
  }
  if (action.type === 'PREVIOUS_PAGE_REQUESTED') {
    return {
      ...state,
      years: initialSurvey.years
    };
  }

  return state
}

export default survey;
