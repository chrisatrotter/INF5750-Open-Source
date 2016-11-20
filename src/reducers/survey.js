//@flow
import type { Action } from '../actions';

export type Survey = {
  countryName: string,
  countryCode: string,
  indicatorMap: ?Object,
  subCategory: any
}

const initialSurvey = { countryName: '', countryCode: '', indicatorMap: null, subCategory: null };

function survey(state: Survey = initialSurvey, action: Action): Survey {
  if (action.type === 'CATEGORY_SELECTED') {
    return {
      ...state,
      subCategory: action.subCategory
    }
  }
  if (action.type === 'INDICATOR_MAP_CREATED') {
    return {
      ...state,
      indicatorMap: action.indicatorMap
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
      countryName: action.stepIndex === 1 ? initialSurvey.countryName : state.countryName,
      countryCode: action.stepIndex === 1 ? initialSurvey.countryCode : state.countryCode,
      subCategory: action.stepIndex === 3 ? initialSurvey.subCategory : state.subCategory,
    };
  }

  return state
}

export default survey;
