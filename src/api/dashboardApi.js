import api from './apiService';

class Dashboard {
  static courses_list() {
    return api.get('/courses');
  }

  static dashboard_projects(courseId) {
    return api.get(`/courses/${courseId}/course_project_instances`);
  }

  static dashboard_students(courseId, projectId) {
    if (projectId) {
      return api.get(`/courses/${courseId}/course_project_instances/${projectId}/users`);
    }
    return api.get(`/courses/${courseId}/users`);
  }

  static assign_project(courseId, projectId, studentId) {
    return api.post(`/courses/${courseId}/course_project_instances/${projectId}/assigned_projects`, { user_id: studentId });
  }

  static approve_project(courseId, projectId, assignedProjectId, data) {
    const f = new FormData();
    if (data.file) f.append('message[file]', data.file);
    if (data.message) f.append('message[text]', data.message);
    return api.putFormData(`/courses/${courseId}/course_project_instances/${projectId}/assigned_projects/${assignedProjectId}/approve_project`, f);
  }

  static reject_project(courseId, projectId, assignedProjectId, data) {
    const f = new FormData();
    if (data.file) f.append('message[file]', data.file);
    if (data.message) f.append('message[text]', data.message);
    return api.putFormData(`/courses/${courseId}/course_project_instances/${projectId}/assigned_projects/${assignedProjectId}/reject_project`, f);
  }
}

export default Dashboard;
