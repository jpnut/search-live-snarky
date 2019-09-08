import { ActionType, getType } from 'typesafe-actions';
import { Theme } from '../../types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface State {
  theme: Theme;
}

export const initialState: State = {
  theme: "light",
};

const toggle = (theme: Theme): Theme => theme === "dark" ? "light" : "dark";

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.set): {
      return {
        theme: action.payload,
      };
    }

    case getType(actions.toggle): {
      return {
        theme: toggle(state.theme),
      };
    }

    default:
      return state;
  }
}