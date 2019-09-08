import { ActionType, getType } from 'typesafe-actions';
import { ContentType } from '../../types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface State {
  contentType: ContentType;
}

export const initialState: State = {
  contentType: "tracks",
};

const toggle = (contentType: ContentType): ContentType => contentType === "artists" ? "tracks" : "artists";

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.set): {
      return {
        contentType: action.payload,
      };
    }

    case getType(actions.toggle): {
      return {
        contentType: toggle(state.contentType),
      };
    }

    default:
      return state;
  }
}