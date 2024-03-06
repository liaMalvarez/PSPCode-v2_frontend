import {
  DASHBOARD_PROJECTS_LIST_FAILURE, DASHBOARD_PROJECTS_LIST_FETCH, DASHBOARD_PROJECTS_LIST_RESET, DASHBOARD_PROJECTS_LIST_SUCCESS,
  DASHBOARD_STUDENTS_LIST_FAILURE, DASHBOARD_STUDENTS_LIST_FETCH, DASHBOARD_STUDENTS_LIST_RESET, DASHBOARD_STUDENTS_LIST_SUCCESS,
  DASHBOARD_STUDENTS_ASSIGN, DASHBOARD_STUDENTS_ASSIGN_FAILURE, DASHBOARD_STUDENTS_ASSIGN_SUCCESS,
  DASHBOARD_STUDENTS_POKE, DASHBOARD_STUDENTS_POKE_FAILURE, DASHBOARD_STUDENTS_POKE_SUCCESS,
  DASHBOARD_COURSE_LIST_FAILURE, DASHBOARD_COURSE_LIST_FETCH, DASHBOARD_COURSE_LIST_RESET, DASHBOARD_COURSE_LIST_SUCCESS, DASHBOARD_COURSE_SELECT, DASHBOARD_COURSE_SELECT_FAILURE, DASHBOARD_COURSE_SELECT_RESET, DASHBOARD_COURSE_SELECT_SUCCESS,
  REDUCER_RESET_ALL,
} from '../actions/dashboardActions';

const INITIAL_STATE = {
  courses: {
    active: null, list: null, error: null, loading: null,
  },
  projects: { list: null, error: null, loading: null },
  students: { list: null, error: null, loading: null },
  finished_poke: false,
  finished_assign: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DASHBOARD_PROJECTS_LIST_FETCH:
      return { ...state, projects: { list: null, error: null, loading: true } };
    case DASHBOARD_PROJECTS_LIST_SUCCESS:
      return { ...state, projects: { list: action.payload, error: null, loading: false } };
    case DASHBOARD_PROJECTS_LIST_FAILURE:
      return { ...state, projects: { list: null, error: action.payload, loading: false } };
    case DASHBOARD_PROJECTS_LIST_RESET:
      return { ...state, projects: { list: null, error: null, loading: false } };

    case DASHBOARD_STUDENTS_LIST_FETCH:
      return { ...state, students: { list: null, error: null, loading: true } };
    case DASHBOARD_STUDENTS_LIST_SUCCESS:
      return { ...state, students: { list: action.payload, error: null, loading: false } };
    case DASHBOARD_STUDENTS_LIST_FAILURE:
      return { ...state, students: { list: null, error: action.payload, loading: false } };
    case DASHBOARD_STUDENTS_LIST_RESET:
      return { ...state, students: { list: null, error: null, loading: false } };

    case DASHBOARD_STUDENTS_POKE:
      return { ...state, finished_poke: false };
    case DASHBOARD_STUDENTS_POKE_SUCCESS:
      return { ...state, finished_poke: true };
    case DASHBOARD_STUDENTS_POKE_FAILURE:
      return { ...state, finished_poke: true };

    case DASHBOARD_STUDENTS_ASSIGN:
      return { ...state, finished_assign: false };
    case DASHBOARD_STUDENTS_ASSIGN_SUCCESS:
      return { ...state, finished_assign: true };
    case DASHBOARD_STUDENTS_ASSIGN_FAILURE:
      return { ...state, finished_assign: true };

    case DASHBOARD_COURSE_LIST_FETCH:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: null, error: null, loading: true,
        },
      };
    case DASHBOARD_COURSE_LIST_SUCCESS:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: action.payload, error: null, loading: false,
        },
      };
    case DASHBOARD_COURSE_LIST_FAILURE:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: null, error: action.payload, loading: false,
        },
      };
    case DASHBOARD_COURSE_LIST_RESET:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: null, error: null, loading: false,
        },
      };

    case DASHBOARD_COURSE_SELECT:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: state.courses.list, error: null, loading: true,
        },
      };
    case DASHBOARD_COURSE_SELECT_SUCCESS:
      return {
        ...state,
        courses: {
          active: action.payload, list: state.courses.list, error: null, loading: false,
        },
      };
    case DASHBOARD_COURSE_SELECT_FAILURE:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: state.courses.list, error: action.payload, loading: false,
        },
      };
    case DASHBOARD_COURSE_SELECT_RESET:
      return {
        ...state,
        courses: {
          active: state.courses.active, list: state.courses.list, error: null, loading: false,
        },
      };

    case REDUCER_RESET_ALL:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
