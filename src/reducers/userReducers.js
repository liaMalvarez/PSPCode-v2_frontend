import {
  USER_FETCH_RESET, USER_UPDATE_FAILURE, USER_FETCH_FAILURE, USER_FETCH, USER_FETCH_SUCCESS, USER_UPDATE, USER_UPDATE_RESET, USER_UPDATE_SUCCESS,
  USER_LIST_FETCH, USER_LIST_FETCH_FAILURE, USER_LIST_FETCH_RESET, USER_LIST_FETCH_SUCCESS
} from '../actions/userActions';

const INITIAL_STATE = {
  list: { users: [], error: null, loading: false },
  active: { user: null, error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_FETCH:
      return { ...state, active: { user: null, error: null, loading: true } };
    case USER_FETCH_SUCCESS:
      return { ...state, active: { user: action.payload, error: null, loading: false } };
    case USER_FETCH_FAILURE:
      return { ...state, active: { user: null, error: action.payload, loading: false } };
    case USER_FETCH_RESET:
      return { ...state, active: { user: null, error: null, loading: false } };

    case USER_UPDATE:
      return { ...state, updated: false, error: false };
    case USER_UPDATE_SUCCESS:
      return {
        ...state, active: { user: action.payload, error: null, loading: false }, updated: true, error: false
      };
    case USER_UPDATE_FAILURE:
      return { ...state, updated: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { ...state, updated: false, error: false };

    case USER_LIST_FETCH:
      return { ...state, loading: true };
    case USER_LIST_FETCH_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case USER_LIST_FETCH_FAILURE:
      return { ...state, loading: false };
    case USER_LIST_FETCH_RESET:
      return { ...state, loading: false };

    default:
      return state;
  }
}
