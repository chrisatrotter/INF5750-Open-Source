//@flow

export type Action =  { type: 'PAGE_REQUESTED', name: PageName, stepIndex: number }
                    | { type: 'NEXT_STEP_REQUESTED', stepIndex: number, stepTitle?: string }
                    | { type: 'PREVIOUS_STEP_REQUESTED', stepIndex: number }
                    | { type: 'INITAL_PAGE_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_FAILED', message: string }
                    | { type: 'COUNTRY_FETCH_SUCCEEDED', countries: Array<String> }
                    | { type: 'META_DATA_FETCH_REQUESTED' }
                    | { type: 'META_DATA_FETCH_FAILED', message: string}
                    | { type: 'META_DATA_FETCH_SUCCEEDED', variables: Array<String>}
                    | { type: 'YEAR_FETCH_REQUESTED' }
                    | { type: 'YEAR_FETCH_FAILED', message: string }
                    | { type: 'YEAR_FETCH_SUCCEEDED', years: number }
                    | { type: 'SELECTED_YEARS', selectedYears: Array<number> }
                    | { type: 'ADD_YEAR', addSelectedYear: Array<number> }
                    | { type: 'REMOVE_YEAR', removeSelectedYear: Array<number> }
                    | { type: 'INCREASE_COUNT', count: number }
                    | { type: 'DECREASE_COUNT', count: number }

export type PageName = 'SelectCountry'
                     | 'SelectSurveys'
                     | 'SelectData'
;
