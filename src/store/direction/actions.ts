import { createAction } from 'typesafe-actions';
import { Direction } from '../../types';
import { SET_DIRECTION, TOGGLE_DIRECTION } from './constants';

export const set = createAction(SET_DIRECTION, resolve => {
  return (direction: Direction) => resolve(direction);
});

export const toggle = createAction(TOGGLE_DIRECTION, resolve => {
  return () => resolve();
});