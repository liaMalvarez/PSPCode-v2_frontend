import React, { Component, PropTypes } from 'react';
import { Link,hashHistory } from 'react-router';
import {connect, Provider} from 'react-redux';
import moment from 'moment';
import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import TagProcess from '../components/tag/TagProcess';
import TagTutor from '../components/tag/TagTutor';
import TagLanguage from '../components/tag/TagLanguage';
import TagVersion from '../components/tag/TagVersion';
import InputTooltip from '../components/common/InputTooltip';
import TagInstructions from '../components/tag/TagInstructions';
import projectApi from '../api/projectApi';
import { PROJECT_STATUS, TEXTS } from '../constants/constants';
import {
  fetchProjectDetails, fetchProjectDetailsFailure, fetchProjectDetailsSuccess, fetchProjectDetailsVersion,
  fetchProjectDetailsVersionSuccess, fetchProjectDetailsVersionFailure, fetchProjectDetailsVersionSummary,
  fetchProjectDetailsVersionSummarySuccess, fetchProjectDetailsVersionSummaryFailure, submitProjectVersion,
  submitProjectVersionFailure, submitProjectVersionReset, submitProjectVersionSuccess, professorProjectApprove,
  professorProjectApproveFailure, professorProjectApproveSuccess, professorProjectReject, professorProjectRejectFailure,
  professorProjectRejectSuccess, startProject, startProjectSuccess, startProjectFailure,
  continueProject, continueProjectSuccess, continueProjectFailure, resetProjectDetails, resetProjectDetailsVersion
} from '../actions/projectActions';
import ProjectDetailsSummary from '../components/project/ProjectDetailsSummary';
import ProjectDetailsPhases from '../components/project/ProjectDetailsPhases';
import ProjectDetailsMessages from '../components/project/ProjectDetailsMessages';
import ProjectDetailsFiles from '../components/project/ProjectDetailsFiles';
import WorkingTime from '../components/project/detail/WorkingTime';
import ProfessorSider from "../components/layout/ProfessorSider";
import SpanData from "../components/common/SpanData";
import CustomProgress from "../components/common/CustomProgress";
import {pspDataFetch, pspDataFetchFailure, pspDataFetchSuccess} from "../actions/utilsActions";

const Layout = require('antd/lib/layout');
const Sider = require('antd/lib/layout/Sider');
const Tabs = require('antd/lib/tabs');
const Spin = require('antd/lib/spin');
const Modal = require('antd/lib/modal');
const Timeline = require('antd/lib/timeline');
const TimelineItem = require('antd/lib/timeline/TimelineItem');
const Icon = require('antd/lib/icon');
const Breadcrumb = require('antd/lib/breadcrumb');
const Button = require('antd/lib/button');
const InputNumber = require('antd/lib/input-number');
const message = require('antd/lib/message');
const Popover = require('antd/lib/popover');
const Progress = require('antd/lib/progress');
const Upload = require('antd/lib/upload');
const Form = require('antd/lib/form');
const TextArea = require('antd/lib/input/TextArea');
require('antd/dist/antd.css');

const { Content } = Layout;
const FormItem = Form.Item;

const TabPane = Tabs.TabPane;
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


class ProjectDetailsPage extends Component {


  constructor(props) {
    super(props);

    this.state = {
      defaultActiveKey: props.params.tab?props.params.tab:"summary",
      modalUpdateLOCs: { total: '', new_reusable: '' },
      redeliver: false,
    };
  }


  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {

    if (!this.props.psp_data) {
      this.props.fetchPSPData();
    }

  }

