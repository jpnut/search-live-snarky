import { createAction } from 'typesafe-actions';
import { Tag } from '../../types';
import { ADD_TAG, REMOVE_TAG, RESET_TAGS } from './constants';

export const add = createAction(ADD_TAG, resolve => {
  return (tag: Tag) => resolve(tag);
});

export const remove = createAction(REMOVE_TAG, resolve => {
  return (tag: Tag) => resolve(tag);
});

export const reset = createAction(RESET_TAGS, resolve => {
  return () => resolve();
});