//@flow
import type { Action } from '../actions';

export type Stepper = {
  stepIndex: number,
  stepTitle: string,
}

const initialStepper = { stepIndex: 0, stepTitle: '' };

function stepper(state: Stepper = initialStepper, action: Action): Stepper {
  if (action.type === 'NEXT_STEP_REQUESTED') {
    return {
      ...state,
      stepIndex: action.stepIndex + 1,
    };
  }

  if (action.type === 'PREVIOUS_STEP_REQUESTED') {
    return {
      ...state,
      stepIndex: action.stepIndex - 1,
    }
  }

  if (action.type === 'INITIAL_STEP_REQUESTED') {
    return initialStepper;
  }

  return state;
}

export default stepper;
