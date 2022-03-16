import projectApi from '../api/projectApi';
import dashboardApi from '../api/dashboardApi';

// Project List (Student Dashboard)
export const PROJECT_LIST_FETCH = 'PROJECT_LIST_FETCH';
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS';
export const PROJECT_LIST_FAILURE = 'PROJECT_LIST_FAILURE';
export const PROJECT_LIST_RESET = 'PROJECT_LIST_RESET';

// Project Details (general info about the project, no version-details)
export const PROJECT_DETAILS_FETCH = 'PROJECT_DETAILS_FETCH';
export const PROJECT_DETAILS_SUCCESS = 'PROJECT_DETAILS_SUCCESS';
export const PROJECT_DETAILS_FAILURE = 'PROJECT_DETAILS_FAILURE';
export const PROJECT_DETAILS_RESET = 'PROJECT_DETAILS_RESET';

// Specific version of a Project (Part of Details)
export const PROJECT_DETAILS_VERSION_FETCH = 'PROJECT_DETAILS_VERSION_FETCH';
export const PROJECT_DETAILS_VERSION_SUCCESS = 'PROJECT_DETAILS_VERSION_SUCCESS';
export const PROJECT_DETAILS_VERSION_FAILURE = 'PROJECT_DETAILS_VERSION_FAILURE';
export const PROJECT_DETAILS_VERSION_RESET = 'PROJECT_DETAILS_VERSION_RESET';

// Summary of a specific version of a Project (Part of Details)
export const PROJECT_DETAILS_VERSION_SUMMARY_FETCH = 'PROJECT_DETAILS_VERSION_SUMMARY_FETCH';
export const PROJECT_DETAILS_VERSION_SUMMARY_SUCCESS = 'PROJECT_DETAILS_VERSION_SUMMARY_SUCCESS';
export const PROJECT_DETAILS_VERSION_SUMMARY_FAILURE = 'PROJECT_DETAILS_VERSION_SUMMARY_FAILURE';
export const PROJECT_DETAILS_VERSION_SUMMARY_RESET = 'PROJECT_DETAILS_VERSION_SUMMARY_RESET';

// Summary of a specific version of a Project (Part of Details)
export const PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FETCH = 'PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FETCH';
export const PROJECT_DETAILS_VERSION_PHASE_DEFECTS_SUCCESS = 'PROJECT_DETAILS_VERSION_PHASE_DEFECTS_SUCCESS';
export const PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FAILURE = 'PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FAILURE';
export const PROJECT_DETAILS_VERSION_PHASE_DEFECTS_RESET = 'PROJECT_DETAILS_VERSION_PHASE_DEFECTS_RESET';

// Create a new phase for a given project version
export const PROJECT_VERSION_PHASE_CREATE = 'PROJECT_VERSION_PHASE_CREATE';
export const PROJECT_VERSION_PHASE_CREATE_SUCCESS = 'PROJECT_VERSION_PHASE_CREATE_SUCCESS';
export const PROJECT_VERSION_PHASE_CREATE_FAILURE = 'PROJECT_VERSION_PHASE_CREATE_FAILURE';
export const PROJECT_VERSION_PHASE_CREATE_RESET = 'PROJECT_VERSION_PHASE_CREATE_RESET';

// Edit a phase for a given project version
export const PROJECT_VERSION_PHASE_EDIT = 'PROJECT_VERSION_PHASE_EDIT';
export const PROJECT_VERSION_PHASE_EDIT_SUCCESS = 'PROJECT_VERSION_PHASE_EDIT_SUCCESS';
export const PROJECT_VERSION_PHASE_EDIT_FAILURE = 'PROJECT_VERSION_PHASE_EDIT_FAILURE';
export const PROJECT_VERSION_PHASE_EDIT_RESET = 'PROJECT_VERSION_PHASE_EDIT_RESET';

// Delete a phase for a given project version
export const PROJECT_VERSION_PHASE_DELETE = 'PROJECT_VERSION_PHASE_DELETE';
export const PROJECT_VERSION_PHASE_DELETE_SUCCESS = 'PROJECT_VERSION_PHASE_DELETE_SUCCESS';
export const PROJECT_VERSION_PHASE_DELETE_FAILURE = 'PROJECT_VERSION_PHASE_DELETE_FAILURE';
export const PROJECT_VERSION_PHASE_DELETE_RESET = 'PROJECT_VERSION_PHASE_DELETE_RESET';

