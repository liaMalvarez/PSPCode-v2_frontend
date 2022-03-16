import notificationApi from "../api/notificationApi";


// Fetch Notifications
export const NOTIFICATION_FETCH = 'NOTIFICATION_FETCH';
export const NOTIFICATION_FETCH_SUCCESS = 'NOTIFICATION_FETCH_SUCCESS';
export const NOTIFICATION_FETCH_FAILURE = 'NOTIFICATION_FETCH_FAILURE';
export const NOTIFICATION_FETCH_RESET = 'NOTIFICATION_FETCH_MESSAGES_RESET';

// Fetch Older Notifications
export const NOTIFICATION_FETCH_OLDER = 'NOTIFICATION_FETCH_OLDER';
export const NOTIFICATION_FETCH_OLDER_SUCCESS = 'NOTIFICATION_FETCH_OLDER_SUCCESS';
export const NOTIFICATION_FETCH_OLDER_FAILURE = 'NOTIFICATION_FETCH_OLDER_FAILURE';
export const NOTIFICATION_FETCH_OLDER_RESET = 'NOTIFICATION_FETCH_OLDER_MESSAGES_RESET';

// Mark as Seen
export const NOTIFICATION_UPDATE = 'NOTIFICATION_UPDATE';
export const NOTIFICATION_UPDATE_SUCCESS = 'NOTIFICATION_UPDATE_SUCCESS';
export const NOTIFICATION_UPDATE_FAILURE = 'NOTIFICATION_UPDATE_FAILURE';
export const NOTIFICATION_UPDATE_RESET = 'NOTIFICATION_UPDATE_RESET';


// Fetch Notifications
export const NOTIMESSAGES_FETCH = 'NOTIMESSAGES_FETCH';
export const NOTIMESSAGES_FETCH_SUCCESS = 'NOTIMESSAGES_FETCH_SUCCESS';
export const NOTIMESSAGES_FETCH_FAILURE = 'NOTIMESSAGES_FETCH_FAILURE';
export const NOTIMESSAGES_FETCH_RESET = 'NOTIMESSAGES_FETCH_MESSAGES_RESET';

// Fetch Older Notifications
export const NOTIMESSAGES_FETCH_OLDER = 'NOTIMESSAGES_FETCH_OLDER';
export const NOTIMESSAGES_FETCH_OLDER_SUCCESS = 'NOTIMESSAGES_FETCH_OLDER_SUCCESS';
export const NOTIMESSAGES_FETCH_OLDER_FAILURE = 'NOTIMESSAGES_FETCH_OLDER_FAILURE';
export const NOTIMESSAGES_FETCH_OLDER_RESET = 'NOTIMESSAGES_FETCH_OLDER_MESSAGES_RESET';

// Mark as Seen
export const NOTIMESSAGES_UPDATE = 'NOTIMESSAGES_UPDATE';
export const NOTIMESSAGES_UPDATE_SUCCESS = 'NOTIMESSAGES_UPDATE_SUCCESS';
export const NOTIMESSAGES_UPDATE_FAILURE = 'NOTIMESSAGES_UPDATE_FAILURE';
export const NOTIMESSAGES_UPDATE_RESET = 'NOTIMESSAGES_UPDATE_RESET';


export function fetchNotifications(limit) {
  return {
    type: NOTIFICATION_FETCH,
    payload: new Promise((resolve, reject) => {
      notificationApi.fetch_general(limit).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong fetching general notifications');
      })
    }),
  };
}

export function fetchNotificationsSuccess(notifications) {
  return {
    type: NOTIFICATION_FETCH_SUCCESS,
    payload: notifications
  };
}

export function fetchNotificationsFailure(error) {
  return {
    type: NOTIFICATION_FETCH_FAILURE,
    payload: error
  };
}


export function fetchNotificationsReset() {
  return {
    type: NOTIFICATION_FETCH_RESET,
    payload: null
  };
}

export function fetchOlderNotifications(limit,page) {
  return {
    type: NOTIFICATION_FETCH_OLDER,
    payload: new Promise((resolve, reject) => {
      notificationApi.fetch_general_older(limit,page).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong fetching older general notifications');
      })
    }),
  };
}

export function fetchOlderNotificationsSuccess(notifications) {
  return {
    type: NOTIFICATION_FETCH_OLDER_SUCCESS,
    payload: notifications
  };
}

export function fetchOlderNotificationsFailure(error) {
  return {
    type: NOTIFICATION_FETCH_OLDER_FAILURE,
    payload: error
  };
}


export function fetchOlderNotificationsReset() {
  return {
    type: NOTIFICATION_FETCH_OLDER_RESET,
    payload: null
  };
}


export function updateNotifications(role) {
  return {
    type: NOTIFICATION_UPDATE,
    payload: new Promise((resolve, reject) => {
      notificationApi.last_seen_event_notification(role).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong pinging general notifications');
      })
    }),
  };
}

export function updateNotificationsSuccess(data) {
  return {
    type: NOTIFICATION_UPDATE_SUCCESS,
    payload: data
  };
}

export function updateNotificationsFailure(error) {
  return {
    type: NOTIFICATION_UPDATE_FAILURE,
    payload: error
  };
}


export function updateNotificationsReset() {
  return {
    type: NOTIFICATION_UPDATE_RESET,
    payload: null
  };
}








export function fetchNotiMessages(limit) {
  return {
    type: NOTIMESSAGES_FETCH,
    payload: new Promise((resolve, reject) => {
      notificationApi.fetch_message(limit).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong fetching general notimessages');
      })
    }),
  };
}

export function fetchNotiMessagesSuccess(notimessages) {
  return {
    type: NOTIMESSAGES_FETCH_SUCCESS,
    payload: notimessages
  };
}

export function fetchNotiMessagesFailure(error) {
  return {
    type: NOTIMESSAGES_FETCH_FAILURE,
    payload: error
  };
}


export function fetchNotiMessagesReset() {
  return {
    type: NOTIMESSAGES_FETCH_RESET,
    payload: null
  };
}

export function fetchOlderNotiMessages(limit,page) {
  return {
    type: NOTIMESSAGES_FETCH_OLDER,
    payload: new Promise((resolve, reject) => {
      notificationApi.fetch_message_older(limit,page).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong fetching older general notimessages');
      })
    }),
  };
}

export function fetchOlderNotiMessagesSuccess(notimessages) {
  return {
    type: NOTIMESSAGES_FETCH_OLDER_SUCCESS,
    payload: notimessages
  };
}

export function fetchOlderNotiMessagesFailure(error) {
  return {
    type: NOTIMESSAGES_FETCH_OLDER_FAILURE,
    payload: error
  };
}


export function fetchOlderNotiMessagesReset() {
  return {
    type: NOTIMESSAGES_FETCH_OLDER_RESET,
    payload: null
  };
}


export function updateNotiMessages(role) {
  return {
    type: NOTIMESSAGES_UPDATE,
    payload: new Promise((resolve, reject) => {
      notificationApi.last_seen_message_notification(role).then((data) => {
        resolve(data);
      }).catch(() => {
        console.log('Something went wrong pinging general notimessages');
      })
    }),
  };
}

export function updateNotiMessagesSuccess(data) {
  return {
    type: NOTIMESSAGES_UPDATE_SUCCESS,
    payload: data
  };
}

export function updateNotiMessagesFailure(error) {
  return {
    type: NOTIMESSAGES_UPDATE_FAILURE,
    payload: error
  };
}


export function updateNotiMessagesReset() {
  return {
    type: NOTIMESSAGES_UPDATE_RESET,
    payload: null
  };
}
