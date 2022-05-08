import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import { Icon } from '@ant-design/compatible';

import DefectsList from './defect/DefectsList';
import DefectForm from './defect/DefectForm';
import InputTooltip from '../common/InputTooltip';
import {
  createPhaseOnProjectVersion, createPhaseOnProjectVersionSuccess, createPhaseOnProjectVersionFailure,
  editPhaseOnProjectVersion, editPhaseOnProjectVersionSuccess, editPhaseOnProjectVersionFailure,
  deletePhaseOnProjectVersion, deletePhaseOnProjectVersionSuccess, deletePhaseOnProjectVersionFailure, fetchProjectDetailsVersionPhaseDefects,
  fetchProjectDetailsVersionPhaseDefectsSuccess, fetchProjectDetailsVersionPhaseDefectsFailure,
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

class ProjectDetailsPhases extends Component {
  constructor(props) {
    super(props);

    this.formTimeout = null;
    this.state = {
      canEdit: (this.props.version.status === 'working' && this.props.session.user.role !== 'professor'),
      activePhase: this.props.version.phases[this.props.version.phases.length - 1],
      activeDefect: null
    };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.props.fetchProjectDetailsVersionPhaseDefects(this.props.studentId, this.props.project.id, this.props.version.id, this.state.activePhase.id);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activePhase.id != nextState.activePhase.id) {
      this.props.fetchProjectDetailsVersionPhaseDefects(this.props.studentId, this.props.project.id, this.props.version.id, nextState.activePhase.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      if (this.message_creating) {
        this.message_creating();
        this.message_creating = null;
      }
      if (this.message_editing) {
        this.message_editing();
        this.message_editing = null;
      }
      if (this.message_deleting) {
        this.message_deleting();
        this.message_deleting = null;
      }
      if (this.message_error) {
        this.message_error();
        this.message_error = null;
      }
      if (nextProps.error.data && nextProps.error.data.errors && nextProps.error.data.errors && nextProps.error.data.errors.elapsed_time) {
        this.message_error = message.error('Elapsed time should be a positive number (end_time - start_time - interruption_time)', 7);
      } else {
        this.message_error = message.error(nextProps.error.msg, 7);
      }
    }

    if (this.message_creating && nextProps.created) {
      this.message_creating();
      this.message_creating = null;
      this.setState({
        ...this.state,
        activePhase: nextProps.version.phases[nextProps.version.phases.length - 1],
        canEdit: (nextProps.version.status === 'working' && this.props.session.user.role !== 'professor'),
      });
    } else if (this.message_editing && nextProps.edited) {
      this.message_editing();
      this.message_editing = null;
      this.setState({
        ...this.state,
        canEdit: (nextProps.version.status === 'working' && this.props.session.user.role !== 'professor'),
      });
    } else if (this.message_deleting && nextProps.deleted) {
      this.message_deleting();
      this.message_deleting = null;
      this.setState({
        ...this.state,
        activePhase: nextProps.version.phases[nextProps.version.phases.length - 1],
        canEdit: (nextProps.version.status === 'working' && this.props.session.user.role !== 'professor'),
      });
    } else {
      this.setState({
        ...this.state,
        canEdit: (nextProps.version.status === 'working' && this.props.session.user.role !== 'professor'),
      });
    }
  }

  selectPhase(phase) {
    this.setState({ ...this.state, activePhase: phase });
  }

  selectDefect = (defect) => {
    this.setState({ ...this.state, activeDefect: defect });
  };

  customDot = (dot, { status, index }) => {
    if (status === 'finish' && this.state.canEdit) {
      return (
        <Popover content="You are working on this phase.">
          <button type="button" onClick={() => this.selectPhase(this.props.version.phases[index])}>
            <span className="dot" />
          </button>
        </Popover>);
    } if (status === 'finish' && !this.state.canEdit) {
      return (
        <Popover content="You are reviewing this phase.">
          <button type="button" onClick={() => this.selectPhase(this.props.version.phases[index])}>
            <span className="dot cantedit" />
          </button>
        </Popover>);
    } if (status === 'process') {
      return (
        <Popover content="Click to review this phase.">
          <button type="button" onClick={() => this.selectPhase(this.props.version.phases[index])}>
            <span className="dot" />
          </button>
        </Popover>);
    } if (status === 'wait' && this.state.canEdit) {
      return (
        <Popover content="Click to start a new phase.">
          <button type="button" onClick={this.createPhase}>
            <Icon type="plus-circle" />
          </button>
        </Popover>);
    } if (status === 'wait' && !this.state.canEdit) {
      return (
        <Icon type="plus-circle" />
      );
    }
  };

  printPhasesSteps = () => {
    const steps = this.props.version.phases.map((item, i) => {
      if (item.id === this.state.activePhase.id) {
        return (<Step key={item.id} status="finish" title={this.state.activePhase.psp_phase ? this.state.activePhase.psp_phase.name : ''} />);
      }
      return (<Step key={item.id} status="process" title={item.psp_phase ? item.psp_phase.name : ''} />);
    });
    return [steps, (<Step key="new_phase" title="Start Phase" />)];
  };

  printFormForActivePhase = () => {
    const inputs = [('')];
    if (this.state.activePhase.psp_phase && this.state.activePhase.psp_phase.first) {
      if (this.props.project.psp_project.process.has_plan_time) {
        inputs.push((
          <Col span={12} key="section_plan_time">
            <section>
              <FormItem
                {...formItemLayout}
                label="Plan Time"
              >
                <InputNumber
                  min={0} value={this.state.activePhase.plan_time ? this.state.activePhase.plan_time : null}
                  disabled={(!this.state.canEdit || !this.state.activePhase.start_time)}
                  onChange={(value) => this.editPhase('plan_time', value)}
                />
                <InputTooltip input="project_details_phase_form_plan_time" />
              </FormItem>
            </section>
          </Col>
        ));
      }
      if (this.props.project.psp_project.process.has_plan_loc) {
        inputs.push((
          <Col span={12} key="section_plan_loc">
            <section>
              <FormItem
                {...formItemLayout}
                label="Plan LOCs (A+M)"
              >
                <InputNumber
                  min={0} value={this.state.activePhase.plan_loc ? this.state.activePhase.plan_loc : null}
                  disabled={(!this.state.canEdit || !this.state.activePhase.start_time)}
                  onChange={(value) => this.editPhase('plan_loc', value)}
                />
                <InputTooltip input="project_details_phase_form_plan_loc" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Actual Base LOCs"
              >
                <InputNumber min={0} onChange={(value) => this.editPhase('actual_base_loc', value)} value={this.state.activePhase.actual_base_loc ? this.state.activePhase.actual_base_loc : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                <InputTooltip input="project_details_phase_form_actual_base_loc" />

              </FormItem>
            </section>
          </Col>));
      }
    } else if (this.state.activePhase.psp_phase && this.state.activePhase.psp_phase.last) {
      if (this.props.project.psp_project.process.has_plan_loc) {
        inputs.push((
          <div key="section_pm_loc">
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="Modified (M)"
                >
                  <InputNumber min={0} onChange={(value) => this.editPhase('modified', value)} value={this.state.activePhase.modified ? this.state.activePhase.modified : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_m" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Deleted (D)"
                >
                  <InputNumber min={0} onChange={(value) => this.editPhase('deleted', value)} value={this.state.activePhase.deleted ? this.state.activePhase.deleted : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_d" />

                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="Reused (R)"
                >
                  <InputNumber min={0} onChange={(value) => this.editPhase('reused', value)} value={this.state.activePhase.reused ? this.state.activePhase.reused : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_r" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="New Reusable (NR)"
                >
                  <InputNumber min={0} onChange={(value) => this.editPhase('new_reusable', value)} value={this.state.activePhase.new_reusable ? this.state.activePhase.new_reusable : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_nr" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Total (T)"
                >
                  <InputNumber min={0} onChange={(value) => this.editPhase('total', value)} value={this.state.activePhase.total ? this.state.activePhase.total : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_loc_t" />

                </FormItem>
              </Col>
            </Row>
            <div className="separator" />
          </div>
        ));
      }
      if (this.props.project.psp_project.process.has_pip) {
        inputs.push((
          <div key="section_pm_pip">
            <Row>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                  label="Problem Description"
                  className="inputTextarea"
                >
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => this.editPhase('pip_problem', e.target.value)} value={this.state.activePhase.pip_problem ? this.state.activePhase.pip_problem : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_pip_problem" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Proposal Description"
                  className="inputTextarea"
                >
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => this.editPhase('pip_proposal', e.target.value)} value={this.state.activePhase.pip_proposal ? this.state.activePhase.pip_proposal : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_pm_pip_proposal" />

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Other Notes"
                  className="inputTextarea"
                >
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => this.editPhase('pip_notes', e.target.value)} value={this.state.activePhase.pip_notes ? this.state.activePhase.pip_notes : null} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
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

  createPhase = () => {
    if (this.message_creating) {
      this.message_creating();
    }
    this.message_creating = message.loading('Creating new phase', 0);
    this.setState({ ...this.state, canEdit: false });
    this.props.createPhase(this.props.studentId, this.props.project.id, this.props.version.id);
  };

  editPhase = (attr, value, interval = 2000) => {
    const actualValue = this.state.activePhase[attr];
    if (typeof value === 'number' && parseInt(value) === 0) value = '0';
    if (typeof actualValue === 'number' && parseInt(actualValue) === parseInt(value) && value !== '0') return;
    const newState = { ...this.state, activePhase: { ...this.state.activePhase, [attr]: value } };

    if (attr === 'psp_phase' && this.props.version && this.props.version.phases && this.props.version.phases.length > 0) {
      ['plan_loc', 'plan_time', 'actual_base_loc', 'deleted', 'modified', 'new_reusable', 'reused', 'total', 'pip_problem', 'pip_proposal', 'pip_notes'].map((item, i) => newState.activePhase[item] = null);
      if (value.first) {
        const original_phase = [...this.props.version.phases].reverse().find((o) => o.psp_phase && o.psp_phase.first);
        if (original_phase) {
          ['plan_loc', 'plan_time', 'actual_base_loc'].map((item, i) => newState.activePhase[item] = original_phase[item]);
        }
      }
      if (value.last) {
        const original_phase = [...this.props.version.phases].reverse().find((o) => o.psp_phase && o.psp_phase.last);
        if (original_phase) {
          ['deleted', 'modified', 'new_reusable', 'reused', 'total'].map((item, i) => newState.activePhase[item] = original_phase[item]);
        }
      }
    }
    this.setState(newState);

    if (typeof actualValue === 'string' && String(actualValue).trim() === String(value).trim()) return;

    if (this.formTimeout) clearTimeout(this.formTimeout);
    this.formTimeout = setTimeout(() => {
      if (this.message_editing) {
        this.message_editing();
      }
      this.message_editing = message.loading('Saving phase details', 0);
      this.props.editPhase(this.props.studentId, this.props.project.id, this.props.version.id, newState.activePhase.id, newState.activePhase);
    }, interval);
  };

  deletePhase = () => {
    const _this = this;
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _this.message_deleting = message.loading('Deleting this phase', 0);
        _this.setState({ ..._this.state, canEdit: false });
        _this.props.deletePhase(_this.props.studentId, _this.props.project.id, _this.props.version.id, _this.state.activePhase.id);
      },
      onCancel() {
      },
    });
  };

  noFutureDate(current) {
    return current > moment().endOf('day');
  }

  noSmallerThanDate(current, date) {
    return current < moment(date);
  }

  render() {
    return (
      <div className="projectDetailsPhases">
        <section>
          <Steps current={this.props.version.phases.indexOf(this.state.activePhase)} progressDot={this.customDot}>
            {this.printPhasesSteps()}
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
                  <Select onChange={(value) => this.editPhase('psp_phase', this.props.psp_data.processes.find((o) => o.process.id == this.props.project.psp_project.process.id).process.phases.find((o) => o.id == value), 10)} value={this.state.activePhase.psp_phase ? String(this.state.activePhase.psp_phase.id) : ''} disabled={(!this.state.canEdit)}>
                    {this.props.psp_data.processes.find((o) => o.process.id == this.props.project.psp_project.process.id).process.phases.map((item, i) => (<Option key={item.id} value={String(item.id)}>{item.name}</Option>))}
                  </Select>
                  <InputTooltip input="project_details_phase_form_phase" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Start Time"
                  className="inputDatepicker"

                >
                  <DatePicker disabledDate={(date) => this.noFutureDate(date)} value={this.state.activePhase.start_time ? moment(this.state.activePhase.start_time) : null} placeholder="Select date and time" showTime format="DD/MM/YYYY HH:mm:ss" onChange={(value) => this.editPhase('start_time', value)} disabled={(!this.state.canEdit)} />
                  <InputTooltip input="project_details_phase_form_start_time" />
                </FormItem>
              </Col>
            </Row>
            <div className="separator" />
            {this.printFormForActivePhase()}
            {this.props.version.activePhaseDefects
            && <div>
              <Row className="defectList">
                <Col span={24}>
                  <h3>Defects Detected in this Phase</h3>
                  <DefectForm
                    canEdit={this.state.canEdit && this.state.activePhase.start_time}
                    studentId={this.props.studentId}
                    projectId={this.props.project.id}
                    phase={this.props.version.phases.find((o) => o.id == this.state.activePhase.id)}
                    version={this.props.version}
                    defect={this.state.activeDefect}
                    onEdit={this.selectDefect}
                  />
                  <DefectsList
                    canEdit={this.state.canEdit && this.state.activePhase.start_time}
                    studentId={this.props.studentId}
                    projectId={this.props.project.id}
                    phase={this.props.version.phases.find((o) => o.id == this.state.activePhase.id)}
                    defects={this.props.version.activePhaseDefects}
                    version={this.props.version}
                    onEdit={this.selectDefect}
                  />
                </Col>
              </Row>
              <div className="separator" />
            </div>}
            <Row>
              <Col span={12}>

                <FormItem
                  {...formItemLayout}
                  label="End Time"
                  className="inputDatepicker"
                >
                  <DatePicker disabledDate={(date) => this.noFutureDate(date) || this.noSmallerThanDate(date, this.state.activePhase.start_time)} value={this.state.activePhase.end_time ? moment(this.state.activePhase.end_time) : null} placeholder="Select date and time" showTime format="DD/MM/YYYY HH:mm:ss" onChange={(value) => this.editPhase('end_time', value)} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_end_time" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Int. time"
                >
                  <InputNumber
                    min={0} value={this.state.activePhase.interruption_time ? this.state.activePhase.interruption_time : null}
                    disabled={(!this.state.canEdit || !this.state.activePhase.start_time)}
                    onChange={(value) => this.editPhase('interruption_time', value)}
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
                  <TextArea autosize={{ minRows: 3 }} onChange={(e) => this.editPhase('comments', e.target.value, 3000)} value={this.state.activePhase.comments} disabled={(!this.state.canEdit || !this.state.activePhase.start_time)} />
                  <InputTooltip input="project_details_phase_form_comments" />
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className="separator" />
          <div>
            <span>Phase data is automatically saved.</span>
            {this.state.canEdit && this.props.version.phases.length > 1 && <span>
              <br />
              If you want to delete this phase,
              {' '}
              <Link className="dangerLink" onClick={this.deletePhase}>click here</Link>
              .
                                                                           </span>}
          </div>
        </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
  created: state.projects.project_version_phase_create_finish,
  edited: state.projects.project_version_phase_edit_finish,
  deleted: state.projects.project_version_phase_delete_finish,
  error: state.projects.error,

  psp_data: state.utils.psp_data,
});

const mapDispatchToProps = (dispatch) => ({

  fetchProjectDetailsVersionPhaseDefects: (userid, projectid, versionid, phaseid) => {
    dispatch(fetchProjectDetailsVersionPhaseDefects(userid, projectid, versionid, phaseid)).payload.then((result) => {
      dispatch(fetchProjectDetailsVersionPhaseDefectsSuccess(result));
    }).catch((x) => {
      dispatch(fetchProjectDetailsVersionPhaseDefectsFailure(x));
    });
  },
  createPhase: (userid, projectid, versionid) => {
    dispatch(createPhaseOnProjectVersion(userid, projectid, versionid)).payload.then((result) => {
      dispatch(createPhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(createPhaseOnProjectVersionFailure(x));
    });
  },
  editPhase: (userid, projectid, versionid, phaseid, phase) => {
    if (phase.psp_phase) phase.phase_id = phase.psp_phase.id;
    dispatch(editPhaseOnProjectVersion(userid, projectid, versionid, phaseid, phase)).payload.then((result) => {
      dispatch(editPhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(editPhaseOnProjectVersionFailure(x));
    });
  },

  deletePhase: (userid, projectid, versionid, phaseid) => {
    dispatch(deletePhaseOnProjectVersion(userid, projectid, versionid, phaseid)).payload.then((result) => {
      dispatch(deletePhaseOnProjectVersionSuccess(result));
    }).catch((x) => {
      dispatch(deletePhaseOnProjectVersionFailure(x));
    });
  },
  reset: () => {
    // dispatch(createPhaseOnProjectVersionReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPhases);
