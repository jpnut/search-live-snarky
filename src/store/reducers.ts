import { combineReducers } from 'redux';
import contentTypeReducer, { initialState as contentTypeInitialState, State as ContentTypeState } from './content-type/reducer';
import directionReducer, { initialState as directionInitialState, State as DirectionState } from './direction/reducer';
import fileTypeReducer, { initialState as fileTypeInitialState, State as FileTypeState } from './file-type/reducer';
import tagsReducer, { initialState as tagsInitialState, State as TagsState } from './tags/reducer';
import themeReducer, { initialState as themeInitialState, State as ThemeState } from './theme/reducer';

export interface State {
  content_type: ContentTypeState;
  direction: DirectionState;
  file_type: FileTypeState;
  tags: TagsState;
  theme: ThemeState;
}

export default combineReducers({
  content_type: contentTypeReducer,
  direction: directionReducer,
  file_type: fileTypeReducer,
  tags: tagsReducer,
  theme: themeReducer,
});

export const initialState = {
  content_type: contentTypeInitialState,
  direction: directionInitialState,
  file_type: fileTypeInitialState,
  tags: tagsInitialState,
  theme: themeInitialState,
};