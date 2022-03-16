import dashboardApi from '../api/dashboardApi';

import projectApi from "../api/projectApi";
import {getCacheObject, setCacheObject} from "../utils/functions";

export const DASHBOARD_PROJECTS_LIST_FETCH = 'DASHBOARD_PROJECTS_LIST_FETCH';
export const DASHBOARD_PROJECTS_LIST_SUCCESS = 'DASHBOARD_PROJECTS_LIST_SUCCESS';
export const DASHBOARD_PROJECTS_LIST_FAILURE = 'DASHBOARD_PROJECTS_LIST_FAILURE';
export const DASHBOARD_PROJECTS_LIST_RESET = 'DASHBOARD_PROJECTS_LIST_RESET';

export const DASHBOARD_STUDENTS_LIST_FETCH = 'DASHBOARD_STUDENTS_LIST_FETCH';
export const DASHBOARD_STUDENTS_LIST_SUCCESS = 'DASHBOARD_STUDENTS_LIST_SUCCESS';
export const DASHBOARD_STUDENTS_LIST_FAILURE = 'DASHBOARD_STUDENTS_LIST_FAILURE';
export const DASHBOARD_STUDENTS_LIST_RESET = 'DASHBOARD_STUDENTS_LIST_RESET';

export const DASHBOARD_STUDENTS_POKE = 'DASHBOARD_STUDENTS_POKE';
export const DASHBOARD_STUDENTS_POKE_SUCCESS = 'DASHBOARD_STUDENTS_POKE_SUCCESS';
export const DASHBOARD_STUDENTS_POKE_FAILURE = 'DASHBOARD_STUDENTS_POKE_FAILURE';

export const DASHBOARD_STUDENTS_ASSIGN = 'DASHBOARD_STUDENTS_ASSIGN';
export const DASHBOARD_STUDENTS_ASSIGN_SUCCESS = 'DASHBOARD_STUDENTS_ASSIGN_SUCCESS';
export const DASHBOARD_STUDENTS_ASSIGN_FAILURE = 'DASHBOARD_STUDENTS_ASSIGN_FAILURE';

export const DASHBOARD_COURSE_LIST_FETCH = 'DASHBOARD_COURSE_LIST_FETCH';
export const DASHBOARD_COURSE_LIST_SUCCESS = 'DASHBOARD_COURSE_LIST_SUCCESS';
export const DASHBOARD_COURSE_LIST_FAILURE = 'DASHBOARD_COURSE_LIST_FAILURE';
export const DASHBOARD_COURSE_LIST_RESET = 'DASHBOARD_STUDENTS_LIST_RESET';

export const DASHBOARD_COURSE_SELECT = 'DASHBOARD_COURSE_SELECT';
export const DASHBOARD_COURSE_SELECT_SUCCESS = 'DASHBOARD_COURSE_SELECT_SUCCESS';
export const DASHBOARD_COURSE_SELECT_FAILURE = 'DASHBOARD_COURSE_SELECT_FAILURE';
export const DASHBOARD_COURSE_SELECT_RESET = 'DASHBOARD_STUDENTS_SELECT_RESET';


export function dashboardProjectsList(courseId) {
  return {
    type: DASHBOARD_PROJECTS_LIST_FETCH,
    payload: new Promise((resolve, reject) => {
      dashboardApi.dashboard_projects(courseId).then((x) => {
        resolve(x);
      }).catch((error) => {
        reject({error: error});
      })
    }),
  };
}

export function dashboardProjectsListSuccess(projects) {
  return {
    type: DASHBOARD_PROJECTS_LIST_SUCCESS,
    payload: projects
  };
}

export function dashboardProjectsListFailure(error) {
  return {
    type: DASHBOARD_PROJECTS_LIST_FAILURE,
    payload: error
  };
}

export function dashboardProjectsListReset() {
  return {
    type: DASHBOARD_PROJECTS_LIST_RESET,
    payload: null
  };
}

