//@flow

export type Action =  { type: 'NEXT_STEP_REQUESTED', stepIndex: number, stepTitle?: string }
                    | { type: 'PREVIOUS_STEP_REQUESTED', stepIndex: number, stepTitle: string }
                    | { type: 'INITAL_PAGE_REQUESTED' }
