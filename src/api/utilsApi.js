import api from './apiService';

class Utils {
  static pspProcesses(user) {
    return api.get('/psp_processes');
  }
  static nameQuery(entityName,entityId) {
    if(entityName === 'project') {
      return api.get(`/course_project_instances/${entityId}`);
    } else if(entityName === 'student') {
      return api.get(`/users/${entityId}`);
    }
  }
}

export default Utils;
