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
  Col
} from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

import DefectsList from './defect/DefectsList';
import DefectForm from './defect/DefectForm';
import InputTooltip from '../common/InputTooltip';
import {
  createPhaseOnProjectVersion, createPhaseOnProjectVersionSuccess, createPhaseOnProjectVersionFailure,
  editPhaseOnProjectVersion, editPhaseOnProjectVersionSuccess, editPhaseOnProjectVersionFailure,
  deletePhaseOnProjectVersion, deletePhaseOnProjectVersionSuccess, deletePhaseOnProjectVersionFailure,
  fetchProjectDetailsVersionPhaseDefects, fetchProjectDetailsVersionPhaseDefectsSuccess,
  fetchProjectDetailsVersionPhaseDefectsFailure,
} from '../../actions/projectActions';

const moment = require('moment/moment');

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

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
  fetchProjectDetailsVersionPhaseDefectsProps,
}) => {
  const [messageEditing, setMessageEditing] = useState(false);
  const [messageDeleting, setMessageDeleting] = useState(false);
  const [messageCreating, setMessageCreating] = useState(false);

  const [canEdit, setCanEdit] = useState(version.status === 'working' && session.user.role !== 'professor');
  const [activePhase, setActivePhase] = useState(version.phases[version.phases.length - 1]);
  const [activeDefect, setActiveDefect] = useState(null);

  let formTimeout = null;

  useEffect(() => {
    fetchProjectDetailsVersionPhaseDefectsProps(studentId, project.id, version.id, activePhase.id);
  }, [activePhase]);

  useEffect(() => {
    if (error) {
      if (messageCreating) {
        message.loading('Creating new phase', 3);
        setMessageCreating(false);
      }
      if (messageEditing) {
        message.loading('Saving phase details', 3);
        setMessageEditing(false);
      }
      if (messageDeleting) {
        message.loading('Deleting this phase', 3);
        setMessageDeleting(false);
      }

      if (error.data && error.data.errors && error.data.errors && error.data.errors.elapsed_time) {
        message.error('Elapsed time should be a positive number (end_time - start_time - interruption_time)', 7);
      } else {
        message.error(error.msg, 7);
      }
    }
  }, [error]);

  useEffect(() => {
    if (messageCreating && created) {
      message.loading('Creating new phase', 3);
      setMessageCreating(false);
      setActivePhase(version.phases[version.phases.length - 1]);
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    } else if (messageEditing && edited) {
      message.loading('Saving phase details', 3);
      setMessageEditing(false);
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    } else if (messageDeleting && deleted) {
      message.loading('Deleting this phase', 3);
      setMessageDeleting(false);
      setActivePhase(version.phases[version.phases.length - 1]);
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    } else {
      setCanEdit(version.status === 'working' && session.user.role !== 'professor');
    }
  }, [created, edited, deleted, messageCreating, messageEditing, messageDeleting]);

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
    return [steps, (<Step key="new_phase" title="Start Phase" />)];
  };

  const editPhase = (attr, value, interval = 2000) => {
    const actualValue = activePhase[attr];
    if (typeof value === 'number' && parseInt(value, 10) === 0) value = '0';
    if (typeof actualValue === 'number' && parseInt(actualValue, 10) === parseInt(value, 10) && value !== '0') return;
    let newState = { ...activePhase, [attr]: value };

    if (attr === 'psp_phase' && version && version.phases && version.phases.length > 0) {
      ['plan_loc', 'plan_time', 'actual_base_loc', 'deleted', 'modified', 'new_reusable', 'reused', 'total', 'pip_problem', 'pip_proposal', 'pip_notes']
        .map((item) => { newState = { ...activePhase, [item]: null }; });
      if (value.first) {
        const original_phase = [...version.phases].reverse().find((o) => o.psp_phase && o.psp_phase.first);
        if (original_phase) {
          ['plan_loc', 'plan_time', 'actual_base_loc'].map((item) => { newState = { ...activePhase, [item]: original_phase[item] }; });
        }
      }
      if (value.last) {
        const original_phase = [...version.phases].reverse().find((o) => o.psp_phase && o.psp_phase.last);
        if (original_phase) {
          ['deleted', 'modified', 'new_reusable', 'reused', 'total'].map((item) => { newState = { ...activePhase, [item]: original_phase[item] }; });
        }
      }
    }
    setActivePhase(newState);

    if (typeof actualValue === 'string' && String(actualValue).trim() === String(value).trim()) return;

    if (formTimeout) clearTimeout(formTimeout);
    formTimeout = setTimeout(() => {
      if (messageEditing) {
        message.loading('Saving phase details', 3);
      }
      setMessageEditing(true);
      editPhaseProps(studentId, project.id, version.id, newState.id, newState);
    }, interval);
  };

  const printFormForActivePhase = () => {
    const inputs = [('')];
    if (activePhase.psp_phase && activePhase.psp_phase.first) {
      if (project.psp_project.process.has_plan_time) {
        inputs.push((
          <Col span={12} key="section_plan_time">
            <section>
              <FormItem
                {...formItemLayout}
                label="Plan Time"
                style={{ display: 'flex' }}
              >
                <InputNumber
                  min={0} value={activePhase.plan_time ? activePhase.plan_time : null}
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
                {...formItemLayout}
                label="Plan LOCs (A+M)"
              >
                <InputNumber
                  min={0} value={activePhase.plan_loc ? activePhase.plan_loc : null}
                  disabled={(!canEdit || !activePhase.start_time)}
                  onChange={(value) => editPhase('plan_loc', value)}
                />
                <InputTooltip input="project_details_phase_form_plan_loc" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Actual Base LOCs"
              >
                <InputNumber min={0} onChange={(value) => editPhase('actual_base_loc', value)} value={activePhase.actual_base_loc ? activePhase.actual_base_loc : null} disabled={(!canEdit || !activePhase.start_time)} />
                <InputTooltip input="project_details_phase_form_actual_base_loc" />

              </FormItem>
            </section>
          </Col>));
      }
    } else if (activePhase.psp_phase && activePhase.psp_phase.last) {
      if (project.psp_project.process.has_plan_loc) {
        inputs.push((
          <div key="section_pm_loc">
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="Modified (M)"
                >
                  <InputNumber min={0} onChange={(value) => editPhase('modified', value)} value={activePhase.modified ? activePhase.modified : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_m" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Deleted (D)"
                >
                  <InputNumber min={0} onChange={(value) => editPhase('deleted', value)} value={activePhase.deleted ? activePhase.deleted : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_d" />

                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="Reused (R)"
                >
                  <InputNumber min={0} onChange={(value) => editPhase('reused', value)} value={activePhase.reused ? activePhase.reused : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_r" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="New Reusable (NR)"
                >
                  <InputNumber min={0} onChange={(value) => editPhase('new_reusable', value)} value={activePhase.new_reusable ? activePhase.new_reusable : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_nr" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Total (T)"
                >
                  <InputNumber min={0} onChange={(value) => editPhase('total', value)} value={activePhase.total ? activePhase.total : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_t" />

                </FormItem>
              </Col>
            </Row>
            <div className="separator" />
          </div>
        ));
      }
      if (project.psp_project.process.has_pip) {
        inputs.push((
          <div key="section_pm_pip">
            <Row>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                  label="Problem Description"
                  className="inputTextarea"
                >
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => editPhase('pip_problem', e.target.value)} value={activePhase.pip_problem ? activePhase.pip_problem : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_pip_problem" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Proposal Description"
                  className="inputTextarea"
                >
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => editPhase('pip_proposal', e.target.value)} value={activePhase.pip_proposal ? activePhase.pip_proposal : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_pip_proposal" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Other Notes"
                  className="inputTextarea"
                >
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => editPhase('pip_notes', e.target.value)} value={activePhase.pip_notes ? activePhase.pip_notes : null} disabled={(!canEdit || !activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_pip_comments" />

                </FormItem>
              </Col>
            </Row>
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
    if (messageCreating) {
      message.loading('Creating new phase', 0);
    }
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
        </Popover>);
    } if (status === 'finish' && !canEdit) {
      return (
        <Popover content="You are reviewing this phase.">
          <button className="dot-button" type="button" onClick={() => selectPhase(version.phases[index])}>
            <span className="dot cantedit" />
          </button>
        </Popover>);
    } if (status === 'process') {
      return (
        <Popover content="Click to review this phase.">
          <button className="dot-button" type="button" onClick={() => selectPhase(version.phases[index])}>
            <span className="dot" />
          </button>
        </Popover>);
    } if (status === 'wait' && canEdit) {
      return (
        <Popover content="Click to start a new phase.">
          <button className="dot-button" type="button" onClick={createPhase}>
            <PlusCircleTwoTone twoToneColor="#0dc0bb" />
          </button>
        </Popover>);
    } if (status === 'wait' && !canEdit) {
      return (
        <PlusCircleTwoTone twoToneColor="#B1B1B1" />
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

  const noSmallerThanDate = (current, date) => current < moment(date);

  return (
    <div className="projectDetailsPhases">
      <section>
        <Steps current={version.phases.indexOf(activePhase)} progressDot={customDot}>
          { printPhasesSteps()}
        </Steps>
      </section>
      <section>
        <Form onSubmit={() => {}}>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="Phase"
                className="inputSelect"
              >
                <Select onChange={(value) => editPhase('psp_phase', psp_data.processes.find((o) => o.process.id == project.psp_project.process.id).process.phases.find((o) => o.id == value), 10)} value={activePhase.psp_phase ? String(activePhase.psp_phase.id) : ''} disabled={(!canEdit)}>
                  {psp_data.processes.find((o) => o.process.id == project.psp_project.process.id).process.phases.map((item) => (<Option key={item.id} value={String(item.id)}>{item.name}</Option>))}
                </Select>
                <InputTooltip input="project_details_phase_form_phase" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Start Time"
                className="inputDatepicker"
              >
                <DatePicker disabledDate={(date) => noFutureDate(date)} value={activePhase.start_time ? moment(activePhase.start_time) : null} placeholder="Select date and time" showTime format="DD/MM/YYYY HH:mm:ss" onChange={(value) => editPhase('start_time', value)} disabled={(!canEdit)} />
                <InputTooltip input="project_details_phase_form_start_time" />
              </FormItem>
            </Col>
          </Row>
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
                <div className="separator" />
              </div>
            )}
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="End Time"
                className="inputDatepicker"
              >
                <DatePicker disabledDate={(date) => noFutureDate(date) || noSmallerThanDate(date, activePhase.start_time)} value={activePhase.end_time ? moment(activePhase.end_time) : null} placeholder="Select date and time" showTime format="DD/MM/YYYY HH:mm:ss" onChange={(value) => editPhase('end_time', value)} disabled={(!canEdit || !activePhase.start_time)} />
                <InputTooltip input="project_details_phase_form_end_time" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Int. time"
              >
                <InputNumber
                  min={0} value={activePhase.interruption_time ? activePhase.interruption_time : null}
                  disabled={(!canEdit || !activePhase.start_time)}
                  onChange={(value) => editPhase('interruption_time', value)}
                />
                <InputTooltip input="project_details_phase_form_int" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="Comments"
                className="inputTextarea2"
              >
                <TextArea autosize={{ minRows: 3 }} onChange={(e) => editPhase('comments', e.target.value, 3000)} value={activePhase.comments} disabled={(!canEdit || !activePhase.start_time)} />
                <InputTooltip input="project_details_phase_form_comments" />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="separator" />
        <div>
          <span>Phase data is automatically saved.</span>
          {canEdit && version.phases.length > 1 && (
            <span>
              <br />
              If you want to delete this phase,
              {' '}
              <button type="button" className="dangerLink" onClick={deletePhase}>click here</button>
              .
            </span>
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
    dispatch(fetchProjectDetailsVersionPhaseDefects(userid, projectid, versionid, phaseid)).payload.then((result) => {
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
    dispatch(editPhaseOnProjectVersion(userid, projectid, versionid, phaseid, phase)).payload.then((result) => {
      dispatch(editPhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(editPhaseOnProjectVersionFailure(x));
    });
  },
  deletePhaseProps: (userid, projectid, versionid, phaseid) => {
    dispatch(deletePhaseOnProjectVersion(userid, projectid, versionid, phaseid)).payload.then((result) => {
      dispatch(deletePhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(deletePhaseOnProjectVersionFailure(x));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPhases);
