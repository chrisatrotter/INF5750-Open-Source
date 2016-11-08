//@flow
import type { Action } from '../actions';
import { last } from 'lodash';

export type Routing = {
  pageStack: string[],
  stepIndex: number,
}

const initialRouting = { pageStack: ['SelectCountry'], stepIndex: 0 };

function routing(state: Routing = initialRouting, action: Action): Routing {
  if (action.type === 'PAGE_REQUESTED') {
    return {
      ...state,
      pageStack: (action.name !== last(state.pageStack)) ? [...state.pageStack, action.name] : state.pageStack,
      stepIndex: action.stepIndex + 1,
    };
  }

  if (action.type === 'PREVIOUS_PAGE_REQUESTED') {
    return {
      ...state,
      pageStack: state.pageStack.slice(0, state.pageStack.length - 1),
      stepIndex: action.stepIndex - 1,
    };
  }

  if (action.type === 'INITIAL_PAGE_REQUESTED') {
    return initialRouting;
  }

  return state;
}

export default routing;