// Log a new discovered defect for a given project version phase
export const PROJECT_VERSION_PHASE_DEFECT_CREATE = 'PROJECT_VERSION_PHASE_DEFECT_CREATE';
export const PROJECT_VERSION_PHASE_DEFECT_CREATE_SUCCESS = 'PROJECT_VERSION_PHASE_DEFECT_CREATE_SUCCESS';
export const PROJECT_VERSION_PHASE_DEFECT_CREATE_FAILURE = 'PROJECT_VERSION_PHASE_DEFECT_CREATE_FAILURE';
export const PROJECT_VERSION_PHASE_DEFECT_CREATE_RESET = 'PROJECT_VERSION_PHASE_DEFECT_CREATE_RESET';

// Edit a discovered defect for a given project version phase
export const PROJECT_VERSION_PHASE_DEFECT_EDIT = 'PROJECT_VERSION_PHASE_DEFECT_EDIT';
export const PROJECT_VERSION_PHASE_DEFECT_EDIT_SUCCESS = 'PROJECT_VERSION_PHASE_DEFECT_EDIT_SUCCESS';
export const PROJECT_VERSION_PHASE_DEFECT_EDIT_FAILURE = 'PROJECT_VERSION_PHASE_DEFECT_EDIT_FAILURE';
export const PROJECT_VERSION_PHASE_DEFECT_EDIT_RESET = 'PROJECT_VERSION_PHASE_DEFECT_EDIT_RESET';

// Delete a discovered defect for a given project version phase
export const PROJECT_VERSION_PHASE_DEFECT_DELETE = 'PROJECT_VERSION_PHASE_DEFECT_DELETE';
export const PROJECT_VERSION_PHASE_DEFECT_DELETE_SUCCESS = 'PROJECT_VERSION_PHASE_DEFECT_DELETE_SUCCESS';
export const PROJECT_VERSION_PHASE_DEFECT_DELETE_FAILURE = 'PROJECT_VERSION_PHASE_DEFECT_DELETE_FAILURE';
export const PROJECT_VERSION_PHASE_DEFECT_DELETE_RESET = 'PROJECT_VERSION_PHASE_DEFECT_DELETE_RESET';

// Send new message for a given project
export const PROJECT_MESSAGES_CREATE = 'PROJECT_MESSAGES_CREATE';
export const PROJECT_MESSAGES_CREATE_SUCCESS = 'PROJECT_MESSAGES_CREATE_SUCCESS';
export const PROJECT_MESSAGES_CREATE_FAILURE = 'PROJECT_MESSAGES_CREATE_FAILURE';
export const PROJECT_MESSAGES_CREATE_RESET = 'PROJECT_MESSAGES_CREATE_RESET';

// Attach a zip with te project files for a given project version
export const PROJECT_VERSION_ATTACH_FILE = 'PROJECT_VERSION_ATTACH_FILE';
export const PROJECT_VERSION_ATTACH_FILE_SUCCESS = 'PROJECT_VERSION_ATTACH_FILE_SUCCESS';
export const PROJECT_VERSION_ATTACH_FILE_FAILURE = 'PROJECT_VERSION_ATTACH_FILE_FAILURE';
export const PROJECT_VERSION_ATTACH_FILE_RESET = 'PROJECT_VERSION_ATTACH_FILE_RESET';

// Delete attached zip file for a given project version
export const PROJECT_VERSION_DELETE_FILE = 'PROJECT_VERSION_DELETE_FILE';
export const PROJECT_VERSION_DELETE_FILE_SUCCESS = 'PROJECT_VERSION_DELETE_FILE_SUCCESS';
export const PROJECT_VERSION_DELETE_FILE_FAILURE = 'PROJECT_VERSION_DELETE_FILE_FAILURE';
export const PROJECT_VERSION_DELETE_FILE_RESET = 'PROJECT_VERSION_DELETE_FILE_RESET';

// Project Version Submit
export const PROJECT_VERSION_SUBMIT = 'PROJECT_VERSION_SUBMIT';
export const PROJECT_VERSION_SUBMIT_SUCCESS = 'PROJECT_VERSION_SUBMIT_SUCCESS';
export const PROJECT_VERSION_SUBMIT_FAILURE = 'PROJECT_VERSION_SUBMIT_FAILURE';
export const PROJECT_VERSION_SUBMIT_RESET = 'PROJECT_VERSION_SUBMIT_RESET';

