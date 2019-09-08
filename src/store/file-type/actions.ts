import { createAction } from 'typesafe-actions';
import { FileType } from '../../types';
import { SET_FILE_TYPE, TOGGLE_FILE_TYPE } from './constants';

export const set = createAction(SET_FILE_TYPE, resolve => {
  return (fileType: FileType) => resolve(fileType);
});

export const toggle = createAction(TOGGLE_FILE_TYPE, resolve => {
  return () => resolve();
});