export function dashboardStudentsList(courseId,projectId) {
  return {
    type: DASHBOARD_STUDENTS_LIST_FETCH,
    payload: new Promise((resolve, reject) => {
      dashboardApi.dashboard_students(courseId,projectId).then((x) => {
        resolve(x);
      }).catch((error) => {
        reject({error: error});
      })
    }),
  };
}

export function dashboardStudentsListSuccess(students) {
  return {
    type: DASHBOARD_STUDENTS_LIST_SUCCESS,
    payload: students
  };
}

export function dashboardStudentsListFailure(error) {
  return {
    type: DASHBOARD_STUDENTS_LIST_FAILURE,
    payload: error
  };
}


export function dashboardStudentsListReset() {
  return {
    type: DASHBOARD_STUDENTS_LIST_RESET,
    payload: null
  };
}



export function dashboardStudentsPoke(studentId, projectId,message) {
  return {
    type: DASHBOARD_STUDENTS_POKE,
    payload: new Promise((resolve, reject) => {
      projectApi.create_message(studentId,projectId,message,"poke").then((x) => {
        resolve(x);
      }).catch((error) => {
        reject({error: error});
      })
    }),
  };
}

export function dashboardStudentsPokeSuccess(students) {
  return {
    type: DASHBOARD_STUDENTS_POKE_SUCCESS,
    payload: students
  };
}

export function dashboardStudentsPokeFailure(error) {
  return {
    type: DASHBOARD_STUDENTS_POKE_FAILURE,
    payload: error
  };
}


export function dashboardStudentsAssign(courseId,projectId,studentId) {
  return {
    type: DASHBOARD_STUDENTS_ASSIGN,
    payload: new Promise((resolve, reject) => {
      dashboardApi.assign_project(courseId,projectId,studentId).then((x) => {
        resolve(x);
      }).catch((x) => {
        console.log(`Something went wrong assigning a project ${x}`);
      });
    }),
  };
}

export function dashboardStudentsAssignSuccess(students) {
  return {
    type: DASHBOARD_STUDENTS_ASSIGN_SUCCESS,
    payload: students
  };
}

export function dashboardStudentsAssignFailure(error) {
  return {
    type: DASHBOARD_STUDENTS_ASSIGN_FAILURE,
    payload: error
  };
}
export function dashboardCourseList() {
  return {
    type: DASHBOARD_COURSE_LIST_FETCH,
    payload: new Promise((resolve, reject) => {
      const c = getCacheObject('courses_list');
      if (c) {
        resolve(c);
      } else {
        dashboardApi.courses_list().then((x) => {
          setCacheObject('courses_list',x.reverse());
          resolve(x.reverse());
        }).catch((x) => {
          console.log(`Something went wrong gathering courses list ${x}`);
        });
      }
    }),
  };
}

export function dashboardCourseListSuccess(courses) {
  return {
    type: DASHBOARD_COURSE_LIST_SUCCESS,
    payload: courses
  };
}

export function dashboardCourseListFailure(error) {
  return {
    type: DASHBOARD_COURSE_LIST_FAILURE,
    payload: error
  };
}

export function dashboardCourseListReset() {
  return {
    type: DASHBOARD_COURSE_LIST_RESET,
    payload: null
  };
}
export function dashboardCourseSelect(course) {
  return {
    type: DASHBOARD_COURSE_SELECT,
    payload: new Promise((resolve, reject) => {
      setCacheObject('courses_active', course, 2);
      resolve(course);
    }),
  };
}

export function dashboardCourseSelectSuccess(course) {
  return {
    type: DASHBOARD_COURSE_SELECT_SUCCESS,
    payload: course
  };
}

export function dashboardCourseSelectFailure(error) {
  return {
    type: DASHBOARD_COURSE_SELECT_FAILURE,
    payload: error
  };
}

export function dashboardCourseSelectReset() {
  return {
    type: DASHBOARD_COURSE_SELECT_RESET,
    payload: null
  };
}
