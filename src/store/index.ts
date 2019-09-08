import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer, { State } from './reducers';

declare var window: any;

export default (initialState: State) => {
  initialState =
    merge(initialState, JSON.parse(window.localStorage.getItem('state')));

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware()
    )
  );

  store.subscribe(() => {
    const state = omit({ ...store.getState() }, "tags");

    window.localStorage.setItem('state', JSON.stringify(state));
  });

  return store;
};