export const PROJECT_ACTION_START = 'PROJECT_ACTION_START';
export const PROJECT_ACTION_START_SUCCESS = 'PROJECT_ACTION_START_SUCCESS';
export const PROJECT_ACTION_START_FAILURE = 'PROJECT_ACTION_START_FAILURE';
export const PROJECT_ACTION_START_RESET = 'PROJECT_ACTION_START_RESET';

export const PROJECT_ACTION_CONTINUE = 'PROJECT_ACTION_CONTINUE';
export const PROJECT_ACTION_CONTINUE_SUCCESS = 'PROJECT_ACTION_CONTINUE_SUCCESS';
export const PROJECT_ACTION_CONTINUE_FAILURE = 'PROJECT_ACTION_CONTINUE_FAILURE';
export const PROJECT_ACTION_CONTINUE_RESET = 'PROJECT_ACTION_CONTINUE_RESET';




export const PROJECT_PROFESSOR_APPROVE = 'PROJECT_PROFESSOR_APPROVE';
export const PROJECT_PROFESSOR_APPROVE_SUCCESS = 'PROJECT_PROFESSOR_APPROVE_SUCCESS';
export const PROJECT_PROFESSOR_APPROVE_FAILURE = 'PROJECT_PROFESSOR_APPROVE_FAILURE';

export const PROJECT_PROFESSOR_REJECT = 'PROJECT_PROFESSOR_REJECT';
export const PROJECT_PROFESSOR_REJECT_SUCCESS = 'PROJECT_PROFESSOR_REJECT_SUCCESS';
export const PROJECT_PROFESSOR_REJECT_FAILURE = 'PROJECT_PROFESSOR_REJECT_FAILURE';



export function fetchProjects(userid) {
  return {
    type: PROJECT_LIST_FETCH,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_projects(userid).then((projects) => {
        resolve(projects);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong fetching projects', data: x});
      })
    }),
  };
}

export function fetchProjectsSuccess(projects) {
  return {
    type: PROJECT_LIST_SUCCESS,
    payload: projects
  };
}

export function fetchProjectsFailure(error) {
  return {
    type: PROJECT_LIST_FAILURE,
    payload: error
  };
}


export function resetProjectsList() {
  return {
    type: PROJECT_LIST_RESET,
    payload: null
  };
}





export function fetchProjectDetails(userid,projectid) {

  return {
    type: PROJECT_DETAILS_FETCH,
    payload: new Promise((resolve, reject) => {
      Promise.all([
        projectApi.assigned_project_base(userid,projectid),
        projectApi.assigned_project_messages(userid,projectid),
        projectApi.assigned_project_timeline(userid,projectid),
      ]).then((responses)=> {
        resolve({...responses[0], messages: responses[1].messages, timeline: responses[2].statuses});
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong fetching the project', data: x});
      })

    })
  };
}

export function fetchProjectDetailsSuccess(project) {
  return {
    type: PROJECT_DETAILS_SUCCESS,
    payload: project
  };
}

export function fetchProjectDetailsFailure(error) {
  return {
    type: PROJECT_DETAILS_FAILURE,
    payload: error
  };
}


export function resetProjectDetails() {
  return {
    type: PROJECT_DETAILS_RESET,
    payload: null
  };
}


export function fetchProjectDetailsVersion(userid,projectid,versionid) {
  return {
    type: PROJECT_DETAILS_VERSION_FETCH,
    payload: new Promise((resolve, reject) => {
//      resolve(MOCK_PROJECT_DETAILS_VERSION_3_1);
      Promise.all([
        projectApi.assigned_project_version_base(userid,projectid,versionid),
        projectApi.assigned_project_version_summary(userid,projectid,versionid),
        projectApi.assigned_project_version_phases(userid,projectid,versionid),
      ]).then((responses)=> {
        resolve({...responses[0], summary: responses[1], phases: responses[2]});
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong fetching project version', data: x});
      })
    })
  };
}

export function fetchProjectDetailsVersionSuccess(version) {
  return {
    type: PROJECT_DETAILS_VERSION_SUCCESS,
    payload: version
  };
}

