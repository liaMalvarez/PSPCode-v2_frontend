// App common constants

export const PROJECT_STATUS = [];
PROJECT_STATUS.approved = {
  name: 'Approved', icon: 'check-circle', color: 'green', link: false,
};
PROJECT_STATUS.dued = {
  name: 'Dued', icon: 'clock-circle', color: 'yellow', link: false,
};
PROJECT_STATUS.working = {
  name: 'Working', icon: 'info-circle', color: 'blue', link: true,
};
PROJECT_STATUS.assigned = {
  name: 'Assigned', icon: 'info-circle', color: 'blue', link: false,
};
PROJECT_STATUS.not_assigned = {
  name: 'Not Assigned', icon: 'info-circle', color: 'blue', link: false,
};
PROJECT_STATUS.pending = {
  name: 'Pending', icon: 'info-circle', color: 'blue', link: false,
};
PROJECT_STATUS.being_corrected = {
  name: 'Being Corrected', icon: 'info-circle', color: 'blue', link: false,
};
PROJECT_STATUS.need_correction = {
  name: 'Need Correction', icon: 'close-circle', color: 'red', link: false,
};

export const DEFECT_TYPES = ['Documentation', 'Syntax', 'Build, Package', 'Assignment', 'Interface', 'Checking', 'Data', 'Function', 'System', 'Environment'];

export const ROLES = [];
ROLES[0] = { id: '1', value: 'professor', name: 'Professor' };
ROLES[1] = { id: '2', value: 'student', name: 'Student' };

export const TEXTS = [];
TEXTS.project_details_phase_form_phase = 'Select the current working phase';
TEXTS.project_details_phase_form_start_time = 'Specify the date and time you started working on this phase';
TEXTS.project_details_phase_form_end_time = 'Specify the date and time you finished working on this phase';
TEXTS.project_details_phase_form_int = 'Time in minutes you were interrupted while working on this phase';
TEXTS.project_details_phase_form_comments = 'Add any additional comments about this phase';
TEXTS.project_details_phase_form_plan_loc = 'How many Added + Modified LOCs do you think this project will have?';
TEXTS.project_details_phase_form_actual_base_loc = 'How many Base LOCs does this project have?';
TEXTS.project_details_phase_form_plan_time = 'How many minutes do you expect to be working on this project?';
TEXTS.project_details_phase_form_pm_loc_d = 'How many LOCs you Deleted of the LOCS Base?';
TEXTS.project_details_phase_form_pm_loc_m = 'How many LOCs you Modified of the LOCS Base?';
TEXTS.project_details_phase_form_pm_loc_r = 'How many LOCs you Reused from the LOCS Base?';
TEXTS.project_details_phase_form_pm_loc_nr = 'How many Reusable LOCs you added on this project?';
TEXTS.project_details_phase_form_pm_loc_t = 'How many LOCs does this project have?';
TEXTS.project_details_phase_form_pm_pip_problem = 'Problem Improvement Proposal: Description of the problem';
TEXTS.project_details_phase_form_pm_pip_proposal = 'Problem Improvement Proposal: Proposal of the solution';
TEXTS.project_details_phase_form_pm_pip_notes = 'Problem Improvement Proposal: Other notes or comments';
TEXTS.project_details_phase_defect_form_id = 'Defect Id, this value is auto-generated';
TEXTS.project_details_phase_defect_form_discovered_time = 'Date and time of when you discovered the error';
TEXTS.project_details_phase_defect_form_phase_injected = 'Phase in which you injected the defect';
TEXTS.project_details_phase_defect_form_defect_type = 'Fit this defect into one category';
TEXTS.project_details_phase_defect_form_fix_defect = 'If you injected this defect when fixing another, pick the original defect';
TEXTS.project_details_phase_defect_form_fixed_time = 'Date and time of when you fixed the error';
TEXTS.project_details_phase_defect_form_comments = 'Description of the defect';
TEXTS.user_profile_form_id = 'Unique identficator (auto-generated)';
TEXTS.user_profile_form_first_name = 'First name';
TEXTS.user_profile_form_last_name = 'Last name';
TEXTS.user_profile_form_email = 'Email';
TEXTS.user_profile_form_member_since = 'The date when joined pspcode';
TEXTS.user_profile_form_role = 'The role could be Student or Professor';
TEXTS.user_profile_form_course = 'Which PSP course has enrolled for?';
TEXTS.user_profile_form_programming_language = 'Programming language in which the programs will be coded';
TEXTS.user_profile_form_programming_experience = 'Experience coding in that language';
TEXTS.user_profile_form_have_a_job = 'Yes if has a job';
TEXTS.user_profile_form_job_role = 'Job position (e.g. Sr. software developer)';
TEXTS.user_profile_form_academic_experience = 'e.g. Undergraduated / Graduated / Postgraduated';
TEXTS.user_profile_form_collegue_career_progress = 'e.g. Finishing the thesis';
TEXTS.user_profile_form_approved_subjects = 'N/A';
TEXTS.pip_problem = 'Problem Description';
TEXTS.pip_proposal = 'Proposal Description';
TEXTS.pip_notes = 'Other Notes';
TEXTS.project_details_modal_correctproject_veredict_placeholder_approved = 'You can leave a message to your student if you want to.';
TEXTS.project_details_modal_correctproject_veredict_placeholder_not_approved = 'You should explain to your student why you are rejecting this.';
TEXTS.project_details_modal_correctproject_text_approved = 'You are about to approve this project submission. Once approved, the student will not be able to work on this project anymore, and will be ready for the next one. This operation can\'t be undone.';
TEXTS.project_details_modal_correctproject_text_not_approved = 'You are about to reject this project submission. Once rejected, the student must correct the issues and send it over to you. This operation can\'t be undone.';
