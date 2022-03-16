import api from './apiService';

class Project {

  static assigned_projects(userid) {
    return api.get(`/users/${userid}/assigned_projects`);
  }


  static assigned_project_base(userid,projectid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}`);
  }
  static assigned_project_messages(userid,projectid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/messages`);
  }
  static assigned_project_timeline(userid,projectid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/statuses`);
  }


  static assigned_project_version_base(userid,projectid,versionid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}`);
  }
  static assigned_project_version_summary(userid,projectid,versionid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/summary`);
  }
  static assigned_project_version_phases(userid,projectid,versionid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances`);
  }
  static assigned_project_version_phases_defects(userid,projectid,versionid,phaseid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances/${phaseid}/defects`);
  }



  static assigned_project_version_phases_create(userid,projectid,versionid) {
    return api.post(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances`,{phase_instance:{}});
  }
  static assigned_project_version_phases_update(userid,projectid,versionid,phaseid,phase) {
    return api.put(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances/${phaseid}`,phase);
  }
  static assigned_project_version_phases_delete(userid,projectid,versionid,phaseid) {
    return api.delete(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances/${phaseid}`);
  }


  static assigned_project_version_phases_defect_create(userid,projectid,versionid,phaseid,defect) {
    return api.post(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances/${phaseid}/defects`,defect);
  }
  static assigned_project_version_phases_defect_update(userid,projectid,versionid,phaseid,defectid,defect) {
    return api.put(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances/${phaseid}/defects/${defectid}`,defect);
  }
  static assigned_project_version_phases_defect_delete(userid,projectid,versionid,phaseid,defectid) {
    return api.delete(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/phase_instances/${phaseid}/defects/${defectid}`);
  }

  static assigned_project_version_phases_defect_find(userid,projectid,versionid,phaseid) {
    return api.get(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}/defects?phase_id=${phaseid}`);
  }


  static assigned_project_attach_file(userid,projectid,versionid,file) {
    let f = new FormData();
    f.append('project_delivery[file]',file);
    return api.putFormData(`/users/${userid}/assigned_projects/${projectid}/project_deliveries/${versionid}`,f);
  }



  static assigned_project_start(userid,projectid) {
    return api.post(`/users/${userid}/assigned_projects/${projectid}/start_project`,{});
  }
  static assigned_project_submit(userid,projectid) {
    return api.post(`/users/${userid}/assigned_projects/${projectid}/submit_project`,{});
  }
  static assigned_project_restart(userid,projectid) {
    return api.post(`/users/${userid}/assigned_projects/${projectid}/start_redeliver`,{});
  }

  static create_message(userid,projectid,message,message_type="default") {
    message.message.message_type = message_type;
    return api.post(`/users/${userid}/assigned_projects/${projectid}/messages`, message);
  }


  static first_project(userid) {
    return api.get(`/users/${userid}/assigned_projects/first`);
  }


}

export default Project;