export function fetchProjectDetailsVersionFailure(error) {
  return {
    type: PROJECT_DETAILS_VERSION_FAILURE,
    payload: error
  };
}




export function resetProjectDetailsVersion() {
  return {
    type: PROJECT_DETAILS_VERSION_RESET,
    payload: null
  };
}


export function fetchProjectDetailsVersionSummary(userid,projectid,versionid) {
  return {
    type: PROJECT_DETAILS_VERSION_SUMMARY_FETCH,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_summary(userid,projectid,versionid).then((summary) => {
        resolve(summary);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong fetching projects', data: x});
      })
    }),
  };
}

export function fetchProjectDetailsVersionSummarySuccess(version) {
  return {
    type: PROJECT_DETAILS_VERSION_SUMMARY_SUCCESS,
    payload: version
  };
}

export function fetchProjectDetailsVersionSummaryFailure(error) {
  return {
    type: PROJECT_DETAILS_VERSION_SUMMARY_FAILURE,
    payload: error
  };
}


export function fetchProjectDetailsVersionPhaseDefects(userid,projectid,versionid,phaseid) {
  return {
    type: PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FETCH,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_defects(userid,projectid,versionid,phaseid).then((defects) => {
        resolve(defects);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong fetching defects', data: x});
      })
    }),
  };
}

export function fetchProjectDetailsVersionPhaseDefectsSuccess(version) {
  return {
    type: PROJECT_DETAILS_VERSION_PHASE_DEFECTS_SUCCESS,
    payload: version
  };
}

export function fetchProjectDetailsVersionPhaseDefectsFailure(error) {
  return {
    type: PROJECT_DETAILS_VERSION_PHASE_DEFECTS_FAILURE,
    payload: error
  };
}




export function createPhaseOnProjectVersion(userid, projectid, versionid) {
  return {
    type: PROJECT_VERSION_PHASE_CREATE,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_create(userid,projectid,versionid).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong creating a phase', data: x});
      })
    }),
  };
}

export function createPhaseOnProjectVersionSuccess(version) {
  return {
    type: PROJECT_VERSION_PHASE_CREATE_SUCCESS,
    payload: version
  };
}

export function createPhaseOnProjectVersionFailure(error) {
  return {
    type: PROJECT_VERSION_PHASE_CREATE_FAILURE,
    payload: error
  };
}


export function createPhaseOnProjectVersionReset() {
  return {
    type: PROJECT_VERSION_PHASE_CREATE_RESET,
    payload: null
  };
}




export function editPhaseOnProjectVersion(userid, projectid, versionid, phaseid, phase) {
  return {
    type: PROJECT_VERSION_PHASE_EDIT,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_update(userid,projectid,versionid,phaseid,phase).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong updating a phase', data: x});
      })
    }),
  };
}

export function editPhaseOnProjectVersionSuccess(version) {
  return {
    type: PROJECT_VERSION_PHASE_EDIT_SUCCESS,
    payload: version
  };
}

export function editPhaseOnProjectVersionFailure(error) {
  return {
    type: PROJECT_VERSION_PHASE_EDIT_FAILURE,
    payload: error
  };
}


export function editPhaseOnProjectVersionReset() {
  return {
    type: PROJECT_VERSION_PHASE_EDIT_RESET,
    payload: null
  };
}

export function deletePhaseOnProjectVersion(userid,projectid,versionid,phaseid) {
  return {
    type: PROJECT_VERSION_PHASE_DELETE,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_delete(userid,projectid,versionid,phaseid).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong deleting a phase', data: x});
      })
    }),
  };
}

export function deletePhaseOnProjectVersionSuccess(version) {
  return {
    type: PROJECT_VERSION_PHASE_DELETE_SUCCESS,
    payload: version
  };
}

export function deletePhaseOnProjectVersionFailure(error) {
  return {
    type: PROJECT_VERSION_PHASE_DELETE_FAILURE,
    payload: error
  };
}


export function deletePhaseOnProjectVersionReset() {
  return {
    type: PROJECT_VERSION_PHASE_DELETE_RESET,
    payload: null
  };
}


/////////////






