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
  switch (action.type) {
    case 'YEAR_SELECTED':
      return {
        ...state,
        year: action.year
      };

    case 'DATA_SELECTED':
      return {
        ...state,
        data: [...state.data, action.dataId]
      };

    case 'DATA_DESELECTED':
      const {dataId} = action
      return {
        ...state,
        data: state.data.filter(value => value !== dataId)
      };

    case 'CATEGORY_SELECTED':
      return {
        ...state,
        dataCategory: action.dataCategory,
        subCategory: action.subCategory
      };

    case 'INDICATOR_MAP_CREATED':
      return {
        ...state,
        indicatorMap: action.indicatorMap
      };

    case 'COUNTRY_SELECTED':
      return {
        ...state,
        countryName: action.countryName,
        countryCode: action.countryCode
      };

    case 'PREVIOUS_PAGE_REQUESTED':
      return {
        ...state,
        countryName: action.stepIndex === 1 ? initialSurvey.countryName : state.countryName,
        countryCode: action.stepIndex === 1 ? initialSurvey.countryCode : state.countryCode,
        subCategory: action.stepIndex === 3 ? initialSurvey.subCategory : state.subCategory,
        data: action.stepIndex === 3 ? initialSurvey.data : state.data,
        year: action.stepIndex === 2 ? initialSurvey.year : state.year,
      };
    default:
      return state;
  }
}

export default survey;
