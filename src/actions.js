//@flow

import type { Country } from './components/pages/CountryStep'

export type Action =  { type: 'PAGE_REQUESTED', name: PageName, stepIndex: number }
                    | { type: 'NEXT_STEP_REQUESTED', stepIndex: number, stepTitle?: string }
                    | { type: 'PREVIOUS_STEP_REQUESTED', stepIndex: number }
                    | { type: 'INITAL_PAGE_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_FAILED', message: string }
                    | { type: 'COUNTRY_FETCH_SUCCEEDED', countries: Array<Country> }
                    | { type: 'META_DATA_FETCH_REQUESTED' }
                    | { type: 'META_DATA_FETCH_FAILED', message: string}
                    | { type: 'META_DATA_FETCH_SUCCEEDED', variables: Array<String>}
                    | { type: 'YEAR_FETCH_REQUESTED', countryCode: string }
                    | { type: 'YEAR_FETCH_FAILED', message: string }
                    | { type: 'YEAR_FETCH_SUCCEEDED', years: number }
                    | { type: 'YEAR_SELECTED', year: number }
                    | { type: 'YEAR_DESELECTED', year: number }
                    | { type: 'COUNTRY_SELECTED', countryName: string, countryCode: string }

export type PageName = 'SelectCountry'
                     | 'SelectSurveys'
                     | 'SelectData'
;
