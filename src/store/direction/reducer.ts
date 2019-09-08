import { ActionType, getType } from 'typesafe-actions';
import { Direction } from '../../types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface State {
  direction: Direction;
}

export const initialState: State = {
  direction: "desc",
};

const toggle = (direction: Direction): Direction => direction === "asc" ? "desc" : "asc";

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.set): {
      return {
        direction: action.payload,
      };
    }

    case getType(actions.toggle): {
      return {
        direction: toggle(state.direction),
      };
    }

    default:
      return state;
  }
}