import {
  PROJECT_LIST_FETCH, PROJECT_LIST_FAILURE, PROJECT_LIST_RESET, PROJECT_LIST_SUCCESS,
  PROJECT_DETAILS_FAILURE, PROJECT_DETAILS_FETCH, PROJECT_DETAILS_RESET, PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_VERSION_FAILURE, PROJECT_DETAILS_VERSION_FETCH, PROJECT_DETAILS_VERSION_RESET,
  PROJECT_DETAILS_VERSION_SUCCESS,
  PROJECT_DETAILS_VERSION_SUMMARY_FAILURE,
  PROJECT_DETAILS_VERSION_SUMMARY_FETCH,
  PROJECT_DETAILS_VERSION_SUMMARY_RESET,
  PROJECT_DETAILS_VERSION_SUMMARY_SUCCESS,
  PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FAILURE,
  PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FETCH,
  PROJECT_DETAILS_VERSION_PHASE_DEFECTS_RESET,
  PROJECT_DETAILS_VERSION_PHASE_DEFECTS_SUCCESS,
  PROJECT_VERSION_PHASE_CREATE_FAILURE,
  PROJECT_VERSION_PHASE_CREATE,
  PROJECT_VERSION_PHASE_CREATE_RESET,
  PROJECT_VERSION_PHASE_CREATE_SUCCESS,
  PROJECT_VERSION_PHASE_EDIT_FAILURE,
  PROJECT_VERSION_PHASE_EDIT,
  PROJECT_VERSION_PHASE_EDIT_RESET,
  PROJECT_VERSION_PHASE_EDIT_SUCCESS,
  PROJECT_VERSION_PHASE_DELETE_FAILURE,
  PROJECT_VERSION_PHASE_DELETE,
  PROJECT_VERSION_PHASE_DELETE_RESET,
  PROJECT_VERSION_PHASE_DELETE_SUCCESS,
  PROJECT_VERSION_PHASE_DEFECT_CREATE_FAILURE,
  PROJECT_VERSION_PHASE_DEFECT_CREATE,
  PROJECT_VERSION_PHASE_DEFECT_CREATE_RESET,
  PROJECT_VERSION_PHASE_DEFECT_CREATE_SUCCESS,
  PROJECT_VERSION_PHASE_DEFECT_EDIT_FAILURE,
  PROJECT_VERSION_PHASE_DEFECT_EDIT,
  PROJECT_VERSION_PHASE_DEFECT_EDIT_RESET,
  PROJECT_VERSION_PHASE_DEFECT_EDIT_SUCCESS,
  PROJECT_VERSION_PHASE_DEFECT_DELETE_FAILURE,
  PROJECT_VERSION_PHASE_DEFECT_DELETE,
  PROJECT_VERSION_PHASE_DEFECT_DELETE_RESET,
  PROJECT_VERSION_PHASE_DEFECT_DELETE_SUCCESS,
  PROJECT_MESSAGES_CREATE_FAILURE,
  PROJECT_MESSAGES_CREATE, PROJECT_MESSAGES_CREATE_RESET,
  PROJECT_MESSAGES_CREATE_SUCCESS,
  PROJECT_VERSION_ATTACH_FILE_FAILURE,
  PROJECT_VERSION_ATTACH_FILE,
  PROJECT_VERSION_ATTACH_FILE_RESET,
  PROJECT_VERSION_ATTACH_FILE_SUCCESS,
  PROJECT_VERSION_DELETE_FILE_FAILURE,
  PROJECT_VERSION_DELETE_FILE,
  PROJECT_VERSION_DELETE_FILE_RESET,
  PROJECT_VERSION_DELETE_FILE_SUCCESS,
  PROJECT_VERSION_SUBMIT_FAILURE,
  PROJECT_VERSION_SUBMIT,
  PROJECT_VERSION_SUBMIT_RESET,
  PROJECT_VERSION_SUBMIT_SUCCESS,
  PROJECT_PROFESSOR_SUBMIT_CORRECTION_SUCCESS,
  PROJECT_ACTION_START,
  PROJECT_ACTION_START_SUCCESS,
  PROJECT_ACTION_START_FAILURE,
  PROJECT_ACTION_START_RESET,
  PROJECT_ACTION_CONTINUE,
  PROJECT_ACTION_CONTINUE_SUCCESS,
  PROJECT_ACTION_CONTINUE_FAILURE,
  PROJECT_ACTION_CONTINUE_RESET,
  PROJECT_VERSION_FEEDBACK_GET_SUCCESS,
} from '../actions/projectActions';

