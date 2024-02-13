import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  message,
  Steps,
  Input,
  Form,
  Popover,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  Row,
  Col,
  Alert,
} from 'antd';
import { useLocation } from 'react-router';

import { PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

import DefectsList from './defect/DefectsList';
import DefectForm from './defect/DefectForm';
import InputTooltip from '../common/InputTooltip';
import {
  createPhaseOnProjectVersion,
  createPhaseOnProjectVersionSuccess,
  createPhaseOnProjectVersionFailure,
  editPhaseOnProjectVersion,
  editPhaseOnProjectVersionSuccess,
  editPhaseOnProjectVersionFailure,
  deletePhaseOnProjectVersion,
  deletePhaseOnProjectVersionSuccess,
  deletePhaseOnProjectVersionFailure,
  fetchProjectDetailsVersionPhaseDefects,
  fetchProjectDetailsVersionPhaseDefectsSuccess,
  fetchProjectDetailsVersionPhaseDefectsFailure,
} from '../../actions/projectActions';

import { TEXTS } from '../../constants/constants';

const moment = require('moment/moment');

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const FormItem = Form.Item;

const ProjectDetailsPhases = ({
  version,
  session,
  studentId,
  project,
  createPhaseProps,
  deletePhaseProps,
  editPhaseProps,
  psp_data,
  error,
  created,
  edited,
  deleted,
  hasSubmited,
  fetchProjectDetailsVersionPhaseDefectsProps,
  forcedPM,
  setForcedPM,
}) => {
  const { state } = useLocation();

  const [messageEditing, setMessageEditing] = useState(false);
  const [messageDeleting, setMessageDeleting] = useState(false);
  const [messageCreating, setMessageCreating] = useState(false);

  const [wasEdited, setWasEdited] = useState(false);
  const [canEdit, setCanEdit] = useState(version.status === 'working' && session.user.role !== 'professor');
  const [activePhase, setActivePhase] = useState(version.phases[session.user.role === 'professor' ? 0 : version.phases.length - 1]);

  const [activeDefect, setActiveDefect] = useState(null);

  const {
    break_time,
    elapsed_time,
    fix_time,
    empty_loc,
    plan_time,
    empty_total,
    time_conflict_start,
    time_conflict_end,
  } = activePhase.observations || {
    break_time: null,
    elapsed_time: null,
    fix_time: null,
    empty_loc: null,
    plan_time: null,
    empty_total: null,
    time_conflict_start: null,
    time_conflict_end: null,
  };
  window.history.replaceState({}, document.title);

  const editPhase = (attr, value) => {
    if (!canEdit) return;

    if (typeof value === 'number' && parseInt(value, 10) === 0) value = '0';

    const actualValue = activePhase[attr];
    if (typeof actualValue === 'number' && parseInt(actualValue, 10) === parseInt(value, 10) && value !== '0') return;

    let newState = { ...activePhase, [attr]: value };

    if (attr === 'psp_phase' && version?.phases?.length) {
      [
        'plan_loc', 
        'plan_time', 
        'actual_base_loc', 
        'deleted', 
        'modified', 
        'new_reusable', 
        'reused', 
        'total', 
        'pip_problem', 
        'pip_proposal', 
        'pip_notes'
      ].forEach((item) => { 
        newState = { ...newState, [item]: null }; 
      });

      if (value.first) {
        const original_phase = [...version.phases].reverse()
          .find((o) => o.psp_phase && o.psp_phase.first);

        if (original_phase) {
          ['plan_loc', 'plan_time', 'actual_base_loc'].map((item) => { newState = { ...newState, [item]: original_phase[item] }; });
        }
      }

      if (value.last) {
        const original_phase = [...version.phases].reverse()
          .find((o) => o.psp_phase && o.psp_phase.last);

        if (original_phase) {
          ['deleted', 'modified', 'new_reusable', 'reused', 'total'].map((item) => { newState = { ...newState, [item]: original_phase[item] }; });
        }
      }
    }

    setWasEdited(true);
    setActivePhase(newState);
  };

  useEffect(() => {
    fetchProjectDetailsVersionPhaseDefectsProps(
      studentId,
      project.id,
      version.id,
      activePhase.id,
    );
  }, [activePhase]);

  useEffect(() => {
    if ((state?.phaseIndex || state?.phaseIndex === 0)
    && version.phases[state.phaseIndex]) {
      setActivePhase(version.phases[state.phaseIndex]);
    }
  }, [state, state?.phaseIndex]);

  useEffect(() => {
    if (forcedPM) {
      setActivePhase(version.phases[forcedPM]);
      setForcedPM(null);
    }
  }, [forcedPM]);

  useEffect(() => {
    if (error) {
      if (messageCreating) {
        message.loading('Creating new phase', 2);
        setMessageCreating(false);
      }
      if (messageEditing) {
        message.loading('Saving phase details', 2);
        setMessageEditing(false);
      }
      if (messageDeleting) {
        message.loading('Deleting this phase', 2);
        setMessageDeleting(false);
      }

      if (error.data && error.data.errors && error.data.errors.elapsed_time) {
        message.destroy();
        message.error('Elapsed time should be a positive number (end_time - start_time - interruption_time)', 7);
       
        editPhase('interruption_time', 0);
      } else {
        message.error(error.msg, 5);
      }
    }
  }, [error]);

  useEffect(() => {
    if (messageCreating && created) {
      setMessageCreating(false);
      setActivePhase(version.phases[version.phases.length - 1]);
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    } else if (messageEditing && edited) {
      message.success({ content: 'Phase details saved successfully', key: 'saving', duration: 2 });
      setMessageEditing(false);
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    } else if (messageDeleting && deleted) {
      message.success('Phase deleted successfully', 2);
      setMessageDeleting(false);
      setActivePhase(version.phases[version.phases.length - 1]);
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    } else {
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    }
  }, [created, edited, deleted, messageCreating, messageEditing, messageDeleting]);

  useEffect(() => {
    setCanEdit(version.status === 'working' && session.user.role !== 'professor');
  }, [version.status]);

  const selectPhase = (phase) => {
    setActivePhase(phase);
  };

  const selectDefect = (defect) => {
    setActiveDefect(defect);
  };

  const printPhasesSteps = () => {
    const steps = version.phases.map((item) => {
      if (item.id === activePhase.id) {
        return (<Step key={item.id} status="finish" title={activePhase.psp_phase ? activePhase.psp_phase.name : ''} />);
      }
      return (<Step key={item.id} status="process" title={item.psp_phase ? item.psp_phase.name : ''} />);
    });
    return [steps, (<Step key="new_phase" title={session.user.role !== 'professor' ? 'Start Phase' : ''} />)];
  };

  useEffect(() => {
    const saveData = setTimeout(() => {
      if (!wasEdited) return; // not edited
      setWasEdited(false);
      editPhaseProps(studentId, project.id, version.id, activePhase.id, activePhase);
      setMessageEditing(true);
    }, 2000);

    return () => clearTimeout(saveData);
  }, [activePhase]);

  const pipFields = ['pip_problem', 'pip_proposal', 'pip_notes'];

  const isFieldInvalid = (fieldName) => (
    hasSubmited && (
      !activePhase[fieldName]?.length
      || (fieldName !== 'pip_notes' && activePhase[fieldName]?.length < 15)
    )
  );

  const pipErrorMessage = (hasMinimum) => (hasMinimum
    ? 'This field should contain at least 15 characters'
    : 'This field cannot be empty'
  );

  const printFormForActivePhase = () => {
    const inputs = [('')];
    if (activePhase?.psp_phase?.first) {
      if (project.psp_project.process.has_plan_time) {
        inputs.push((
          <Col span={12} key="section_plan_time">
            <section>
              <FormItem
                label="Plan Time"
                validateStatus={plan_time ? 'warning' : ''}
                hasFeedback={plan_time}
                help={plan_time}
                style={{ display: 'flex' }}
              >
                <InputNumber
                  controls={false}
                  min={0}
                  value={activePhase.plan_time}
                  disabled={(!canEdit || !activePhase.start_time)}
                  onChange={(value) => editPhase('plan_time', value)}
                />
                <InputTooltip input="project_details_phase_form_plan_time" />
              </FormItem>
            </section>
          </Col>
        ));
      }
      if (project.psp_project.process.has_plan_loc) {
        inputs.push((
          <Col span={12} key="section_plan_loc">
            <section>
              <FormItem
                label="Plan LOCs (A+M)"
                validateStatus={empty_loc ? 'warning' : ''}
                hasFeedback={empty_loc}
                help={empty_loc}
              >
                <InputNumber
                  controls={false}
                  min={0}
                  value={activePhase.plan_loc}
                  disabled={(!canEdit || !activePhase.start_time)}
                  onChange={(value) => editPhase('plan_loc', value)}
                />
                <InputTooltip input="project_details_phase_form_plan_loc" />
              </FormItem>
              <FormItem
                label="Actual Base LOCs"
              >
                <InputNumber
                  controls={false}
                  min={0}
                  onChange={(value) => editPhase('actual_base_loc', value)}
                  value={activePhase.actual_base_loc}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_actual_base_loc" />
              </FormItem>
            </section>
          </Col>));
      }
    } else if (activePhase.psp_phase && activePhase.psp_phase.last) {
      if (project.psp_project.process.has_plan_loc) {
        inputs.push((
          <Row className="complete-width">
            <Col span={12}>
              <FormItem
                label="Modified (M)"
              >
                <InputNumber
                  controls={false}
                  min={0}
                  onChange={(value) => editPhase('modified', value)}
                  value={activePhase.modified}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_pm_loc_m" />
              </FormItem>
              <FormItem
                label="Deleted (D)"
              >
                <InputNumber
                  controls={false}
                  min={0}
                  onChange={(value) => editPhase('deleted', value)}
                  value={activePhase.deleted}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_pm_loc_d" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Reused (R)"
              >
                <InputNumber
                  controls={false}
                  min={0}
                  onChange={(value) => editPhase('reused', value)}
                  value={activePhase.reused}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_pm_loc_r" />
              </FormItem>
              <FormItem
                label="New Reusable (NR)"
                validateStatus={(hasSubmited && !activePhase.new_reusable) ? 'warning' : ''}
                hasFeedback={(hasSubmited && !activePhase.new_reusable)}
                help={(hasSubmited && !activePhase.new_reusable) ? 'This field can\'t be empty' : ''}
              >
                <InputNumber
                  controls={false}
                  min={0}
                  onChange={(value) => editPhase('new_reusable', value)}
                  value={activePhase.new_reusable}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_pm_loc_nr" />
              </FormItem>
              <FormItem
                label="Total (T)"
                validateStatus={empty_total || (hasSubmited && !activePhase.total) ? 'warning' : ''}
                hasFeedback={empty_total || (hasSubmited && !activePhase.total)}
                help={empty_total || (hasSubmited && !activePhase.total ? 'This field can\'t be empty' : '')}
              >
                <InputNumber
                  controls={false}
                  min={0}
                  onChange={(value) => editPhase('total', value)}
                  value={activePhase.total}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_pm_loc_t" />
              </FormItem>
            </Col>
          </Row>
        ));
      }
      if (project.psp_project.process.has_pip) {
        inputs.push((
          <div className="section_pm_pip">
            <Col>
              {pipFields.map((fieldName) => (
                <FormItem
                  label={TEXTS[fieldName]}
                  className="inputTextarea"
                  key={fieldName}
                  validateStatus={isFieldInvalid(fieldName) ? 'warning' : ''}
                  help={isFieldInvalid(fieldName) ? pipErrorMessage(fieldName !== 'pip_notes') : ''}
                >
                  <TextArea
                    autosize={{ minRows: 3 }}
                    onChange={(e) => editPhase(fieldName, e.target.value)}
                    value={activePhase[fieldName]}
                    disabled={(!canEdit || !activePhase.start_time)}
                  />
                  <InputTooltip input={`project_details_phase_form_pm_${fieldName}`} />
                </FormItem>
              ))}
            </Col>
          </div>));
      }
    }
    if (inputs.length > 1) {
      return (
        <div key="special_input_separator">
          <Row>{inputs}</Row>
          <div className="separator" />
        </div>
      );
    }
    return inputs;
  };

  const createPhase = () => {
    message.loading('Creating new phase', 1);
    setMessageCreating(true);
    setCanEdit(false);
    createPhaseProps(studentId, project.id, version.id);
  };

  const customDot = (_, { status, index }) => {
    if (status === 'finish' && canEdit) {
      return (
        <Popover content="You are working on this phase.">
          <button className="dot-button" type="button" onClick={() => selectPhase(version.phases[index])}>
            <span className="dot" />
          </button>
        </Popover>
      );
    } if (status === 'finish' && !canEdit) {
      return (
        <Popover content="You are reviewing this phase.">
          <button className="dot-button" type="button" onClick={() => selectPhase(version.phases[index])}>
            <span className="dot cantedit" />
          </button>
        </Popover>
      );
    } if (status === 'process') {
      return (
        <Popover content="Click to review this phase.">
          <button className="dot-button" type="button" onClick={() => selectPhase(version.phases[index])}>
            <span className="dot" />
          </button>
        </Popover>
      );
    } if (status === 'wait' && canEdit) {
      return (
        <Popover content="Click to start a new phase.">
          <button className="dot-button" type="button" onClick={createPhase}>
            <PlusCircleTwoTone twoToneColor="#0dc0bb" />
          </button>
        </Popover>
      );
    } if (status === 'wait' && !canEdit) {
      return (
        session.user.role === 'professor'
          ? <span className="dot-end" />
          : <PlusCircleTwoTone twoToneColor="#B1B1B1" />
      );
    }
  };

  const deletePhase = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setMessageDeleting(true);
        setCanEdit(false);
        deletePhaseProps(studentId, project.id, version.id, activePhase.id);
      },
      onCancel() {
      },
    });
  };

  const noFutureDate = (current) => current > moment().endOf('day');

  const noSmallerThanDate = (current, date) => moment(current) < moment(date);

  return (
    <div className="projectDetailsPhases">
      <Steps
        className="project-steps"
        current={version.phases.indexOf(activePhase)}
        progressDot={customDot}
      >
        { printPhasesSteps()}
      </Steps>
      {canEdit && (
        <Alert
          message="Phase data is automatically saved."
          type="info"
          showIcon
          closable
          className="info_saved"
        />
      )}
      <section>
        <Form>
          <Row>
            <Col span={12}>
              <FormItem
                label="Phase"
                className="inputSelect"
              >
                <Select
                  onChange={(value) => editPhase('psp_phase', psp_data.processes
                    .find((o) => o.process.id == project.psp_project.process.id).process.phases
                    .find((o) => o.id == value), 10)}
                  value={activePhase.psp_phase ? String(activePhase.psp_phase.id) : ''}
                  disabled={(!canEdit)}
                >
                  {psp_data.processes
                    .find((o) => o.process.id == project.psp_project.process.id).process.phases
                    .map((item) => (
                      <Option key={item.id} value={String(item.id)}>{item.name}</Option>
                    ))}
                </Select>
                <InputTooltip input="project_details_phase_form_phase" />
              </FormItem>
              <FormItem
                label="Start Time"
                className="inputDatepicker"
              >
                <DatePicker
                  disabledDate={(selected) => noFutureDate(selected)
                    || noSmallerThanDate(activePhase.end_time, selected)}
                  value={activePhase.start_time ? moment(activePhase.start_time) : null}
                  placeholder="Select date and time"
                  showTime
                  format="DD/MM/YYYY HH:mm:ss"
                  onChange={(value) => editPhase('start_time', value?.startOf('second'))}
                  disabled={(!canEdit)}
                />
                <InputTooltip input="project_details_phase_form_start_time" />
              </FormItem>
            </Col>
          </Row>
          {time_conflict_start && (
            <Alert
              className="time-conflict-alert"
              message={time_conflict_start}
              type="warning"
              showIcon
              closable
            />
          )}
          <div className="separator" />
          { printFormForActivePhase()}
          {version.activePhaseDefects
            && (
              <div>
                <Row className="defectList">
                  <Col span={24}>
                    <h3>Defects Detected in this Phase</h3>
                    <DefectForm
                      canEdit={canEdit && activePhase.start_time}
                      studentId={studentId}
                      projectId={project.id}
                      phase={version.phases.find((o) => o.id == activePhase.id)}
                      version={version}
                      defect={activeDefect}
                      onEdit={selectDefect}
                    />
                    <DefectsList
                      canEdit={canEdit && activePhase.start_time}
                      studentId={studentId}
                      projectId={project.id}
                      phase={version.phases.find((o) => o.id == activePhase.id)}
                      defects={version.activePhaseDefects}
                      version={version}
                      onEdit={selectDefect}
                    />
                  </Col>
                </Row>
                {fix_time && (
                  <Alert
                    className="defect-alert"
                    message={fix_time}
                    type="warning"
                    showIcon
                    closable
                  />
                )}
                <div className="separator" />
              </div>
            )}
          <Row>
            <Col span={12}>
              <section>
                <FormItem
                  label="End Time"
                  className="inputDatepicker"
                  validateStatus={elapsed_time ? 'warning' : ''}
                  hasFeedback={elapsed_time}
                  help={elapsed_time}
                >
                  <DatePicker
                    disabledDate={(date) => noFutureDate(date)
                    || noSmallerThanDate(date, activePhase.start_time)}
                    value={activePhase.end_time ? moment(activePhase.end_time) : null}
                    placeholder="Select date and time"
                    showTime
                    format="DD/MM/YYYY HH:mm:ss"
                    onChange={(value) => {
                      editPhase('end_time', value?.startOf('second'));
                    }}
                    disabled={(!canEdit || !activePhase.start_time)}
                  />
                  <InputTooltip input="project_details_phase_form_end_time" />
                </FormItem>
                <FormItem
                  label="Int. time"
                  validateStatus={break_time ? 'warning' : ''}
                  hasFeedback={break_time}
                  help={break_time}
                >
                  <InputNumber
                    controls={false}
                    min={0}
                    value={activePhase.interruption_time}
                    disabled={(!canEdit || !activePhase.start_time)}
                    onChange={(value) => {
                      console.log(value);
                      editPhase('interruption_time', value);
                    }}
                  />
                  <InputTooltip input="project_details_phase_form_int" />
                </FormItem>
              </section>
              {time_conflict_end && (
                <Alert
                  className="time-conflict-alert"
                  message={time_conflict_end}
                  type="warning"
                  showIcon
                  closable
                />
              )}
            </Col>
            <Col span={12}>
              <FormItem
                label="Comments"
                className="inputTextarea2"
              >
                <TextArea
                  autosize={{ minRows: 3 }}
                  onChange={(e) => editPhase('comments', e.target.value, 3000)}
                  value={activePhase.comments}
                  disabled={(!canEdit || !activePhase.start_time)}
                />
                <InputTooltip input="project_details_phase_form_comments" />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="separator" />
        <div>
          {canEdit && version.phases.length > 1 && (
            <button
              onClick={deletePhase}
              style={{
                color: '#bd3931',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                border: 'none',
                background: 'none',
              }}
            >
              Delete Phase
              <DeleteTwoTone
                style={{ fontSize: '20px', marginLeft: '6px' }}
                twoToneColor="#bd3931"
              />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  created: state.projects.project_version_phase_create_finish,
  edited: state.projects.project_version_phase_edit_finish,
  deleted: state.projects.project_version_phase_delete_finish,
  error: state.projects.error,

  psp_data: state.utils.psp_data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjectDetailsVersionPhaseDefectsProps: (userid, projectid, versionid, phaseid) => {
    dispatch(fetchProjectDetailsVersionPhaseDefects(
      userid,
      projectid,
      versionid,
      phaseid,
    )).payload.then((result) => {
      dispatch(fetchProjectDetailsVersionPhaseDefectsSuccess(result));
    }).catch((x) => {
      dispatch(fetchProjectDetailsVersionPhaseDefectsFailure(x));
    });
  },
  createPhaseProps: (userid, projectid, versionid) => {
    dispatch(createPhaseOnProjectVersion(userid, projectid, versionid)).payload.then((result) => {
      dispatch(createPhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(createPhaseOnProjectVersionFailure(x));
    });
  },
  editPhaseProps: (userid, projectid, versionid, phaseid, phase) => {
    if (phase.psp_phase) phase.phase_id = phase.psp_phase.id;
    dispatch(editPhaseOnProjectVersion(
      userid,
      projectid,
      versionid,
      phaseid,
      phase,
    )).payload.then((result) => {
      dispatch(editPhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(editPhaseOnProjectVersionFailure(x));
    });
  },
  deletePhaseProps: (userid, projectid, versionid, phaseid) => {
    dispatch(deletePhaseOnProjectVersion(
      userid,
      projectid,
      versionid,
      phaseid,
    )).payload.then((result) => {
      dispatch(deletePhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(deletePhaseOnProjectVersionFailure(x));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPhases);