  componentWillReceiveProps(nextProps) {

    if(this.props.tab !== nextProps.tab) {
      this.changeTab(nextProps.tab);
    }

    if (this.props.project_data && this.props.project_id != nextProps.project_id) {
      this.props.reset();
    }

    if (!nextProps.project_data && !nextProps.project_loading && !nextProps.version_loading) {
      if (nextProps.session && (nextProps.session.user.role === 'professor' || nextProps.session.user.id == nextProps.studentId)) {
        this.props.fetchProjectDetails(nextProps.studentId,nextProps.project_id);
      } else {
        //todavia no cargo usuario o hack detected.
      }
    }

    if (nextProps.project_data && !nextProps.project_loading && !nextProps.project_error && !nextProps.version_loading && !nextProps.version_error && !nextProps.version_data) {
      const lastVersionID = nextProps.project_data.timeline[nextProps.project_data.timeline.length - 1].version.id;
      this.props.fetchProjectDetailsVersion(this.props.studentId,this.props.project_id,lastVersionID);
    }
    if (this.state.redeliver && nextProps.project_data && nextProps.version_data) {
      const lastVersionID = nextProps.project_data.timeline[nextProps.project_data.timeline.length - 1].version.id;
      if (this.props.version_data.id !== lastVersionID) {
      this.props.fetchProjectDetailsVersion(this.props.studentId,this.props.project_id,lastVersionID);
      this.setState({...this.state, redeliver:false});
      }
    }


    if (this.message_rejecting && nextProps.finished_rejecting) {
      this.message_rejecting();
      this.message_rejecting = null;
    }
    if (this.message_starting && nextProps.finished_starting) {
      this.message_starting();
      this.message_starting = null;
    }
    if (this.message_continueing && nextProps.finished_continueing) {
      this.message_continueing();
      this.message_continueing = null;
    }
    if (this.message_approving && nextProps.finished_approving) {
      this.message_approving();
      this.message_approving = null;
    }
  }

  correctProject = verdict => {
    const _this = this;
    this.setState({...this.state, correctProject: {message: '', file: ''}});

    const uploaderProps = {
      name: 'file',
      multiple: false,
      showUploadList: true,
    };

    const modalContent = () => {
      return (
        <div className="modalCorrectProject">
          <div>
            {verdict === 'approved' ? TEXTS.project_details_modal_correctproject_text_approved : TEXTS.project_details_modal_correctproject_text_not_approved}
            <br /><br />
            <b>Attach Grading Checklist: </b>
            <br/>
            <Upload {...uploaderProps} customRequest={(x) => this.setState({...this.state, correctProject: {...this.state.correctProject, file: x.file}}) }>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
            <br /><br />
            <b>Message: </b>
          </div>
          <Form onSubmit={() => {}}>

            <TextArea autosize={{minRows:4}} placeholder={verdict === 'approved' ? TEXTS.project_details_modal_correctproject_veredict_placeholder_approved : TEXTS.project_details_modal_correctproject_veredict_placeholder_not_approved } onChange={e => this.setState({...this.state, correctProject: {...this.state.correctProject, message: e.target.value}})} />
          </Form>
        </div>
      );
    };

    Modal.confirm({
      title: 'Are you sure?',
      content: modalContent(),
      width: 600,
      okText: (verdict === 'approved')?'Yes, Approve this Project':'Yes, Reject this Project',
      okType: 'primary',
      cancelText: 'No, Cancel',
      onOk() {
        if(_this.state.correctProject.message.length<1 && _this.state.correctProject.file == '') {
          message.warning('You must attach the grading checklist file or write a message', 7);
          return true;
        }
        if(verdict === 'approved') {
          _this.message_approving = message.loading('Approving this Project', 0);
          _this.props.approveProject(_this.props.project_data.course.id, _this.props.project_data.course_project_instance.id, _this.props.project_data.id, _this.state.correctProject);
        } else {
          _this.message_rejecting = message.loading('Rejecting this Project', 0);
          _this.props.rejectProject(_this.props.project_data.course.id, _this.props.project_data.course_project_instance.id, _this.props.project_data.id, _this.state.correctProject);
        }
      },
      onCancel() {
      },
    });
  };