export function createDefectOnProjectVersionPhase(userid,projectid,versionid,phaseid,defect) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_CREATE,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_defect_create(userid,projectid,versionid,phaseid,defect).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong creating a defect', data: x});
      })
    }),
  };
}

export function createDefectOnProjectVersionPhaseSuccess(version) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_CREATE_SUCCESS,
    payload: version
  };
}

export function createDefectOnProjectVersionPhaseFailure(error) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_CREATE_FAILURE,
    payload: error
  };
}


export function createDefectOnProjectVersionPhaseReset() {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_CREATE_RESET,
    payload: null
  };
}




export function editDefectOnProjectVersionPhase(userid,projectid,versionid,phaseid,defectid,defect) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_EDIT,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_defect_update(userid,projectid,versionid,phaseid,defectid,defect).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong updating a defect', data: x});

      })
    }),
  };
}

export function editDefectOnProjectVersionPhaseSuccess(version) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_EDIT_SUCCESS,
    payload: version
  };
}

export function editDefectOnProjectVersionPhaseFailure(error) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_EDIT_FAILURE,
    payload: error
  };
}


export function editDefectOnProjectVersionPhaseReset() {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_EDIT_RESET,
    payload: null
  };
}









export function deleteDefectOnProjectVersionPhase(userid,projectid,versionid,phaseid,defectid) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_DELETE,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_version_phases_defect_delete(userid,projectid,versionid,phaseid,defectid).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong deleting a defect', data: x});
      })
    }),
  };
}

export function deleteDefectOnProjectVersionPhaseSuccess(version) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_DELETE_SUCCESS,
    payload: version
  };
}

export function deleteDefectOnProjectVersionPhaseFailure(error) {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_DELETE_FAILURE,
    payload: error
  };
}


export function deleteDefectOnProjectVersionPhaseReset() {
  return {
    type: PROJECT_VERSION_PHASE_DEFECT_DELETE_RESET,
    payload: null
  };
}


export function createMessageOnProject(userid,projectid,message) {
  return {
    type: PROJECT_MESSAGES_CREATE,
    payload: new Promise((resolve, reject) => {
      projectApi.create_message(userid,projectid,message).then((x) => {
        resolve(x);
      }).catch((error) => {
        reject({error: error});
      })
    }),
  };
}

export function createMessageOnProjectSuccess(project) {
  return {
    type: PROJECT_MESSAGES_CREATE_SUCCESS,
    payload: project
  };
}

export function createMessageOnProjectFailure(error) {
  return {
    type: PROJECT_MESSAGES_CREATE_FAILURE,
    payload: error
  };
}


export function createMessageOnProjectReset() {
  return {
    type: PROJECT_MESSAGES_CREATE_RESET,
    payload: null
  };
}




export function attachFileOnProjectVersion(userid,projectid,versionid,file) {
  return {
    type: PROJECT_VERSION_ATTACH_FILE,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_attach_file(userid,projectid,versionid,file).then((x) => {
        resolve(x);
      }).catch((x) => {
        reject({error: true, msg: 'Something went wrong attaching the zip', data: x});
      })
    }),
  };
}

export function attachFileOnProjectVersionSuccess(version) {
  return {
    type: PROJECT_VERSION_ATTACH_FILE_SUCCESS,
    payload: version
  };
}

export function attachFileOnProjectVersionFailure(error) {
  return {
    type: PROJECT_VERSION_ATTACH_FILE_FAILURE,
    payload: error
  };
}


export function attachFileOnProjectVersionReset() {
  return {
    type: PROJECT_VERSION_ATTACH_FILE_RESET,
    payload: null
  };
}

export function deleteFileOnProjectVersion(project, version) {
  return {
    type: PROJECT_VERSION_DELETE_FILE,
    payload: new Promise((resolve, reject) => {
      // this should call the API service, @todo
      setTimeout(() => {
        if (true) {
          let version_with_deleted_file =  JSON.parse(JSON.stringify(version));
          version_with_deleted_file.file = null;
          resolve(version_with_deleted_file);
        } else {
          reject({error: 'the jiji should be 1 or 2 but it is ' + phase.id});
        }
      }, 1000);
    }),
  };
}

export function deleteFileOnProjectVersionSuccess(version) {
  return {
    type: PROJECT_VERSION_DELETE_FILE_SUCCESS,
    payload: version
  };
}

