//@flow
import type { Action } from '../actions';
import type { SubCategory } from '../types';

export type Survey = {
  countryName: string,
  countryCode: string,
  indicatorMap: ?Object,
  dataCategory: string,
  subCategory: ?Array<SubCategory>,
  data: Array<number>,
  year: ?number
}

const initialSurvey = {
  countryName: '',
  countryCode: '',
  indicatorMap: null,
  dataCategory: '',
  subCategory: null,
  data: [],
  year: null
};

function survey(state: Survey = initialSurvey, action: Action): Survey {

  if (action.type === 'YEAR_SELECTED') {
    return {
      ...state,
      year: action.year
    }
  }

  if (action.type === 'DATA_SELECTED') {
    return {
      ...state,
      data: [...state.data, action.dataId]
    }
  }

  if (action.type === 'DATA_DESELECTED') {
    const {dataId} = action
    return {
      ...state,
      data: state.data.filter(value => value !== dataId)
    }
  }

  if (action.type === 'CATEGORY_SELECTED') {
    return {
      ...state,
      dataCategory: action.dataCategory,
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
      data: action.stepIndex === 3 ? initialSurvey.data : state.data,
      year: action.stepIndex === 2 ? initialSurvey.year : state.year,
    };
  }

  return state
}

export default survey;
