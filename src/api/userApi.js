import api from './apiService';

class Student {
  static updateUser(user) {
    return api.put('/user', user);
  }
  static getUser(userId) {
    return api.get(`/users/${userId}`);
  }
}

export default Student;
