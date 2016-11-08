//@flow
import type { Action } from '../actions';

export type Routing = {
  stepIndex: number,
  stepTitle: string,
}

const initialRouting = { stepIndex: 0, stepTitle: '' };

function routing(state: Routing = initialRouting, action: Action): Routing {
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
    return initialRouting;
  }

  return state;
}

export default routing;