  printTimeLine = () => {
    return this.props.project_data.timeline.map((item, i) => {

      return (<TimelineItem dot={<div />} color={PROJECT_STATUS[item.status].color} key={i}>{PROJECT_STATUS[item.status].name}<br />{new Date(item.date).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TimelineItem>)
    });
  };

  submissionChecklist = () => {
    const checklist = [];

    if (this.props.psp_data.processes.find(o => o.process.id == this.props.project_data.psp_project.process.id).process.phases.some(o => o && o.first)) {
      checklist.push({
        key: 'first_phase',
        message: 'The first phase is ' + this.props.psp_data.processes.find(o => o.process.id == this.props.project_data.psp_project.process.id).process.phases.find(o => o && o.first).name,
        valid: (this.props.version_data.phases.length > 0 && this.props.version_data.phases[0].psp_phase && this.props.version_data.phases[0].psp_phase.id === this.props.psp_data.processes.find(o => o.process.id == this.props.project_data.psp_project.process.id).process.phases.find(o => o && o.first).id)
      });
    }

    if (this.props.project_data.timeline[this.props.project_data.timeline.length - 1].version.version === 1 && this.props.psp_data.processes.find(o => o.process.id == this.props.project_data.psp_project.process.id).process.phases.some(o => o && o.last)) {
      checklist.push({
        key: 'last_phase',
        message: 'The last phase is ' + this.props.psp_data.processes.find(o => o.process.id == this.props.project_data.psp_project.process.id).process.phases.find(o => o && o.last).name,
        valid: (this.props.version_data.phases.length > 0 && this.props.version_data.phases[this.props.version_data.phases.length - 1].psp_phase && this.props.version_data.phases[this.props.version_data.phases.length - 1].psp_phase.id === this.props.psp_data.processes.find(o => o.process.id == this.props.project_data.psp_project.process.id).process.phases.find(o => o && o.last).id)
      });
    }

    checklist.push({
      key: 'all_phase_have_time',
      message: 'All the phases have start and end time',
      valid: this.props.version_data.phases.reduce((acc,x)=> acc && x.start_time !== null && x.end_time !== null,true)
    });

    checklist.push({
      key: 'zip_uploaded',
      message: 'You have attached the zip file',
      valid: (this.props.version_data.file)
    });

    return {
      list: checklist,
      canSubmit: (typeof checklist.find(o => !o.valid) === 'undefined')
    };
  };

  modalUpdateLOCs = (data) => {
    return (
      <Form className="modalUpdateLOCs" onSubmit={() => {}}>

        <p>Enter the actual size data for <b>{data.name}</b>.</p>
        <br />

        <FormItem label="Base (B)" style={{display:'none'}}>
          <InputNumber min={0} value={0} disabled={true} />
        </FormItem>

        <FormItem label="Deleted (D)" style={{display:'none'}}>
          <InputNumber min={0} value={0} disabled={true} />
        </FormItem>

        <FormItem label="Modified (M)" style={{display:'none'}}>
          <InputNumber min={0} value={0} disabled={true} />
        </FormItem>

        <FormItem label="Added (A)">
          <InputNumber min={0} ref={(input) => this.inputModalUpdateLOCsAdded = input.inputNumberRef} disabled={true} />
        </FormItem>

        <FormItem label="Added + Modified (A&M)">
          <InputNumber min={0} ref={(input) => this.inputModalUpdateLOCsAM = input.inputNumberRef} disabled={true} />
        </FormItem>

        <FormItem label="* Total (T)">
          <InputNumber min={0} onChange={(v) => {this.inputModalUpdateLOCsAdded.setValue(v); this.inputModalUpdateLOCsAM.setValue(v); this.setState({...this.state, modalUpdateLOCs: {...this.state.modalUpdateLOCs, total: v}});}} />
        </FormItem>

        <FormItem label="* New Reusable (NR)">
          <InputNumber min={0} onChange={(value) => this.setState({...this.state, modalUpdateLOCs: {...this.state.modalUpdateLOCs, new_reusable: value}})} />
        </FormItem>
      </Form>
    );
  };

  submitProject = () => {
    if (this.props.submitting) {
      return;
    }
    const _this = this;

    _this.message_validating = message.loading('Validating, wait a second', 0);

    projectApi.first_project(this.props.studentId).then((data) => {

      _this.message_validating();

      const need_to_update_locs = data.phase_instance && (data.phase_instance.total == null || data.phase_instance.total==0);
      if (!need_to_update_locs) {
        Modal.confirm({
          title: 'Confirmation Required',
          content: 'Are you sure you want to submit your project? This operation can\'t be undone.',
          okText: 'Yes',
          okType: 'success',
          cancelText: 'No',
          onOk() {
            _this.props.submitProjectVersion(_this.props.studentId, _this.props.project_id);
          },
          onCancel() {
          },
        });
      } else {
        Modal.confirm({
          title: 'Action Required',
          content: this.modalUpdateLOCs(data),
          okText: 'Save',
          okType: 'primary',
          cancelText: 'Cancel',
          onOk() {

            //Required Inputs
            if ( !_this.state.modalUpdateLOCs.total>0
              || _this.state.modalUpdateLOCs.new_reusable === ""
            ) {
              message.warning('You must fill all the required inputs (marked with *)', 7);
              return true;
            }
            _this.message_updating_locs = message.loading('Updating, wait a second', 0);
            projectApi.assigned_project_version_phases_update(_this.props.studentId,data.id,data.project_delivery_id,data.phase_instance.id,{modified:0, deleted: 0, reused: 0, new_reusable: _this.state.modalUpdateLOCs.new_reusable, total: _this.state.modalUpdateLOCs.total}).then((x) => {
              _this.message_updating_locs();
              _this.submitProject();
            });
          },
          onCancel() {
          },
        });
      }

    }).catch((data) => {
      console.log('Something went wrong fetching user');
      console.log(data);
    });







  };

  startProject = () => {

    const required_attrs = ['academic_experience', 'collegue_career_progress', 'programming_experience', 'programming_language'];
    const background_ok = required_attrs.reduce((x, y) => x && this.props.session.user[y] && this.props.session.user[y].length > 0, true);

    if (background_ok) {
      this.message_starting = message.loading('Getting all ready, wait a second', 0);
      this.props.startProject(this.props.studentId,this.props.project_id);
    } else {
      const _this = this;
      Modal.confirm({
        title: 'Action Required',
        content: 'Before start working on a project you must update your personal background.',
        okText: 'Update my profile',
        okType: 'primary',
        cancelText: 'Cancel',
        onOk() {
          hashHistory.push('/users/' + _this.props.session.user.id + "/returntoproject/" + _this.props.project_id);
        },
        onCancel() {
        },
      });
    }

  };
  continueProject = () => {
    this.message_continueing = message.loading('Generating a new version, wait a second', 0);
    this.props.continueProject(this.props.studentId,this.props.project_id);
    this.setState({...this.state, redeliver:true});
  };

  printStatusButtons = () => {

    if (this.props.project_data.timeline[this.props.project_data.timeline.length - 1].version.id !== this.props.version_data.id) {
      return (
        <div className="submitProjectBtn">
          <span>Reviewing Old Version</span>
        </div>
      );
    }

    if (this.props.session.user.role === 'professor' && this.props.version_data.status === 'being_corrected') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Approve this project" placement="topLeft">
            <Button type="boton1" icon="check" shape="circle" onClick={() => this.correctProject('approved')} />
          </Popover>
          <Popover content="This project needs correction" placement="topLeft">
            <Button type="danger" icon="close" shape="circle" onClick={() => this.correctProject('need_correction')} />
          </Popover>
        </div>
      );
    } else if (this.props.session.user.role === 'student' && this.props.version_data.status === 'working') {

      const checklist = this.submissionChecklist();

      const submissionChecklistPopover = (
        <div className="submission-checklist">
          {checklist.list.map((value, index) => {
            return (<span key={value.key} className={value.valid?'success':'danger'}><Icon type={value.valid?'check-circle':'close-circle'} />{value.message}</span>);
          })}
        </div>
      );


      return (
        <div className="submitProjectBtn">
          <Popover title="Submission checklist" content={submissionChecklistPopover} placement="leftBottom">
            <Button onClick={this.submitProject} icon={this.props.submitting?'loading':'upload'} type="boton1" disabled={!checklist.canSubmit}>Submit to {this.props.project_data.professor.first_name}</Button>
          </Popover>
        </div>
      );
    } else if (this.props.session.user.role === 'student' && this.props.version_data.status === 'assigned') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Click here to allow phases recording" placement="leftBottom">
            <Button onClick={this.startProject} icon='right' type="boton1">Start {this.props.project_data.psp_project.name}</Button>
          </Popover>
        </div>
      );
    } else if (this.props.session.user.role === 'student' && this.props.version_data.status === 'need_correction') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Click here, make your corrections and submit it again" placement="leftBottom">
            <Button onClick={this.continueProject} icon='right' type="boton1">Continue {this.props.project_data.psp_project.name}</Button>
          </Popover>
        </div>
      );
    } else {
    }

    //Submit for review. Approve. Needs Correction.
  };

  renderWorkingTime = () => {
    const plan = this.props.version_data.phases.find(o => o.plan_time);
    const popOverText = (
      <div>
        This is the actual working time for this project.
        {plan && (
          <span>
            <br />You projected {plan.plan_time} minutes.
          </span>
        )}
      </div>
    );
    return (
      <Popover title="Working Time" content={popOverText} placement="bottom">
        <div className="projectTime"><WorkingTime phases={this.props.version_data.phases} working={(this.props.version_data.status === 'working')} actualTime={this.props.version_data.summary && this.props.version_data.summary.phases && this.props.version_data.summary.phases.some(o => o.metric == 'TOTAL')? this.props.version_data.summary.phases.find(o => o.metric == 'TOTAL').actual : 0} /></div>
      </Popover>
    );
  };

  adminExportData = () => {
    console.log(' ');
    console.log(' ');
    console.log(' ');
    console.log('********************************************************');
    console.log('******************** EXPORTING DATA ********************');
    console.log('********************************************************');
    console.log('**** PROJECT DATA **************************************');
    console.log(JSON.stringify(this.props.project_data));
    console.log('********************************************************');
    console.log(' ');
    console.log('**** VERSION DATA **************************************');
    console.log(JSON.stringify(this.props.version_data));
    console.log('********************************************************');
    console.log('********************************************************');
    console.log(' ');
    console.log(' ');
    console.log(' ');
  };

  changeTab(key) {
    const allowed_tabs = ['summary', 'phases', 'files', 'messages'];
    key = allowed_tabs.some((x) => x === key)?key:allowed_tabs[0];

    if (key === "summary" && this.props.version_data) {
      this.props.fetchProjectDetailsVersionSummary(this.props.studentId,this.props.project_id,this.props.version_data.id);
    }
    this.setState({ ...this.state, defaultActiveKey: key});

  }

  goToTab(key) {
    hashHistory.push('/students/' + this.props.studentId + "/projects/" + this.props.project_id + '/' + key);
  }




  render() {

    if (this.props.project_loading || !this.props.project_data) {
      return (<CustomProgress />);
    }
    if (!this.props.version_loading && !this.props.version_error && !this.props.version_data) {
      return (<CustomProgress />);
    }
    if (this.props.version_loading || !this.props.version_data) {
      return (<CustomProgress />);
    }
    if (this.props.session.user.role !== 'professor' && this.props.session.user.id != this.props.studentId) {
      return (<CustomProgress />);
    }

    return (
      <Layout>
        <CustomHeader/>
        <Layout className="projectDetails">
          <ProfessorSider selected="dashboard.students" />
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
              {this.props.session.user.role !== 'professor' && <Breadcrumb.Item><Link to={"/students/" + this.props.studentId + "/projects"}>Projects</Link></Breadcrumb.Item>}
              {this.props.session.user.role === 'professor' && <Breadcrumb.Item><Link to={"/professor/dashboard/students"}>Students</Link></Breadcrumb.Item>}
              {this.props.session.user.role === 'professor' && <Breadcrumb.Item><Link to={"/users/" + this.props.studentId + ""}><SpanData entityName="student" entityId={this.props.studentId} loading output="first_name" /></Link></Breadcrumb.Item>}
              {this.props.session.user.role === 'professor' && <Breadcrumb.Item><Link to={"/students/" + this.props.studentId + "/projects"}>Projects</Link></Breadcrumb.Item>}
              <Breadcrumb.Item>{this.props.project_data.psp_project.name}</Breadcrumb.Item>
            </Breadcrumb>
            <h1>{this.props.project_data.psp_project.name}</h1>
            <section style={{textAlign: 'right'}}>
              <TagInstructions link={this.props.project_data.psp_project.instructions} deadline={this.props.project_data.psp_project.deadline} />
              <TagProcess {...this.props.project_data.psp_project.process} />
              <TagTutor {...this.props.project_data.professor} />
              <TagLanguage language={this.props.project_data.language} />
              <TagVersion active={this.props.version_data} timeline={this.props.project_data.timeline} onChange={this.props.fetchProjectDetailsVersion} idstudent={this.props.studentId} idproject={this.props.project_id} />

            </section>
            <section>
              <Tabs tabBarExtraContent={this.renderWorkingTime()} activeKey={this.state.defaultActiveKey} onChange={(key) => this.goToTab(key)}>
                <TabPane tab="SUMMARY" key="summary">
                  <ProjectDetailsSummary studentId={this.props.studentId} project={this.props.project_data} version={this.props.version_data} />
                </TabPane>
                <TabPane tab="PHASES" key="phases">
                  <ProjectDetailsPhases studentId={this.props.studentId} project={this.props.project_data} version={this.props.version_data} />
                </TabPane>
                <TabPane tab="FILES" key="files">
                  <ProjectDetailsFiles studentId={this.props.studentId} project={this.props.project_data} version={this.props.version_data} />
                </TabPane>
                <TabPane tab="MESSAGES" key="messages">
                  <ProjectDetailsMessages studentId={this.props.studentId} project={this.props.project_data} />
                </TabPane>
              </Tabs>
            </section>

            <CustomFooter/>

          </Content>

          <Sider>
            <div className="box">
              <h2>Project Timeline</h2>
              <Timeline>
                {this.printTimeLine()}
              </Timeline>
            </div>
            {this.printStatusButtons()}
            <div>
              <Link onClick={this.adminExportData}>.</Link>
            </div>
          </Sider>
        </Layout>

      </Layout>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {

    studentId: ownState.params.idstudent,
    project_id: ownState.params.idproject,
    tab: ownState.params.tab,

    session: state.session,

    psp_data: state.utils.psp_data,

    project_data: state.projects.active.general.project,
    project_loading: state.projects.active.general.loading,
    project_error: state.projects.active.general.error,

    version_data: state.projects.active.version.version,
    version_loading: state.projects.active.version.loading,
    version_error: state.projects.active.version.error,

    submitting: state.projects.project_version_submitting,

    finished_starting: state.projects.project_version_finished_starting,
    finished_continueing: state.projects.project_version_finished_continueing,
    finished_rejecting: state.projects.project_version_finished_rejecting,
    finished_approving: state.projects.project_version_finished_approving,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPSPData: () => {
      dispatch(pspDataFetch()).payload.then((result) => {
        if (true) {
          dispatch(pspDataFetchSuccess(result));
        } else {
          dispatch(pspDataFetchFailure(result.error));
        }
      });
    },
    fetchProjectDetails: (userid,projectid) => {
      dispatch(fetchProjectDetails(userid,projectid)).payload.then((result) => {
        if (true) {
          dispatch(fetchProjectDetailsSuccess(result));
        } else {
          dispatch(fetchProjectDetailsFailure(result.error));
        }
      });
    },
    fetchProjectDetailsVersion: (userid,projectid,versionid) => {
      dispatch(fetchProjectDetailsVersion(userid,projectid,versionid)).payload.then((result) => {
        if (true) {
          dispatch(fetchProjectDetailsVersionSuccess(result));
        } else {
          dispatch(fetchProjectDetailsVersionFailure(result.error));
        }
      });
    },
    fetchProjectDetailsVersionSummary: (userid,projectid,versionid) => {
      dispatch(fetchProjectDetailsVersionSummary(userid,projectid,versionid)).payload.then((result) => {
        if (true) {
          dispatch(fetchProjectDetailsVersionSummarySuccess(result));
        } else {
          dispatch(fetchProjectDetailsVersionSummaryFailure(result.error));
        }
      });
    },
    startProject: (userid,projectid) => {
      dispatch(startProject(userid,projectid)).payload.then((result) => {
        if (true) {
          dispatch(startProjectSuccess(result));
        } else {
          dispatch(startProjectFailure(result.error));
        }
      });
    },
    continueProject: (userid,projectid) => {
      dispatch(continueProject(userid,projectid)).payload.then((result) => {
        if (true) {
          dispatch(continueProjectSuccess(result));
        } else {
          dispatch(continueProjectFailure(result.error));
        }
      });
    },
    submitProjectVersion: (userid,projectid) => {
      dispatch(submitProjectVersion(userid,projectid)).payload.then((result) => {
        if (true) {
          dispatch(submitProjectVersionSuccess(result));
        } else {
          dispatch(submitProjectVersionFailure(result.error));
        }
      });
    },
    approveProject: (courseId,projectId,assignedProjectId,data) => {
      dispatch(professorProjectApprove(courseId,projectId,assignedProjectId,data)).payload.then((result) => {
        if (true) {
          dispatch(professorProjectApproveSuccess(result));
        } else {
          dispatch(professorProjectApproveFailure(result.error));
        }
      });
    },
    rejectProject: (courseId,projectId,assignedProjectId,data) => {
      dispatch(professorProjectReject(courseId,projectId,assignedProjectId,data)).payload.then((result) => {
        if (true) {
          dispatch(professorProjectRejectSuccess(result));
        } else {
          dispatch(professorProjectRejectFailure(result.error));
        }
      });
    },
    reset: () => {
       dispatch(resetProjectDetails());
       dispatch(resetProjectDetailsVersion());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage);
