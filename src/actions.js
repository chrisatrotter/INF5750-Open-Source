//@flow

export type Action =  { type: 'PAGE_REQUESTED', name: PageName, stepIndex: number }
                    | { type: 'NEXT_STEP_REQUESTED', stepIndex: number, stepTitle?: string }
                    | { type: 'PREVIOUS_STEP_REQUESTED', stepIndex: number, stepTitle: string }
                    | { type: 'INITAL_PAGE_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_REQUESTED' }
                    | { type: 'COUNTRY_FETCH_FAILED', message: string }
                    | { type: 'COUNTRY_FETCH_SUCCEEDED', countries: Array<String> }

export type PageName = 'SelectCountry'
                     | 'SelectSurveys'
                     | 'SelectData'
;
