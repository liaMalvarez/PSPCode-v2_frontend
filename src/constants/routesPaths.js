export default {
  index: '*',
  login: 'session/login',
  passwordForgot: 'session/password/forgot',
  passwordReset: 'session/password/reset',
  professorStudentsList: 'professor/dashboard/students',
  professorProjectsList: 'professor/dashboard/projects',
  professorProjectDetails: 'professor/dashboard/projects/:idproject',
  studentProjectsList: 'students/:idstudent/projects',
  studentProjectDetails: 'students/:idstudent/projects/:idproject',
  studentProjectDetailsTab: 'students/:idstudent/projects/:idproject/:tab',
  userDetails: 'users/:iduser',
  studentReturnProject: 'users/:iduser/returntoproject/:returntoprojectid',
};
