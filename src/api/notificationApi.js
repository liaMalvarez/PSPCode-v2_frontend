import api from './apiService';

class Notification {
  static fetch_general(limit) {
    return api.get('/event_notifications?limit=' + limit);
  }
  static fetch_general_older(limit,page) {
    return api.get('/event_notifications?limit=' + limit +'&page=' + page);
  }
  static fetch_message(limit) {
    return api.get('/message_notifications?limit=' + limit);
  }
  static fetch_message_older(limit,page) {
    return api.get('/message_notifications?limit=' + limit +'&page=' + page);
  }
  static last_seen_event_notification(role) {
    if (role === 'professor') {
      return api.put('/professor',{last_seen_event_notification: new Date()})
    } else {
      return api.put('/user',{last_seen_event_notification: new Date()})
    }
  }
  static last_seen_message_notification(role) {
    if (role === 'professor') {
      return api.put('/professor',{last_seen_message_notification: new Date()})
    } else {
      return api.put('/user',{last_seen_message_notification: new Date()})
    }
  }
}

export default Notification;
