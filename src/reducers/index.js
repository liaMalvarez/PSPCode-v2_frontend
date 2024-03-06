import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { sessionReducer } from 'redux-react-session';
import projectReducers from './projectReducers';
import notificationReducers from './notificationReducers';
import userReducers from './userReducers';
import dashboardReducers from './dashboardReducers';
import utilsReducers from './utilsReducers';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  session: sessionReducer,
  projects: projectReducers,
  notifications: notificationReducers,
  users: userReducers,
  dashboard: dashboardReducers,
  utils: utilsReducers,
});

export default (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
