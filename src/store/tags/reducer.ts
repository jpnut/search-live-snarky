import { ActionType, getType } from 'typesafe-actions';
import { Tag } from '../../types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface State {
  tags: Tag[];
}

export const initialState: State = {
  tags: [],
};

const onlyUniqueTags = (tags: Tag[]) => {
  const seen = new Set();

  return tags.filter(tag => {
    const duplicate = seen.has(tag.value);
    seen.add(tag.value);
    return !duplicate;
  });
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.add): {
      return {
        tags: onlyUniqueTags(state.tags.concat(action.payload)),
      };
    }

    case getType(actions.remove): {
      return {
        tags: state.tags.filter(t => t.value !== action.payload.value),
      };
    }

    case getType(actions.reset): {
      return {
        tags: initialState.tags,
      };
    }

    default:
      return state;
  }
}