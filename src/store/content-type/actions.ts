import { createAction } from 'typesafe-actions';
import { ContentType } from '../../types';
import { SET_CONTENT_TYPE, TOGGLE_CONTENT_TYPE } from './constants';

export const set = createAction(SET_CONTENT_TYPE, resolve => {
  return (contentType: ContentType) => resolve(contentType);
});

export const toggle = createAction(TOGGLE_CONTENT_TYPE, resolve => {
  return () => resolve();
});