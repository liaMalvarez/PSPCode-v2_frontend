// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Iterable } from 'immutable';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import { sessionService } from 'redux-react-session';
import _ from 'lodash';
import rootReducer from '../reducers';
import { routes } from '../constants/routesPaths';

export default function configureStore(initialState) {
  const middewares = [
    thunkMiddleware
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );

  sessionService.initSessionService(store, {redirectPath: `/session/login`, driver:'COOKIES'});

  return store;
}
