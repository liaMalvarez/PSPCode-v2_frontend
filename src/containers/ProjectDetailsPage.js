import React, { useEffect, useMemo, useState } from 'react';
import {
  Link, useNavigate, useParams, useLocation,
} from 'react-router-dom';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import moment from 'moment';
import cs from 'classnames';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  LoadingOutlined,
  UploadOutlined,
  RightOutlined,
  WarningTwoTone,
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
  Form,
} from 'antd';

import TagVersion from '../components/TagVersion';
import CustomTag from '../components/CustomTag';
import ProjectDetailsSummary from '../components/project/ProjectDetailsSummary';
import ProjectDetailsPhases from '../components/project/ProjectDetailsPhases';
import ProjectDetailsMessages from '../components/project/ProjectDetailsMessages';
import ProjectDetailsFiles from '../components/project/ProjectDetailsFiles';
import ProjectDetailsCorrection from '../components/project/ProjectDetailsCorrection';
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
  submitProjectVersionSuccess, startProject, startProjectSuccess,
  continueProject, continueProjectSuccess, resetProjectDetails, resetProjectDetailsVersion,
} from '../actions/projectActions';
import { pspDataFetch, pspDataFetchSuccess } from '../actions/utilsActions';

const { Content, Sider } = Layout;
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
  version_data,
  submitting,
  submitProjectVersionProp,
  continueProjectProp,
  version_error,
  version_loading,
  finished_starting,
  project_error,
  finished_continueing,
  fetchProjectDetailsVersionSummaryProp,
}) => {
  const navigate = useNavigate();
  const { idstudent: studentId, idproject: project_id, tab } = useParams();
  const { pathname } = useLocation();

  const [defaultActiveKey, setDefaultActiveKey] = useState(tab || 'summary');
  const [modalUpdateLOCs, setModalUpdateLOCs] = useState({ total: '', new_reusable: '' });
  const [redeliver, setRedeliver] = useState(false);
  const [messageStarting, setMessageStarting] = useState(false);
  const [messageContinueing, setMessageContinueing] = useState(false);
  const [inputModalUpdateLOCsAdded, setInputModalUpdateLOCsAdded] = useState(null);
  const [inputModalUpdateLOCsAM, setInputModalUpdateLOCsAM] = useState(null);
  const [isOpenSider, setIsOpenSider] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [hasSubmited, setHasSubmited] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const correctionAllowed = useMemo(() => ((session?.user.role === 'professor'
  && ['approved', 'need_correction', 'being_corrected'].includes(version_data?.status))
  || (session?.user.role === 'student'
  && ['approved', 'need_correction'].includes(version_data?.status))), [session, version_data]);

  const canEditCorrection = useMemo(() => (
    session?.user.role === 'professor' && version_data?.status === 'being_corrected'
  ), [session, version_data]);

  const changeTab = (key) => {
    const allowed_tabs = ['summary', 'phases', 'files', 'messages', 'correction'];

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
    if (pathname.includes('correction')) {
      if (correctionAllowed) {
        changeTab('correction');
      } else {
        changeTab('summary');
      }
    }
  }, [correctionAllowed]);

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

    if (messageStarting && finished_starting) {
      message.loading('Getting all ready, wait a second', 3);
      setMessageStarting(false);
    }
    if (messageContinueing && finished_continueing) {
      message.loading('Generating a new version, wait a second', 3);
      setMessageContinueing(false);
    }
  }, [
    project_id,
    project_data,
    project_error,
    project_loading,
    version_loading,
    session, studentId,
    version_data,
    finished_starting,
    finished_continueing,
  ]);

  const printTimeLine = () => project_data.timeline.map((item, i) => (
    <Timeline.Item dot={<div />} color={PROJECT_STATUS[item.status].color} key={i}>
      {PROJECT_STATUS[item.status].name}
      <br />
      {format(new Date(item.date), 'yyyy-MM-dd')}
    </Timeline.Item>
  ));

  useEffect(() => {
    if (!version_data?.phases?.length || !project_data) {
      return;
    }

    const checklistValue = [
      {
        key: 'phases_named',
        message: 'All phases are named',
        valid: !version_data.phases.some(({ psp_phase }) => (
          !psp_phase
        )),
      },
      {
        key: 'right_order',
        message: 'The phases are correctly ordered',
        valid: !version_data.phases.some(({ psp_phase }, index, phases) => (
          !psp_phase
          || (!index ? !psp_phase.first : psp_phase.first)
          || (!phases[index + 1] ? !psp_phase.last : psp_phase.last)
          || (psp_phase.first && phases[index + 1]?.psp_phase?.name !== 'DESIGN') // no hay un design inicial
          || (psp_phase.last && phases[index - 1]?.psp_phase?.name !== 'UNIT TEST') // no hay un test final
          || (psp_phase.name === 'DESIGN' && !['CODE', 'DESIGN'].includes(phases[index + 1]?.psp_phase?.name))
          || (psp_phase.name === 'COMPILE' && phases[index - 1]?.psp_phase?.name !== 'CODE')
        )),
      },
      {
        key: 'all_phase_have_time',
        message: 'All the phases have start and end time',
        valid: version_data.phases.reduce((acc, x) => acc
          && x.start_time !== null && x.end_time !== null, true),
      },
      {
        key: 'zip_uploaded',
        message: 'You have attached the zip file',
        valid: (version_data.file),
      },
    ];

    setChecklist(checklistValue);
  }, [JSON.stringify(version_data?.phases), version_data?.file]);

  const modalUpdateLOCsFunc = (data) => (
    <Form className="modalUpdateLOCs" onSubmit={() => {}}>

      <p>
        Enter the actual size data for
        {' '}
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

    setHasSubmited(true);

    projectApi.first_project(studentId).then(() => {

      const need_to_update_pm = (project_data.psp_project.process.has_pip
        && version_data.phases.some(({ psp_phase }) => psp_phase?.order === 6)
        && version_data.phases.some(({
          psp_phase,
          pip_problem,
          pip_proposal,
          pip_notes,
        }) => (
          psp_phase?.order === 6
          && (!pip_problem || pip_problem?.length < 15
            || !pip_proposal || pip_proposal?.length < 15
            || !pip_notes || pip_notes?.length < 15)
        ))) || (project_data.psp_project.process.has_pan_loc
        && version_data.phases.some(({
          total,
          new_reusable,
          psp_phase,
        }) => (
          psp_phase?.order === 6
          && (!total || total == 0 || !new_reusable || new_reusable == 0)
        ))
      );

      if (!need_to_update_pm) {
        Modal.confirm({
          title: 'Confirmation Required',
          content: 'Are you sure you want to submit your project? This operation can\'t be undone.',
          okText: 'Yes',
          okType: 'success',
          cancelText: 'No',
          onOk() {
            projectApi.project_feedback_create(
              studentId,
              project_id,
              version_data?.id,
            ).then(() => submitProjectVersionProp(studentId, project_id))
              .catch(() => message.error('Error on submitting the project', 4));
          },
        });
      } else {
        Modal.warning({
          title: 'There are some unfilled fields in Post Mortem phase',
          content: 'Please fill them in before continue.',
        });
      }
    }).catch((error) => {
      console.log('Something went wrong fetching user', error);
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
          navigate(`/users/${session.user.id}/projects/${project_id}`);
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
          <Button
            onClick={() => setShowConfirmationModal(true)}
            icon={submitting ? <LoadingOutlined /> : <UploadOutlined />}
            type="boton1"
            disabled={checklist.some(({ valid }) => !valid)}
          >
            Submit Correction
          </Button>
        </div>
      );
    }

    if (session.user.role === 'student' && version_data.status === 'working') {
      const submissionChecklistPopover = (
        <div className="submission-checklist">
          {checklist.map((value) => (
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
          <Popover title="Submission Checklist" content={submissionChecklistPopover} placement="leftBottom">
            <Button
              onClick={submitProject}
              icon={submitting ? <LoadingOutlined /> : <UploadOutlined />}
              type="boton1"
              disabled={checklist.some(({ valid }) => !valid)}
            >
              {`Submit to ${project_data.professor.first_name}`}
            </Button>
          </Popover>
        </div>
      );
    }

    if (session.user.role === 'student' && version_data.status === 'assigned') {
      return (
        <div className="submitProjectBtn">
          <Popover content="Click here to allow phases recording" placement="leftBottom">
            <Button onClick={startProjectFunc} icon={<RightOutlined />} type="boton1">
              {`Start ${project_data.psp_project.name}`}
            </Button>
          </Popover>
        </div>
      );
    }

    if (session.user.role === 'student' && version_data.status === 'need_correction') {
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

  const descriptionPopover = () => (
    <ol style={{ maxWidth: '400px', display: 'block', marginLeft: '15px' }}>
      <li>
        <strong>Plan </strong>
        must be the first phase.
      </li>
      <li>
        Always needs to be a
        <strong> Design </strong>
        phase right after
        <strong> Plan</strong>
        .
      </li>
      <li>
        <strong>Design </strong>
        phase(s) always has to be followed by
        <strong> Code </strong>
        phase.
      </li>
      <li>
        <strong>Compile </strong>
        phase always comes after
        <strong> Code </strong>
        Phase(s).
      </li>
      <li>
        Always needs to be a
        <strong> Test </strong>
        phase right before
        <strong> Post Mortem</strong>
        .
      </li>
      <li>
        <strong>Post Mortem </strong>
        must be the last phase.
      </li>
    </ol>
  );

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
          <Breadcrumb.Item>
            <Link to={session.user.role === 'professor'
              ? '/professor/dashboard/projects'
              : `/students/${session.user.id}/projects`}
            >
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
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
            <TabPane
              tab={(
                <Popover
                  title={!checklist[1]?.valid ? 'Phases must comply with the following:' : ''}
                  content={!checklist[1]?.valid ? descriptionPopover() : ''}
                  placement="rightTop"
                >
                  {!checklist[1]?.valid && (
                  <WarningTwoTone
                    twoToneColor="#ffbc5a"
                    style={{ fontSize: '14px', margin: 0 }}
                  />
                  )}
                  {' '}
                  PHASES
                </Popover>
              )}
              key="phases"
            >
              <ProjectDetailsPhases
                hasSubmited={hasSubmited}
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
            {correctionAllowed && (
              <TabPane tab="CORRECTION" key="correction">
                <ProjectDetailsCorrection
                  versionId={version_data?.id}
                  studentId={studentId}
                  project={project_data}
                  showConfirmationModal={showConfirmationModal}
                  setShowConfirmationModal={setShowConfirmationModal}
                  canEditCorrection={canEditCorrection}
                />
              </TabPane>
            )}
          </Tabs>
        </section>

      </Content>

      <Sider className={`sider ${isOpenSider ? 'sider-open' : 'sider-close'}`}>
        <div className="box">
          <h2 className="title">Project Timeline</h2>
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
  reset: () => {
    dispatch(resetProjectDetails());
    dispatch(resetProjectDetailsVersion());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage);
