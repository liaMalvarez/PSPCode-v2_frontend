import { NOTIFICATION_FETCH_RESET, NOTIFICATION_UPDATE_FAILURE, NOTIFICATION_FETCH_FAILURE, NOTIFICATION_FETCH, NOTIFICATION_FETCH_SUCCESS, NOTIFICATION_UPDATE, NOTIFICATION_UPDATE_RESET, NOTIFICATION_UPDATE_SUCCESS,
NOTIFICATION_FETCH_OLDER, NOTIFICATION_FETCH_OLDER_FAILURE, NOTIFICATION_FETCH_OLDER_RESET, NOTIFICATION_FETCH_OLDER_SUCCESS,
  NOTIMESSAGES_FETCH_RESET, NOTIMESSAGES_UPDATE_FAILURE, NOTIMESSAGES_FETCH_FAILURE, NOTIMESSAGES_FETCH, NOTIMESSAGES_FETCH_SUCCESS, NOTIMESSAGES_UPDATE, NOTIMESSAGES_UPDATE_RESET, NOTIMESSAGES_UPDATE_SUCCESS,
  NOTIMESSAGES_FETCH_OLDER, NOTIMESSAGES_FETCH_OLDER_FAILURE, NOTIMESSAGES_FETCH_OLDER_RESET, NOTIMESSAGES_FETCH_OLDER_SUCCESS
} from '../actions/notificationActions';

const INITIAL_STATE = {
  general: {list: [], error: null, loading: false},
  messages: {list: [], error: null, loading: false},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTIFICATION_FETCH:
      return { ...state, general: {list: state.general.list, count: state.general.count, loading: true }};
    case NOTIFICATION_FETCH_SUCCESS:
      return { ...state, general: {list: action.payload.event_notifications, count: action.payload.not_seen_notfications, loading: false }};
    case NOTIFICATION_FETCH_FAILURE:
      return { ...state, general: {list: [], count: 0, loading: false }};
    case NOTIFICATION_FETCH_RESET:
      return { ...state, general: {list: [], count: 0, loading: false }};


    case NOTIFICATION_UPDATE:
      return { ...state };
    case NOTIFICATION_UPDATE_SUCCESS:
      return { ...state, general: { ...state.general, count: 0 } };
    case NOTIFICATION_UPDATE_FAILURE:
      return { ...state };
    case NOTIFICATION_UPDATE_RESET:
      return { ...state };


    case NOTIFICATION_FETCH_OLDER:
      return { ...state, general: {list: state.general.list, count: state.general.count, loading: true }};
    case NOTIFICATION_FETCH_OLDER_SUCCESS:
      let NOTIFICATION_FETCH_OLDER_SUCCESS_STATE = JSON.parse(JSON.stringify(state.general.list));
      NOTIFICATION_FETCH_OLDER_SUCCESS_STATE.push(...action.payload.event_notifications);
      return { ...state, general: {list: NOTIFICATION_FETCH_OLDER_SUCCESS_STATE, loading: false }};
    case NOTIFICATION_FETCH_OLDER_FAILURE:
      return { ...state, general: {list: state.general.list, count: state.general.count, loading: false }};
    case NOTIFICATION_FETCH_OLDER_RESET:
      return { ...state, general: {list: state.general.list, count: state.general.count, loading: false }};






    case NOTIMESSAGES_FETCH:
      return { ...state, messages: {list: state.messages.list, count: state.messages.count, loading: true }};
    case NOTIMESSAGES_FETCH_SUCCESS:
      return { ...state, messages: {list: action.payload.message_notifications, count: action.payload.not_seen_notfications, loading: false }};
    case NOTIMESSAGES_FETCH_FAILURE:
      return { ...state, messages: {list: [], count: 0, loading: false }};
    case NOTIMESSAGES_FETCH_RESET:
      return { ...state, messages: {list: [], count: 0, loading: false }};


    case NOTIMESSAGES_UPDATE:
      return { ...state };
    case NOTIMESSAGES_UPDATE_SUCCESS:
      return { ...state, messages: { ...state.messages, count: 0 } };
    case NOTIMESSAGES_UPDATE_FAILURE:
      return { ...state };
    case NOTIMESSAGES_UPDATE_RESET:
      return { ...state };


    case NOTIMESSAGES_FETCH_OLDER:
      return { ...state, messages: {list: state.messages.list, count: state.messages.count, loading: true }};
    case NOTIMESSAGES_FETCH_OLDER_SUCCESS:
      let NOTIMESSAGES_FETCH_OLDER_SUCCESS_STATE = JSON.parse(JSON.stringify(state.messages.list));
      NOTIMESSAGES_FETCH_OLDER_SUCCESS_STATE.push(...action.payload.message_notifications);
      return { ...state, messages: {list: NOTIMESSAGES_FETCH_OLDER_SUCCESS_STATE, loading: false }};
    case NOTIMESSAGES_FETCH_OLDER_FAILURE:
      return { ...state, messages: {list: state.messages.list, count: state.messages.count, loading: false }};
    case NOTIMESSAGES_FETCH_OLDER_RESET:
      return { ...state, messages: {list: state.messages.list, count: state.messages.count, loading: false }};


    default:
      return state;
  }
}