const INITIAL_STATE = {
  list: { projects: [], error: null, loading: false },
  active: {
    general: { project: null, error: null, loading: false },
    version: { version: null, error: null, loading: false },
    project_feedback: null,
  },
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_LIST_FETCH:
      return { ...state, list: { projects: [], error: null, loading: true } };
    case PROJECT_LIST_SUCCESS:
      return { ...state, list: { projects: action.payload, error: null, loading: false } };
    case PROJECT_LIST_FAILURE:
      return { ...state, list: { projects: [], error: action.payload, loading: false } };
    case PROJECT_LIST_RESET:
      return { ...state, list: { projects: [], error: null, loading: false } };

    case PROJECT_DETAILS_FETCH:
      return {
        ...state,
        active: {
          general: { project: null, error: null, loading: true },
          version: { version: null, error: null, loading: null },
        },
      };
    case PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        active: {
          general: { project: action.payload, error: null, loading: false },
          version: { version: null, error: null, loading: null },
        },
      };
    case PROJECT_DETAILS_FAILURE:
      return {
        ...state,
        active: {
          general: { project: null, error: action.payload, loading: false },
          version: { version: null, error: null, loading: null },
        },
      };
    case PROJECT_DETAILS_RESET:
      return {
        ...state,
        active: {
          general: { project: null, error: null, loading: false },
          version: { version: null, error: null, loading: null },
        },
      };

    case PROJECT_DETAILS_VERSION_FETCH:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: true },
        },
      };
    case PROJECT_DETAILS_VERSION_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: action.payload, error: null, loading: false },
        },
      };
    case PROJECT_DETAILS_VERSION_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
      };
    case PROJECT_DETAILS_VERSION_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
      };

    case PROJECT_DETAILS_VERSION_SUMMARY_FETCH:
      return {
        ...state,
        project_version_summary_loading: true,
      };
    case PROJECT_DETAILS_VERSION_SUMMARY_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { ...state.active.version, version: { ...state.active.version.version, summary: action.payload } },
        },
        project_version_summary_loading: false,
      };
    case PROJECT_DETAILS_VERSION_SUMMARY_FAILURE:
      return {
        ...state,
        project_version_summary_loading: false,
      };
    case PROJECT_DETAILS_VERSION_SUMMARY_RESET:
      return {
        ...state,
        project_version_summary_loading: false,
      };

    case PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FETCH:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { ...state.active.version, version: { ...state.active.version.version, activePhaseDefects: [] } },
        },
        project_version_defects_loading: true,
      };
    case PROJECT_DETAILS_VERSION_PHASE_DEFECTS_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { ...state.active.version, version: { ...state.active.version.version, activePhaseDefects: action.payload } },
        },
        project_version_defects_loading: false,
      };
    case PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FAILURE:
      return {
        ...state,
        project_version_defects_loading: false,
      };
    case PROJECT_DETAILS_VERSION_PHASE_DEFECTS_RESET:
      return {
        ...state,
        project_version_defects_loading: false,
      };

    case PROJECT_VERSION_PHASE_CREATE:
      return { ...state, project_version_phase_create_finish: false };
    case PROJECT_VERSION_PHASE_CREATE_SUCCESS:
      const PROJECT_VERSION_PHASE_CREATE_SUCCESS_STATE = JSON.parse(JSON.stringify(state));
      PROJECT_VERSION_PHASE_CREATE_SUCCESS_STATE.active.version.version.phases.push(action.payload);
      return { ...PROJECT_VERSION_PHASE_CREATE_SUCCESS_STATE, project_version_phase_create_finish: true };
    case PROJECT_VERSION_PHASE_CREATE_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_phase_create_finish: false,
      };
    case PROJECT_VERSION_PHASE_CREATE_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_phase_create_finish: false,
      };

    case PROJECT_VERSION_PHASE_EDIT:
      return { ...state, project_version_phase_edit_finish: false, error: false };
    case PROJECT_VERSION_PHASE_EDIT_SUCCESS:
      const PROJECT_VERSION_PHASE_EDIT_SUCCESS_STATE = JSON.parse(JSON.stringify(state));
      PROJECT_VERSION_PHASE_EDIT_SUCCESS_STATE.active.version.version.phases[PROJECT_VERSION_PHASE_EDIT_SUCCESS_STATE.active.version.version.phases.findIndex((o) => o.id == action.payload.id)] = action.payload;
      return { ...PROJECT_VERSION_PHASE_EDIT_SUCCESS_STATE, project_version_phase_edit_finish: true, error: false };
    case PROJECT_VERSION_PHASE_EDIT_FAILURE:
      return { ...state, project_version_phase_edit_finish: false, error: action.payload };
    case PROJECT_VERSION_PHASE_EDIT_RESET:
      return { ...state, project_version_phase_edit_finish: true, error: false };

    case PROJECT_VERSION_PHASE_DELETE:
      return { ...state, project_version_phase_delete_finish: false, error: false };
    case PROJECT_VERSION_PHASE_DELETE_SUCCESS:
      const PROJECT_VERSION_PHASE_DELETE_SUCCESS_STATE = JSON.parse(JSON.stringify(state));
      PROJECT_VERSION_PHASE_DELETE_SUCCESS_STATE.active.version.version.phases.splice(PROJECT_VERSION_PHASE_DELETE_SUCCESS_STATE.active.version.version.phases.findIndex((o) => o.id == action.payload.id), 1);
      return { ...PROJECT_VERSION_PHASE_DELETE_SUCCESS_STATE, project_version_phase_delete_finish: true, error: false };
    case PROJECT_VERSION_PHASE_DELETE_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_phase_delete_finish: false,
        error: true,
      };
    case PROJECT_VERSION_PHASE_DELETE_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_phase_delete_finish: false,
        error: false,
      };

    case PROJECT_VERSION_PHASE_DEFECT_CREATE:
      return { ...state, project_version_phase_defect_creating: true, error: false };
    case PROJECT_VERSION_PHASE_DEFECT_CREATE_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { ...state.active.version, version: { ...state.active.version.version, activePhaseDefects: action.payload } },
        },
        project_version_phase_defect_creating: false,
        error: false,
      };
    case PROJECT_VERSION_PHASE_DEFECT_CREATE_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_phase_defect_creating: true,
        error: true,
      };
    case PROJECT_VERSION_PHASE_DEFECT_CREATE_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_phase_defect_creating: false,
        error: false,
      };

    case PROJECT_VERSION_PHASE_DEFECT_EDIT:
      return { ...state, project_version_phase_defect_editing: true, error: false };
    case PROJECT_VERSION_PHASE_DEFECT_EDIT_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { ...state.active.version, version: { ...state.active.version.version, activePhaseDefects: action.payload } },
        },
        project_version_phase_defect_editing: false,
        error: false,
      };
    case PROJECT_VERSION_PHASE_DEFECT_EDIT_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_phase_defect_editing: true,
        error: true,
      };
    case PROJECT_VERSION_PHASE_DEFECT_EDIT_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_phase_defect_editing: false,
        error: false,
      };

    case PROJECT_VERSION_PHASE_DEFECT_DELETE:
      return { ...state, project_version_phase_defect_deleting: true, error: false };
    case PROJECT_VERSION_PHASE_DEFECT_DELETE_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { ...state.active.version, version: { ...state.active.version.version, activePhaseDefects: action.payload } },
        },
        project_version_phase_defect_deleting: false,
        error: false,
      };
    case PROJECT_VERSION_PHASE_DEFECT_DELETE_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_phase_defect_deleting: true,
        error: true,
      };
    case PROJECT_VERSION_PHASE_DEFECT_DELETE_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_phase_defect_deleting: false,
        error: false,
      };

    case PROJECT_MESSAGES_CREATE:
      return { ...state, project_messages_created: false };
    case PROJECT_MESSAGES_CREATE_SUCCESS:
      const PROJECT_MESSAGES_CREATE_SUCCESS_STATE = JSON.parse(JSON.stringify(state));
      PROJECT_MESSAGES_CREATE_SUCCESS_STATE.active.general.project.messages.push(action.payload);
      return { ...PROJECT_MESSAGES_CREATE_SUCCESS_STATE, project_messages_created: true };
    case PROJECT_MESSAGES_CREATE_FAILURE:
      return { ...state, project_messages_created: true };
    case PROJECT_MESSAGES_CREATE_RESET:
      return { ...state, project_messages_created: true };

    case PROJECT_VERSION_ATTACH_FILE:
      return { ...state, project_version_file_uploaded: false };
    case PROJECT_VERSION_ATTACH_FILE_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          version: {
            ...state.active.version,
            version: {
              ...state.active.version.version,
              file: action.payload.file,
            },
          },
        },
        project_version_file_uploaded: true,
      };
    case PROJECT_VERSION_ATTACH_FILE_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_file_uploaded: false,
      };
    case PROJECT_VERSION_ATTACH_FILE_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_file_uploaded: false,
      };

    case PROJECT_VERSION_DELETE_FILE:
      return { ...state, project_version_file_deleting: true };
    case PROJECT_VERSION_DELETE_FILE_SUCCESS:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: action.payload, error: null, loading: false },
        },
        project_version_file_deleting: false,
      };
    case PROJECT_VERSION_DELETE_FILE_FAILURE:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: action.payload, loading: false },
        },
        project_version_file_deleting: false,
      };
    case PROJECT_VERSION_DELETE_FILE_RESET:
      return {
        ...state,
        active: {
          general: state.active.general,
          version: { version: null, error: null, loading: false },
        },
        project_version_file_deleting: false,
      };

    case PROJECT_ACTION_START:
      return { ...state, project_version_finished_starting: false };
    case PROJECT_ACTION_START_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          general: {
            ...state.active.general,
            project: {
              ...state.active.general.project,
              timeline: action.payload,
            },
          },
          version: {
            ...state.active.version,
            version: {
              ...state.active.version.version,
              status: action.payload[action.payload.length - 1].status,
            },
          },
        },
        project_version_finished_starting: true,
      };
    case PROJECT_ACTION_START_FAILURE:
      return {
        ...state,
        project_version_finished_starting: true,
      };
    case PROJECT_ACTION_START_RESET:
      return {
        ...state,
        project_version_finished_starting: true,
      };

    case PROJECT_ACTION_CONTINUE:
      return { ...state, project_version_finished_continueing: false };
    case PROJECT_ACTION_CONTINUE_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          general: {
            ...state.active.general,
            project: {
              ...state.active.general.project,
              timeline: action.payload,
            },
          },
          version: {
            ...state.active.version,
            version: {
              ...state.active.version.version,
              status: action.payload[action.payload.length - 1].status,
            },
          },
        },
        project_version_finished_continueing: true,
      };
    case PROJECT_ACTION_CONTINUE_FAILURE:
      return {
        ...state,
        project_version_finished_continueing: true,
      };
    case PROJECT_ACTION_CONTINUE_RESET:
      return {
        ...state,
        project_version_finished_continueing: true,
      };

    case PROJECT_VERSION_SUBMIT:
      return { ...state, project_version_submitting: true };
    case PROJECT_VERSION_SUBMIT_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          general: {
            ...state.active.general,
            project: {
              ...state.active.general.project,
              timeline: action.payload,
            },
          },
          version: {
            ...state.active.version,
            version: {
              ...state.active.version.version,
              status: action.payload[action.payload.length - 1].status,
            },
          },
        },
        project_version_submitting: false,
      };
    case PROJECT_VERSION_SUBMIT_FAILURE:
      return {
        ...state,
        project_version_submitting: false,
      };
    case PROJECT_VERSION_SUBMIT_RESET:
      return {
        ...state,
        project_version_submitting: false,
      };
    case PROJECT_PROFESSOR_SUBMIT_CORRECTION_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          general: {
            ...state.active.general,
            project: null,
          },
          version: {
            ...state.active.version,
            version: null,
          },
        },
      };
    case PROJECT_VERSION_FEEDBACK_GET_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          project_feedback: action.payload,
        },
      };
    default:
      return state;
  }
};