export function deleteFileOnProjectVersionFailure(error) {
  return {
    type: PROJECT_VERSION_DELETE_FILE_FAILURE,
    payload: error
  };
}


export function deleteFileOnProjectVersionReset() {
  return {
    type: PROJECT_VERSION_DELETE_FILE_RESET,
    payload: null
  };
}




export function submitProjectVersion(userid,projectid) {
  return {
    type: PROJECT_VERSION_SUBMIT,
    payload: new Promise((resolve, reject) => {
      //  setTimeout(() => { resolve(MOCK_PROJECT_DETAILS_VERSION_3_1.summary);}, 3000);
      projectApi.assigned_project_submit(userid,projectid).then((x) => {
        resolve(x.statuses);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong starting project', data: x});
      })
    }),
  };
}

export function submitProjectVersionSuccess(version) {
  return {
    type: PROJECT_VERSION_SUBMIT_SUCCESS,
    payload: version
  };
}

export function submitProjectVersionFailure(error) {
  return {
    type: PROJECT_VERSION_SUBMIT_FAILURE,
    payload: error
  };
}


export function submitProjectVersionReset() {
  return {
    type: PROJECT_VERSION_SUBMIT_RESET,
    payload: null
  };
}




export function startProject(userid, projectid) {
  return {
    type: PROJECT_ACTION_START,
    payload: new Promise((resolve, reject) => {
      //  setTimeout(() => { resolve(MOCK_PROJECT_DETAILS_VERSION_3_1.summary);}, 3000);
      projectApi.assigned_project_start(userid,projectid).then((x) => {
        resolve(x.statuses);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong starting project', data: x});
      })
    }),
  };
}

export function startProjectSuccess(version) {
  return {
    type: PROJECT_ACTION_START_SUCCESS,
    payload: version
  };
}

export function startProjectFailure(error) {
  return {
    type: PROJECT_ACTION_START_FAILURE,
    payload: error
  };
}


export function startProjectReset() {
  return {
    type: PROJECT_ACTION_START_RESET,
    payload: null
  };
}




export function continueProject(userid, projectid) {
  return {
    type: PROJECT_ACTION_CONTINUE,
    payload: new Promise((resolve, reject) => {
      projectApi.assigned_project_restart(userid,projectid).then((x) => {
        resolve(x.statuses);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong continueing project', data: x});
      })
    }),
  };
}

export function continueProjectSuccess(version) {
  return {
    type: PROJECT_ACTION_CONTINUE_SUCCESS,
    payload: version
  };
}

export function continueProjectFailure(error) {
  return {
    type: PROJECT_ACTION_CONTINUE_FAILURE,
    payload: error
  };
}


export function continueProjectReset() {
  return {
    type: PROJECT_ACTION_CONTINUE_RESET,
    payload: null
  };
}

///////////

///

export function professorProjectReject(courseId,projectId,assignedProjectId,data) {
  return {
    type: PROJECT_PROFESSOR_REJECT,
    payload: new Promise((resolve, reject) => {
      dashboardApi.reject_project(courseId,projectId,assignedProjectId,data).then((x) => {
        resolve(x.statuses);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong rejecting project', data: x});
      })
    }),
  };
}

export function professorProjectRejectSuccess(version) {
  return {
    type: PROJECT_PROFESSOR_REJECT_SUCCESS,
    payload: version
  };
}

export function professorProjectRejectFailure(error) {
  return {
    type: PROJECT_PROFESSOR_REJECT_FAILURE,
    payload: error
  };
}


export function professorProjectApprove(courseId,projectId,assignedProjectId,data) {
  return {
    type: PROJECT_PROFESSOR_APPROVE,
    payload: new Promise((resolve, reject) => {
      dashboardApi.approve_project(courseId,projectId,assignedProjectId,data).then((x) => {
        resolve(x.statuses);
      }).catch((x) => {
        reject({error: true, msg:'Something went wrong approveing project', data: x});
      })
    }),
  };
}

export function professorProjectApproveSuccess(version) {
  return {
    type: PROJECT_PROFESSOR_APPROVE_SUCCESS,
    payload: version
  };
}

export function professorProjectApproveFailure(error) {
  return {
    type: PROJECT_PROFESSOR_APPROVE_FAILURE,
    payload: error
  };
}
