//@flow

import type {
  Country,
  DataElements,
  Indicator,
  ImportData,
  OrgUnit,
  PageName,
  SubCategory,
} from './types'


export type Action =  { type: 'PAGE_REQUESTED', name: PageName, stepIndex: number }
                    | { type: 'NEXT_STEP_REQUESTED', stepIndex: number, stepTitle?: string }
                    | { type: 'PREVIOUS_STEP_REQUESTED', stepIndex: number }
                    | { type: 'INITAL_PAGE_REQUESTED' }
                    | { type: 'SURVEY_PAGE_REQUESTED', stepIndex: number}
                    | { type: 'COUNTRY_FETCH_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_FAILED', message: string }
                    | { type: 'COUNTRY_FETCH_SUCCEEDED', countries: Array<Country> }
                    | { type: 'INDICATOR_FETCH_REQUESTED' }
                    | { type: 'INDICATOR_FETCH_FAILED', message: string }
                    | { type: 'INDICATOR_FETCH_SUCCEEDED', indicators: Array<Indicator> }
                    | { type: 'META_DATA_FETCH_REQUESTED', countryCode: string, surveyYears: string }
                    | { type: 'META_DATA_FETCH_FAILED', message: string}
                    | { type: 'META_DATA_FETCH_SUCCEEDED', variables: Array<Object>}
                    | { type: 'YEAR_FETCH_REQUESTED', countryCode: string }
                    | { type: 'YEAR_FETCH_FAILED', message: string }
                    | { type: 'YEAR_FETCH_SUCCEEDED', years: Array<number> }
                    | { type: 'COUNTRY_SELECTED', countryName: string, countryCode: string }
                    | { type: 'CATEGORY_SELECTED', dataCategory: string, subCategory: Array<SubCategory> }
                    | { type: 'DATA_SELECTED', dataId: number }
                    | { type: 'DATA_DESELECTED', dataId: number }
                    | { type: 'YEAR_SELECTED', year: number }
                    | { type: 'POST_COUNTRIES_REQUESTED', countries: OrgUnit}
                    | { type: 'POST_COUNTRIES_SUCCEEDED', response: Object }
                    | { type: 'POST_COUNTRIES_FAILED', message: string }
                    | { type: 'DATA_IMPORT_REQUESTED', dataElements: DataElements, importData: ImportData }
                    | { type: 'DATA_IMPORT_SUCCEEDED', response: Object }
                    | { type: 'DATA_IMPORT_FAILED', message: string }
