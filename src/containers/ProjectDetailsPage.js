import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import cs from 'classnames';
import {
  CloudUploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
  HomeOutlined,
  CloseOutlined,
  LoadingOutlined,
  UploadOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Breadcrumb,
  Tabs,
  Modal,
  Timeline,
  Button,
  InputNumber,
  message,
  Popover,
  Upload,
  Form,
  Input,
} from 'antd';

import TagVersion from '../components/TagVersion';
import CustomTag from '../components/CustomTag';
import ProjectDetailsSummary from '../components/project/ProjectDetailsSummary';
import ProjectDetailsPhases from '../components/project/ProjectDetailsPhases';
import ProjectDetailsMessages from '../components/project/ProjectDetailsMessages';
import ProjectDetailsFiles from '../components/project/ProjectDetailsFiles';
import WorkingTime from '../components/project/detail/WorkingTime';
import ProfessorSider from '../components/layout/ProfessorSider';
import SpanData from '../components/common/SpanData';
import CustomProgress from '../components/common/CustomProgress';

import projectApi from '../api/projectApi';
import { PROJECT_STATUS, TEXTS } from '../constants/constants';
import {
  fetchProjectDetails, fetchProjectDetailsSuccess, fetchProjectDetailsVersion,
  fetchProjectDetailsVersionSuccess, fetchProjectDetailsVersionSummary,
  fetchProjectDetailsVersionSummarySuccess, submitProjectVersion,
  submitProjectVersionSuccess, professorProjectApprove,
  professorProjectApproveSuccess, professorProjectReject,
  professorProjectRejectSuccess, startProject, startProjectSuccess,
  continueProject, continueProjectSuccess, resetProjectDetails, resetProjectDetailsVersion,
} from '../actions/projectActions';
import { pspDataFetch, pspDataFetchSuccess } from '../actions/utilsActions';

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;
const FormItem = Form.Item;

