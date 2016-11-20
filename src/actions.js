//@flow

import type { Country } from './components/pages/CountryStep'

export type Indicator = {
  Level1: string,
  IndicatorId: string,
  Definition: string,
  Label: string,
  SDRID: number,
}

export type Action =  { type: 'PAGE_REQUESTED', name: PageName, stepIndex: number }
                    | { type: 'NEXT_STEP_REQUESTED', stepIndex: number, stepTitle?: string }
                    | { type: 'PREVIOUS_STEP_REQUESTED', stepIndex: number }
                    | { type: 'INITAL_PAGE_REQUESTED' }
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
                    | { type: 'YEAR_SELECTED', year: number }
                    | { type: 'YEAR_DESELECTED', year: number }
                    | { type: 'COUNTRY_SELECTED', countryName: string, countryCode: string }

export type PageName = 'SelectCountry'
                     | 'SelectSurveys'
                     | 'SelectData'
;
