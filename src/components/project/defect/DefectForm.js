import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import projectApi from '../../../api/projectApi';
import InputTooltip from '../../common/InputTooltip';
import {DEFECT_TYPES} from '../../../constants/constants';
import {
  createDefectOnProjectVersionPhase, createDefectOnProjectVersionPhaseSuccess, createDefectOnProjectVersionPhaseFailure, createDefectOnProjectVersionPhaseReset,
  editDefectOnProjectVersionPhase, editDefectOnProjectVersionPhaseSuccess, editDefectOnProjectVersionPhaseFailure, editDefectOnProjectVersionPhaseReset
} from '../../../actions/projectActions';
import Input from "../../common/Input";

const Icon = require('antd/lib/icon');
const Steps = require('antd/lib/steps');
const Popover = require('antd/lib/popover');
const Form = require('antd/lib/form');
const TextArea = require('antd/lib/input/TextArea');
const Select = require('antd/lib/select');
const Button = require('antd/lib/button');
const Spin = require('antd/lib/spin');
const DatePicker = require('antd/lib/date-picker');
const InputNumber = require('antd/lib/input-number');
const Modal = require('antd/lib/modal');
const message = require('antd/lib/message');
const moment = require('moment/moment');

const FormItem = Form.Item;
const Option = Select.Option;

const Step = Steps.Step;
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


class DefectForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      defect: null,
      showModal: false,
      fixDefectsReady: false,
      fixDefectsLoading: false,
      fixDefectsList: []
    };

  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defect && nextProps.defect !== this.state.defect) {
      this.setState({ ...this.state, defect: nextProps.defect, showModal: true });
    }
  }

  handleChange(attr, value) {


    if (attr === 'phase_injected') {
      this.setState({
        ...this.state,
        defect: {
          ...this.state.defect,
          [attr]: value,
          fix_defect: null,
        },
        fixDefectsLoading: true,
      });
      projectApi.assigned_project_version_phases_defect_find(this.props.studentId,this.props.projectId,this.props.version.id,value.id).then((x) => {
        this.setState({...this.state, fixDefectsLoading: false, fixDefectsReady: true, fixDefectsList: x});
      });
    } else {
      this.setState({
        ...this.state,
        defect: {
          ...this.state.defect,
          [attr]: value
        }
      });
    }

  };

  modalShow = () => {
    this.setState({
      ...this.state,
      defect: null,
      showModal: true
    });
  };


  noFutureDate(current) {
    return current > moment().endOf('day');
  }
  noSmallerThanDate(current,date) {
    return current < moment(date);
  }

  modalOk = (e) => {

    //Required Inputs
    if ( !this.state.defect
      || !this.state.defect.discovered_time
      || !this.state.defect.phase_injected
      || !this.state.defect.defect_type
      || !this.state.defect.fixed_time
      || !this.state.defect.description
      || String(this.state.defect.description).trim() === ""
    ) {
      console.log(this.state.defect);
      message.warning('You must fill all the required inputs (marked with *)', 7);
      return true;
    }



    if (this.state.defect.id) {
      this.props.editDefect(this.props.studentId,this.props.projectId,this.props.version.id,this.props.phase.id,this.state.defect.id,this.state.defect);
    } else {
      this.props.createDefect(this.props.studentId,this.props.projectId,this.props.version.id,this.props.phase.id,this.state.defect);
    }
    this.props.onEdit(null);
    this.setState({ ...this.state, showModal: false, defect: null });
  };

  modalCancel = (e) => {
    this.setState({
      ...this.state,
      showModal: false,
      defect: null
    });
    this.props.onEdit(null);
  };

  modalRender = () => {
    return (
      <Form className="defectFormPopover" onSubmit={() => {}}>
        {this.state.defect && this.state.defect.id &&
        <FormItem
          {...formItemLayout}
          label="ID"
        >
          <InputNumber value={this.state.defect && this.state.defect.id?this.state.defect.id:null} onChange={value => this.handleChange('id', value)} disabled />
          <InputTooltip input="project_details_phase_defect_form_id" />
        </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label="* Discovered Time"
        >
          <DatePicker disabledDate={(date) => this.noFutureDate(date)} value={this.state.defect && this.state.defect.discovered_time?moment(this.state.defect.discovered_time):null} onChange={value => this.handleChange('discovered_time', value)} placeholder="Select date and time" showTime format="DD/MM/YYYY HH:mm:ss" />
          <InputTooltip input="project_details_phase_defect_form_discovered_time" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="* Phase Injected"
        >
          <Select value={this.state.defect && this.state.defect.phase_injected?String(this.state.defect.phase_injected.id):null} onChange={value => this.handleChange('phase_injected', {id: value})}>
            {this.props.version.phases.map((item, i) => item.psp_phase).reduce((x, y) => x.some( o => o && o.id && y && y.id && o.id === y.id)? x : [...x, y], []).filter(o => o && o.id).map((item, i) => {
              return (<Option key={item.id} value={String(item.id)}>{item.name}</Option>);
            })}
          </Select>
          <InputTooltip input="project_details_phase_defect_form_phase_injected" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="* Defect Type"
        >
          <Select value={this.state.defect && this.state.defect.defect_type?this.state.defect.defect_type:null} onChange={value => this.handleChange('defect_type', value)}>
            {DEFECT_TYPES.map((item, i) => {
              return (<Option key={i} value={item}>{item}</Option>);
            })}
          </Select>
          <InputTooltip input="project_details_phase_defect_form_defect_type" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="&nbsp;&nbsp;Fix Defect"
        >
          <Select value={this.state.defect && this.state.defect.fix_defect?this.state.defect.fix_defect:null} onChange={value => this.handleChange('fix_defect', value)} disabled={!this.state.fixDefectsReady}>
            <Option key="null" value="">&nbsp;</Option>
            {this.state.fixDefectsList.map((item, i) => {
              return (<Option key={item.id} value={String(item.id)}>{item.id} ({item.defect_type})</Option>);
            })}
          </Select>
          {this.state.fixDefectsLoading && <Icon type="loading" style={{marginLeft: '15px'}} />}
          {!this.state.fixDefectsLoading && <InputTooltip input="project_details_phase_defect_form_fix_defect" />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="* Fixed Time"
        >
          <DatePicker placement={navigator.platform.toUpperCase().indexOf('MAC')>=0?'bottomLeft':'topLeft'} disabledDate={(date) => this.noFutureDate(date) || this.noSmallerThanDate(date,this.state.defect.discovered_time)} value={this.state.defect && this.state.defect.fixed_time?moment(this.state.defect.fixed_time):null} onChange={value => this.handleChange('fixed_time', value)} placeholder="Select date and time" showTime format="DD/MM/YYYY HH:mm:ss" disabled={!this.state.defect || !this.state.defect.discovered_time} />
          <InputTooltip input="project_details_phase_defect_form_fixed_time" />
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="* Description"
        >
          <TextArea autosize={{minRows:3}} value={this.state.defect && this.state.defect.description?this.state.defect.description:null} onChange={e => this.handleChange('description', e.target.value)} />
          <InputTooltip input="project_details_phase_defect_form_comments" />
        </FormItem>

      </Form>
    );
  };


  render() {
    return (
      <div>
        <Button className="logNewDefect" icon="plus" type="boton1" onClick={this.modalShow} disabled={!this.props.canEdit}>Record New Defect</Button>
        {this.props.canEdit &&
        <Modal
          confirmLoading={this.props.creating || this.props.editing}
          title={this.state.defect && this.state.defect.id?'Edit a recorded defect':'Record new defect'}
          visible={this.state.showModal}
          okText="Save"
          onOk={this.modalOk}
          onCancel={this.modalCancel}
          okType="primary"
        >
            {this.modalRender()}
        </Modal>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    created: state.projects.project_version_phase_create_finish,
    edited: state.projects.project_version_phase_edit_finish,
    deleted: state.projects.project_version_phase_delete_finish,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDefect: (userid,projectid,versionid,phaseid,defect) => {
      defect.phase_injected_id = defect.phase_injected.id;
      dispatch(createDefectOnProjectVersionPhase(userid,projectid,versionid,phaseid,defect)).payload.then((result) => {
        if (true) {
          dispatch(createDefectOnProjectVersionPhaseSuccess(result));
        } else {
          dispatch(createDefectOnProjectVersionPhaseFailure(result.error));
        }
      });
    },

    editDefect: (userid,projectid,versionid,phaseid,defectid,defect) => {
      defect.phase_injected_id = defect.phase_injected.id;
      dispatch(editDefectOnProjectVersionPhase(userid,projectid,versionid,phaseid,defectid,defect)).payload.then((result) => {
        if (true) {
          dispatch(editDefectOnProjectVersionPhaseSuccess(result));
        } else {
          dispatch(editDefectOnProjectVersionPhaseFailure(result.error));
        }
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefectForm);