const ProjectDetailsPage = ({
  reset,
  psp_data,
  fetchPSPData,
  project_data,
  session,
  project_loading,
  startProjectProp,
  fetchProjectDetailsProp,
  fetchProjectDetailsVersionProp,
  approveProject,
  rejectProject,
  version_data,
  submitting,
  submitProjectVersionProp,
  continueProjectProp,
  version_error,
  version_loading,
  finished_rejecting,
  finished_starting,
  project_error,
  finished_continueing,
  finished_approving,
  fetchProjectDetailsVersionSummaryProp,
}) => {
  const navigate = useNavigate();
  const { idstudent: studentId, idproject: project_id, tab } = useParams();

  const [defaultActiveKey, setDefaultActiveKey] = useState(tab || 'summary');
  const [modalUpdateLOCs, setModalUpdateLOCs] = useState({ total: '', new_reusable: '' });
  const [redeliver, setRedeliver] = useState(false);
  const [correctProject, setCorrectProject] = useState({});
  const [messageRejecting, setMessageRejecting] = useState(false);
  const [messageStarting, setMessageStarting] = useState(false);
  const [messageContinueing, setMessageContinueing] = useState(false);
  const [messageApproving, setMessageApproving] = useState(false);
  const [inputModalUpdateLOCsAdded, setInputModalUpdateLOCsAdded] = useState(null);
  const [inputModalUpdateLOCsAM, setInputModalUpdateLOCsAM] = useState(null);
  const [isOpenSider, setIsOpenSider] = useState(false);

  const changeTab = (key) => {
    const allowed_tabs = ['summary', 'phases', 'files', 'messages'];
    key = allowed_tabs.some((x) => x === key) ? key : allowed_tabs[0];

    if (key === 'summary' && version_data) {
      fetchProjectDetailsVersionSummaryProp(studentId, project_id, version_data.id);
    }
    setDefaultActiveKey(key);
  };

  useEffect(() => {
    if (!psp_data) {
      fetchPSPData();
    }

    setTimeout(() => setIsOpenSider(true), 1100);

    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (project_data) { // FIX que solo ejecute si project_id cambia
      reset();
    }
  }, [project_id]);

  useEffect(() => {
    changeTab(tab);
  }, [tab]);

  useEffect(() => {
    if (!project_data && !project_loading && !version_loading) {
      if (session && (session.user.role === 'professor' || session.user.id == studentId)) {
        fetchProjectDetailsProp(studentId, project_id);
      } else {
        // todavia no cargo usuario o hack detected.
      }
    }

    if (project_data
      && !project_loading
      && !project_error
      && !version_loading
      && !version_error
      && !version_data) {
      const lastVersionID = project_data.timeline[project_data.timeline.length - 1].version.id;
      fetchProjectDetailsVersionProp(studentId, project_id, lastVersionID);
    }
    if (redeliver && project_data && version_data) {
      const lastVersionID = project_data.timeline[project_data.timeline.length - 1].version.id;
      if (version_data.id !== lastVersionID) {
        fetchProjectDetailsVersionProp(studentId, project_id, lastVersionID);
        setRedeliver(false);
      }
    }

    if (messageRejecting && finished_rejecting) {
      message.loading('Rejecting this Project', 4);
      setMessageRejecting(false);
    }
    if (messageStarting && finished_starting) {
      message.loading('Getting all ready, wait a second', 3);
      setMessageStarting(false);
    }
    if (messageContinueing && finished_continueing) {
      message.loading('Generating a new version, wait a second', 3);
      setMessageContinueing(false);
    }
    if (messageApproving && finished_approving) {
      message.loading('Approving this Project', 3);
      setMessageApproving(false);
    }
  }, [
    project_id,
    project_data,
    project_error,
    project_loading,
    version_loading,
    session, studentId,
    version_data,
    finished_rejecting,
    finished_starting,
    finished_continueing,
    finished_approving,
  ]);

  const correctProjectFunc = (verdict) => {
    setCorrectProject({ message: '', file: '' });

    const uploaderProps = {
      name: 'file',
      multiple: false,
      showUploadList: true,
    };

    const modalContent = () => (
      <div className="modalCorrectProject">
        <div>
          {verdict === 'approved' ? TEXTS.project_details_modal_correctproject_text_approved : TEXTS.project_details_modal_correctproject_text_not_approved}
          <br />
          <br />
          <b>Attach Grading Checklist: </b>
          <br />
          <Upload
            {...uploaderProps}
            customRequest={(x) => setCorrectProject({ ...correctProject, file: x.file })}
          >
            <Button>
              <CloudUploadOutlined />
              {' '}
              Click to Upload
            </Button>
          </Upload>
          <br />
          <br />
          <b>Message: </b>
        </div>
        <Form onSubmit={() => {}}>
          <TextArea autosize={{ minRows: 4 }} placeholder={verdict === 'approved' ? TEXTS.project_details_modal_correctproject_veredict_placeholder_approved : TEXTS.project_details_modal_correctproject_veredict_placeholder_not_approved} onChange={(e) => setCorrectProject({ ...correctProject, message: e.target.value })} />
        </Form>
      </div>
    );

    Modal.confirm({
      title: 'Are you sure?',
      content: modalContent(),
      width: 600,
      okText: (verdict === 'approved') ? 'Yes, Approve this Project' : 'Yes, Reject this Project',
      okType: 'primary',
      cancelText: 'No, Cancel',
      onOk() {
        if (correctProject.message.length < 1 && correctProject.file == '') {
          message.warning('You must attach the grading checklist file or write a message', 7);
          return true;
        }
        if (verdict === 'approved') {
          setMessageApproving(true);
          approveProject(
            project_data.course.id,
            project_data.course_project_instance.id,
            project_data.id,
            correctProject,
          );
        } else {
          setMessageRejecting(true);
          rejectProject(
            project_data.course.id,
            project_data.course_project_instance.id,
            project_data.id,
            correctProject,
          );
        }
      },
      onCancel() {
      },
    });
  };

  const printTimeLine = () => project_data.timeline.map((item, i) => (
    <Timeline.Item dot={<div />} color={PROJECT_STATUS[item.status].color} key={i}>
      {PROJECT_STATUS[item.status].name}
      <br />
      {new Date(item.date).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' })}
    </Timeline.Item>
  ));

  const submissionChecklist = () => {
    const checklist = [];

    if (psp_data.processes.find((o) => o.process.id == project_data.psp_project.process.id)
      .process.phases.some((o) => o && o.first)) {
      checklist.push({
        key: 'first_phase',
        message: `The first phase is 
        ${psp_data.processes.find((o) => o.process.id == project_data.psp_project.process.id).process.phases.find((o) => o && o.first).name}`,
        valid: (version_data.phases.length > 0
          && version_data.phases[0].psp_phase
          && version_data.phases[0].psp_phase.id === psp_data.processes
            .find((o) => o.process.id == project_data.psp_project.process.id)
            .process.phases.find((o) => o && o.first).id),
      });
    }

    if (project_data.timeline[project_data.timeline.length - 1].version.version === 1
      && psp_data.processes.find((o) => o.process.id == project_data.psp_project.process.id)
        .process.phases.some((o) => o && o.last)) {
      checklist.push({
        key: 'last_phase',
        message: `The last phase is ${psp_data.processes.find((o) => o.process.id == project_data.psp_project.process.id).process.phases.find((o) => o && o.last).name}`,
        valid: (version_data.phases.length > 0
          && version_data.phases[version_data.phases.length - 1].psp_phase
          && version_data.phases[version_data.phases.length - 1].psp_phase.id === psp_data.processes
            .find((o) => o.process.id == project_data.psp_project.process.id)
            .process.phases.find((o) => o && o.last).id),
      });
    }

    checklist.push({
      key: 'all_phase_have_time',
      message: 'All the phases have start and end time',
      valid: version_data.phases.reduce((acc, x) => acc
        && x.start_time !== null && x.end_time !== null, true),
    });

    checklist.push({
      key: 'zip_uploaded',
      message: 'You have attached the zip file',
      valid: (version_data.file),
    });

    return {
      list: checklist,
      canSubmit: (typeof checklist.find((o) => !o.valid) === 'undefined'),
    };
  };

  const modalUpdateLOCsFunc = (data) => (
    <Form className="modalUpdateLOCs" onSubmit={() => {}}>

      <p>
        Enter the actual size data for
        <b>{data.name}</b>
        .
      </p>
      <br />

      <FormItem label="Base (B)" style={{ display: 'none' }}>
        <InputNumber min={0} value={0} disabled />
      </FormItem>

      <FormItem label="Deleted (D)" style={{ display: 'none' }}>
        <InputNumber min={0} value={0} disabled />
      </FormItem>

      <FormItem label="Modified (M)" style={{ display: 'none' }}>
        <InputNumber min={0} value={0} disabled />
      </FormItem>

      <FormItem label="Added (A)">
        <InputNumber
          min={0}
          ref={(input) => setInputModalUpdateLOCsAdded(input.inputNumberRef)}
          disabled
        />
      </FormItem>

      <FormItem label="Added + Modified (A&M)">
        <InputNumber
          min={0}
          ref={(input) => setInputModalUpdateLOCsAM(input.inputNumberRef)}
          disabled
        />
      </FormItem>

      <FormItem label="* Total (T)">
        <InputNumber
          min={0}
          onChange={(v) => {
            inputModalUpdateLOCsAdded.setValue(v);
            inputModalUpdateLOCsAM.setValue(v);
            setModalUpdateLOCs({ ...modalUpdateLOCs, total: v });
          }}
        />
      </FormItem>

      <FormItem label="* New Reusable (NR)">
        <InputNumber
          min={0}
          onChange={(value) => setModalUpdateLOCs({ ...modalUpdateLOCs, new_reusable: value })}
        />
      </FormItem>
    </Form>
  );

  const submitProject = () => {
    if (submitting) {
      return;
    }

    projectApi.first_project(studentId).then((data) => {
      message.loading('Validating, wait a second', 4);

      const need_to_update_locs = data.phase_instance
      && (data.phase_instance.total == null || data.phase_instance.total == 0);

      if (!need_to_update_locs) {
        Modal.confirm({
          title: 'Confirmation Required',
          content: 'Are you sure you want to submit your project? This operation can\'t be undone.',
          okText: 'Yes',
          okType: 'success',
          cancelText: 'No',
          onOk() {
            submitProjectVersionProp(studentId, project_id);
          },
          onCancel() {
          },
        });
      } else {
        Modal.confirm({
          title: 'Action Required',
          content: modalUpdateLOCsFunc(data),
          okText: 'Save',
          okType: 'primary',
          cancelText: 'Cancel',
          onOk() {
            // Required Inputs
            if (!modalUpdateLOCs.total > 0 || modalUpdateLOCs.new_reusable === '') {
              message.warning('You must fill all the required inputs (marked with *)', 7);
              return true;
            }

            projectApi.assigned_project_version_phases_update(
              studentId,
              data.id,
              data.project_delivery_id,
              data.phase_instance.id,
              {
                modified: 0,
                deleted: 0,
                reused: 0,
                new_reusable:
                modalUpdateLOCs.new_reusable,
                total: modalUpdateLOCs.total,
              },
            ).then(() => {
              message.loading('Updating, wait a second', 4);
              submitProject();
            });

            return false;
          },
          onCancel() {
          },
        });
      }
    }).catch((data) => {
      console.log('Something went wrong fetching user');
    });
  };

  const startProjectFunc = () => {
    const required_attrs = ['academic_experience', 'collegue_career_progress', 'programming_experience', 'programming_language'];
    const background_ok = required_attrs
      .reduce((x, y) => x && session.user[y] && session.user[y].length > 0, true);

    if (background_ok) {
      setMessageStarting(true);
      startProjectProp(studentId, project_id);
      message.destroy();
    } else {
      Modal.confirm({
        title: 'Action Required',
        content: 'Before start working on a project you must update your personal background.',
        okText: 'Update my profile',
        okType: 'primary',
        cancelText: 'Cancel',
        onOk() {
          navigate(`/users/${session.user.id}/returntoproject/${project_id}`);
        },
        onCancel() {
        },
      });
    }
  };

  const onContinueProject = () => {
    setMessageContinueing(true);
    continueProjectProp(studentId, project_id);
    setRedeliver(true);
  };

  const printStatusButtons = () => {
    if (project_data.timeline[project_data.timeline.length - 1].version.id !== version_data.id) {
      return (
        <div className="submitProjectBtn">
          <span>Reviewing Old Version</span>
        </div>
      );
    }

    if (session.user.role === 'professor' && version_data.status === 'being_corrected') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Approve this project" placement="topLeft">
            <Button type="boton1" icon={<CheckOutlined />} shape="circle" onClick={() => correctProjectFunc('approved')} />
          </Popover>
          <Popover content="This project needs correction" placement="topLeft">
            <Button type="danger" icon={<CloseOutlined />} shape="circle" onClick={() => correctProjectFunc('need_correction')} />
          </Popover>
        </div>
      );
    } if (session.user.role === 'student' && version_data.status === 'working') {
      const checklist = submissionChecklist();

      const submissionChecklistPopover = (
        <div className="submission-checklist">
          {checklist.list.map((value) => (
            <span key={value.key} className={value.valid ? 'success' : 'danger'}>
              {value.valid
                ? (<CheckCircleOutlined />)
                : (<CloseCircleOutlined />)}
              {value.message}
            </span>
          ))}
        </div>
      );

      return (
        <div className="submitProjectBtn">
          <Popover title="Submission checklist" content={submissionChecklistPopover} placement="leftBottom">
            <Button onClick={submitProject} icon={submitting ? <LoadingOutlined /> : <UploadOutlined />} type="boton1" disabled={!checklist.canSubmit}>
              Submit to
              {` ${project_data.professor.first_name}`}
            </Button>
          </Popover>
        </div>
      );
    } if (session.user.role === 'student' && version_data.status === 'assigned') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Click here to allow phases recording" placement="leftBottom">
            <Button onClick={startProjectFunc} icon={<RightOutlined />} type="boton1">
              Start
              {project_data.psp_project.name}
            </Button>
          </Popover>
        </div>
      );
    } if (session.user.role === 'student' && version_data.status === 'need_correction') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Click here, make your corrections and submit it again" placement="leftBottom">
            <Button onClick={onContinueProject} icon={<RightOutlined />} type="boton1">
              Continue
              {project_data.psp_project.name}
            </Button>
          </Popover>
        </div>
      );
    }

    // Submit for review. Approve. Needs Correction.
  };

  const renderWorkingTime = () => {
    const plan = version_data.phases.find((o) => o.plan_time);
    const popOverText = (
      <div>
        This is the actual working time for this project.
        {plan && (
          <span>
            <br />
            You projected
            {' '}
            {plan.plan_time}
            {' '}
            minutes.
          </span>
        )}
      </div>
    );
    return (
      <Popover title="Working Time" content={popOverText} placement="bottom">
        <div className="projectTime">
          <WorkingTime
            phases={version_data.phases}
            working={(version_data.status === 'working')}
            actualTime={version_data.summary
              && version_data.summary.phases
              && version_data.summary.phases
                .some((o) => o.metric == 'TOTAL') ? version_data.summary.phases
                .find((o) => o.metric == 'TOTAL').actual : 0}
          />
        </div>
      </Popover>
    );
  };

  const goToTab = (key) => {
    navigate(`/students/${studentId}/projects/${project_id}/${key}`);
  };

  if ((project_loading || !project_data)
    || (!version_loading && !version_error && !version_data)
    || (version_loading || !version_data)
    || (session.user.role !== 'professor' && session.user.id != studentId)
  ) {
    return (<CustomProgress />);
  }

  const tagBasicDescription = (text) => (
    <div>
      <span>
        {text}
      </span>
    </div>
  );

  const tagsInfo = [
    {
      name: 'Instructions',
      title: 'Instructions',
      description: (
        <div>
          <span>
            <a href={project_data.psp_project.instructions} target="blank">Click here to download </a>
            the project instructions.
            <br />
            You have until
            {` ${moment(project_data.psp_project.deadline).format('DD/MM/YYYY')} `}
            to submit this project.
          </span>
        </div>
      ),
    },
    {
      name: project_data.psp_project.process.name,
      title: 'PSP Process',
      description: tagBasicDescription(`This projects follows ${project_data.psp_project.process.name}`),
    },
    {
      name: project_data.professor.first_name,
      title: 'Tutor',
      description: (
        <div>
          <span>
            {`Full Name: ${project_data.professor.first_name} ${project_data.professor.last_name}`}
          </span>
          <br />
          <span>
            {'Email: '}
            <a href={`to:${project_data.professor.email}`}>{project_data.professor.email}</a>
          </span>
        </div>
      ),
    },
    {
      name: project_data.language,
      title: 'Programming Language',
      description: tagBasicDescription(`You have chosen to develop this project in ${project_data.language}`),
    },
  ];

  return (
    <Layout className="projectDetails">
      <ProfessorSider selected="dashboard.students" />
      <Content className={isOpenSider || session.user.role === 'professor'
        ? `content-with-sider ${cs(
          { 'content-double-sider': isOpenSider && session.user.role === 'professor' },
          { 'content-professor': session.user.role === 'professor' },
        )}`
        : ''}
      >
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
          {session.user.role !== 'professor' && <Breadcrumb.Item><Link to={`/students/${studentId}/projects`}>Projects</Link></Breadcrumb.Item>}
          {session.user.role === 'professor' && <Breadcrumb.Item><Link to="/professor/dashboard/students">Students</Link></Breadcrumb.Item>}
          {session.user.role === 'professor' && <Breadcrumb.Item><Link to={`/users/${studentId}`}><SpanData entityName="student" entityId={studentId} loading output="first_name" /></Link></Breadcrumb.Item>}
          {session.user.role === 'professor' && <Breadcrumb.Item><Link to={`/students/${studentId}/projects`}>Projects</Link></Breadcrumb.Item>}
          <Breadcrumb.Item>{project_data.psp_project.name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{project_data.psp_project.name}</h1>
        <section style={{ textAlign: 'right' }}>
          {tagsInfo.map((tagInfo) => <CustomTag key={tagInfo.name} {...tagInfo} />)}
          <TagVersion
            active={version_data}
            timeline={project_data.timeline}
            onChange={fetchProjectDetailsVersionProp}
            idstudent={studentId}
            idproject={project_id}
          />
        </section>
        <section>
          <Tabs
            tabBarExtraContent={renderWorkingTime()}
            activeKey={defaultActiveKey}
            onChange={(key) => goToTab(key)}
          >
            <TabPane tab="SUMMARY" key="summary">
              <ProjectDetailsSummary
                studentId={studentId}
                project={project_data}
                version={version_data}
              />
            </TabPane>
            <TabPane tab="PHASES" key="phases">
              <ProjectDetailsPhases
                studentId={studentId}
                project={project_data}
                version={version_data}
              />
            </TabPane>
            <TabPane tab="FILES" key="files">
              <ProjectDetailsFiles
                studentId={studentId}
                project={project_data}
                version={version_data}
              />
            </TabPane>
            <TabPane tab="MESSAGES" key="messages">
              <ProjectDetailsMessages studentId={studentId} project={project_data} />
            </TabPane>
          </Tabs>
        </section>

      </Content>

      <Sider className={`sider ${isOpenSider ? 'sider-open' : 'sider-close'}`}>
        <div className="box">
          <h2>Project Timeline</h2>
          <Timeline>
            {printTimeLine()}
          </Timeline>
        </div>
        {printStatusButtons()}
      </Sider>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchPSPData: () => {
    dispatch(pspDataFetch()).payload.then((result) => {
      dispatch(pspDataFetchSuccess(result));
    });
  },
  fetchProjectDetailsProp: (userid, projectid) => {
    dispatch(fetchProjectDetails(userid, projectid)).payload.then((result) => {
      dispatch(fetchProjectDetailsSuccess(result));
    });
  },
  fetchProjectDetailsVersionProp: (userid, projectid, versionid) => {
    dispatch(fetchProjectDetailsVersion(userid, projectid, versionid)).payload.then((result) => {
      dispatch(fetchProjectDetailsVersionSuccess(result));
    });
  },
  fetchProjectDetailsVersionSummaryProp: (userid, projectid, versionid) => {
    dispatch(fetchProjectDetailsVersionSummary(userid, projectid, versionid))
      .payload.then((result) => {
        dispatch(fetchProjectDetailsVersionSummarySuccess(result));
      });
  },
  startProjectProp: (userid, projectid) => {
    dispatch(startProject(userid, projectid)).payload.then((result) => {
      dispatch(startProjectSuccess(result));
    });
  },
  continueProjectProp: (userid, projectid) => {
    dispatch(continueProject(userid, projectid)).payload.then((result) => {
      dispatch(continueProjectSuccess(result));
    });
  },
  submitProjectVersionProp: (userid, projectid) => {
    dispatch(submitProjectVersion(userid, projectid)).payload.then((result) => {
      dispatch(submitProjectVersionSuccess(result));
    });
  },
  approveProject: (courseId, projectId, assignedProjectId, data) => {
    dispatch(professorProjectApprove(courseId, projectId, assignedProjectId, data))
      .payload.then((result) => {
        dispatch(professorProjectApproveSuccess(result));
      });
  },
  rejectProject: (courseId, projectId, assignedProjectId, data) => {
    dispatch(professorProjectReject(courseId, projectId, assignedProjectId, data))
      .payload.then((result) => {
        dispatch(professorProjectRejectSuccess(result));
      });
  },
  reset: () => {
    dispatch(resetProjectDetails());
    dispatch(resetProjectDetailsVersion());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage);
