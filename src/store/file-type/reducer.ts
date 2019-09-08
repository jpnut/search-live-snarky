import { ActionType, getType } from 'typesafe-actions';
import { FileType } from '../../types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface State {
  fileType: FileType;
}

export const initialState: State = {
  fileType: "flac",
};

const toggle = (fileType: FileType): FileType => fileType === "flac" ? "mp3" : "flac";

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.set): {
      return {
        fileType: action.payload,
      };
    }

    case getType(actions.toggle): {
      return {
        fileType: toggle(state.fileType),
      };
    }

    default:
      return state;
  }
}