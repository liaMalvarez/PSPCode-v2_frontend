import userApi from '../api/userApi';

// Fetch Notifications
export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';
export const USER_FETCH_RESET = 'USER_FETCH_MESSAGES_RESET';

// Fetch Older Notifications
export const USER_LIST_FETCH = 'USER_LIST_FETCH';
export const USER_LIST_FETCH_SUCCESS = 'USER_LIST_FETCH_SUCCESS';
export const USER_LIST_FETCH_FAILURE = 'USER_LIST_FETCH_FAILURE';
export const USER_LIST_FETCH_RESET = 'USER_LIST_FETCH_MESSAGES_RESET';

// Mark as Seen
export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';
export const USER_UPDATE_RESET = 'USER_UPDATE_RESET';

export function fetchUserDetails(id) {
  return {
    type: USER_FETCH,
    payload: new Promise((resolve, reject) => {
      userApi.getUser(id).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong fetching user');
      });
    }),
  };
}
export function fetchUserDetailsSuccess(user) {
  return {
    type: USER_FETCH_SUCCESS,
    payload: user
  };
}

export function fetchUserDetailsFailure(error) {
  return {
    type: USER_FETCH_FAILURE,
    payload: error
  };
}

export function fetchUserDetailsReset() {
  return {
    type: USER_FETCH_RESET,
    payload: null
  };
}

export function fetchUserList() {
  return {
    type: USER_LIST_FETCH,
    payload: new Promise((resolve, reject) => {
      userApi.getUser('').then((summary) => {
        resolve(summary);
      }).catch(() => {
        console.log('Something went wrong fetching projects');
      });
    }),
  };
}

export function fetchUserListSuccess(notifications) {
  return {
    type: USER_LIST_FETCH_SUCCESS,
    payload: notifications
  };
}

export function fetchUserListFailure(error) {
  return {
    type: USER_LIST_FETCH_FAILURE,
    payload: error
  };
}

export function fetchUserListReset() {
  return {
    type: USER_LIST_FETCH_RESET,
    payload: null
  };
}

export function updateUser(user) {
  return {
    type: USER_UPDATE,
    payload: new Promise((resolve, reject) => {
      userApi.updateUser(user).then((data) => {
        resolve(data);
      }).catch((x) => {
        reject({ error: true, msg: 'Something went wrong doing the update', data: x });
      });
    }),
  };
}

export function updateUserSuccess(user) {
  return {
    type: USER_UPDATE_SUCCESS,
    payload: user
  };
}

export function updateUserFailure(error) {
  return {
    type: USER_UPDATE_FAILURE,
    payload: error
  };
}

export function updateUserReset() {
  return {
    type: USER_UPDATE_RESET,
    payload: null
  };
}
