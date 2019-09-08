import { createAction } from 'typesafe-actions';
import { Theme } from '../../types';
import { SET_THEME, TOGGLE_THEME } from './constants';

export const set = createAction(SET_THEME, resolve => {
  return (theme: Theme) => resolve(theme);
});

export const toggle = createAction(TOGGLE_THEME, resolve => {
  return () => resolve();
});