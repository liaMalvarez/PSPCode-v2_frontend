import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import {
  Collapse,
  Input,
  Switch,
  message,
  Modal,
} from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import {
  getProjectFeedbackForVersionSuccess,
  professorSubmitCorrectionSuccess,
} from '../../actions/projectActions';
import projectApi from '../../api/projectApi';
import CorrectionTable from './correction/CorrectionTable';
import CustomTag from '../CustomTag';

const { Panel } = Collapse;
const { TextArea } = Input;

const ProjectDetailsCorrection = ({
  versionId,
  project,
  studentId,
  showConfirmationModal = true,
  setShowConfirmationModal = () => {},
  getProjectFeedback,
  projectFeedbackGet,
  canEditCorrection,
  submitCorrection,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [areChangesToBeSaved, setAreChangesToBeSaved] = useState(false);
  const [hasSavedChanges, setHasSavedChanges] = useState(false);

  const [projectFeedback, setProjectFeedback] = useState(null);

  const isUnapprovedCriteria = useMemo(() => projectFeedback?.grouped_corrections
    .some(({ corrections }) => corrections.some(({ approved }) => !approved)), [projectFeedback]);

  useEffect(() => {
    if (!projectFeedbackGet
      || project.id !== projectFeedbackGet.projectid
      || versionId !== projectFeedbackGet.versionId
      || studentId !== projectFeedbackGet.studentid
    ) {
      getProjectFeedback(
        studentId,
        project.id,
        versionId,
        setError,
        setIsLoading,
      );
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !error && projectFeedbackGet) {
      setProjectFeedback(projectFeedbackGet);
    }
  }, [projectFeedbackGet, isLoading, error]);

  useEffect(() => {
    const warningsList = [];

    if (showConfirmationModal) {
      if (!projectFeedback.comment) {
        warningsList.push('The general comment is empty.');
      }

      if (isUnapprovedCriteria && projectFeedback.approved) {
        warningsList.push('The project is being approved having unapproved criteria.');
      } else if (!isUnapprovedCriteria && !projectFeedback.approved) {
        warningsList.push('All the criteria is approved but the project is not.');
      }

      if (projectFeedback.grouped_corrections
        .some(({ corrections }) => corrections
          .some(({ comment, approved }) => !comment && !approved))) {
        warningsList.push('There are unapproved criteria with empty comments.');
      }

      if (projectFeedback.grouped_corrections
        .some(({ corrections }) => corrections
          .some(({ obs_phases, approved }) => obs_phases.length && approved))) {
        warningsList.push('Some of the approved criteria has atomatically detected errors.');
      }

      Modal.confirm({
        title: 'Do you want to submit the correction? This action can\'t be undone.',
        icon: <ExclamationCircleOutlined />,
        content: (
          <ul
            style={{
              maxWidth: '400px',
              display: 'block',
              marginLeft: '25px',
              padding: '0',
            }}
          >
            {warningsList.map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        ),
        onCancel: () => setShowConfirmationModal(false),
        onOk: () => submitCorrection(studentId, project.id, versionId, projectFeedback),
        okText: `Submit${warningsList.length ? ' anyway' : ''}`,
      });
    }
  }, [showConfirmationModal]);

  const panelHeader = (corrections, name) => (
    <div className="correction-table-header">
      {name}
      {corrections.some(({ approved }) => !approved) ? (
        <CustomTag
          description="There are unapproved criteria"
          title="Unapproved"
          name="Unapproved"
          color="gold"
          icon={<ExclamationCircleOutlined />}
        />
      ) : (
        <CustomTag
          description="All criteria has been approved"
          name="Approved"
          title="Approved"
          color="green"
          icon={<CheckCircleOutlined />}
        />
      )}
    </div>
  );

  const setSection = (name, attribute, data) => {
    const newProjectfeedback = projectFeedback;

    const sectionIndex = projectFeedback.grouped_corrections
      .findIndex(({ section_name }) => name === section_name);
    const newSection = projectFeedback.grouped_corrections[sectionIndex];

    newSection.corrections = newSection.corrections
      .map((correction, index) => ({ ...correction, [attribute]: data[index] }));

    newProjectfeedback.grouped_corrections[sectionIndex] = newSection;

    setProjectFeedback({ ...newProjectfeedback });

    setAreChangesToBeSaved(true);
  };

  const setGeneralAttribute = (attribute, newValue) => {
    setProjectFeedback({ ...projectFeedback, [attribute]: newValue });

    setAreChangesToBeSaved(true);
  };

  useEffect(() => {
    if (!projectFeedback) return () => {};

    const timerSave = setInterval(() => {
      if (areChangesToBeSaved && projectFeedback) {
        projectApi.project_feedback_update(
          studentId,
          project.id,
          versionId,
          projectFeedback,
        ).then(() => {
          setAreChangesToBeSaved(false);
          setHasSavedChanges(true);
        }).catch(() => {
          setAreChangesToBeSaved(false);
          message.error('Something went wrong on update', 3);
        });
      }
    }, 1000);

    const timerNotificate = setInterval(() => {
      if (hasSavedChanges) {
        setHasSavedChanges(false);
        message.success('Project Feedback has been updated', 3);
      }
    }, 2000);

    return () => {
      clearInterval(timerSave);
      clearInterval(timerNotificate);
    };
  }, [projectFeedback, hasSavedChanges, areChangesToBeSaved]);

  if (isLoading || (!projectFeedback && !error)) {
    return (
      <LoadingOutlined
        style={{
          fontSize: '50px',
          color: '#044578',
          textAlign: 'center',
          width: '100%',
          marginTop: '50px',
        }}
      />
    );
  }

  return (
    <div className="projectDetailsMessages">
      {error ? (
        <div className="error-wrapper">
          {error}
        </div>
      ) : (
        <>
          <div className="title">
            General Feedback
          </div>
          <div className="generalFeedbackRow">
            <div className="generalFeedbackColumn">
              <div className="switchRow">
                Approve project?
                <Switch
                  disabled={!canEditCorrection}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={projectFeedback.approved}
                  onChange={(newValue) => {
                    setGeneralAttribute('approved', newValue);

                    if (newValue && isUnapprovedCriteria) {
                      message.warning('Some criteria are not approved yet', 3);
                    }
                  }}
                  defaultChecked
                />
              </div>
              <TextArea
                disabled={!canEditCorrection}
                placeholder="Leave a general comment of the project..."
                className="general-comment"
                value={projectFeedback.comment}
                autoSize={{ minRows: 3 }}
                onChange={(e) => setGeneralAttribute('comment', e.target.value)}
              />
            </div>
            <div className="projectDates">
              {projectFeedback.delivered_date && (
                <div className="projectDate">
                  <div className="projectDateTitle">Project delivered on:</div>
                  <div className="dateRow">
                    <CalendarOutlined style={{ color: '#585d5e', marginBottom: '2px' }} />
                    {format(new Date(`${projectFeedback.delivered_date}T00:00:00`), 'dd/MM/yyyy')}
                  </div>
                </div>
              )}
              {projectFeedback.reviewed_date && (
                <div className="projectDate">
                  <div className="projectDateTitle">Project reviewed on:</div>
                  <div className="dateRow">
                    <CalendarOutlined style={{ color: '#585d5e', marginBottom: '2px' }} />
                    {format(new Date(`${projectFeedback.reviewed_date}T00:00:00`), 'dd/MM/yyyy')}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="separator" />
          <div className="title">
            Project Grading
          </div>
          <Collapse ghost>
            {projectFeedback.grouped_corrections.map(({ section_name, corrections }) => (
              <Panel header={panelHeader(corrections, section_name)} key={section_name}>
                <CorrectionTable
                  disabled={!canEditCorrection}
                  key={section_name}
                  data={corrections}
                  sectionName={section_name}
                  setSection={setSection}
                />
              </Panel>
            ))}
          </Collapse>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  projectFeedbackGet: state.projects.active?.project_feedback,
});

const mapDispatchToProps = (dispatch) => ({
  getProjectFeedback: (userid, projectid, versionId, setError, setIsLoading) => {
    projectApi.get_project_feedback(userid, projectid, versionId).then((result) => {
      dispatch(getProjectFeedbackForVersionSuccess({
        ...result,
        userid,
        projectid,
        versionId,
      }));
      setIsLoading(false);
    }).catch(() => {
      setError('Something went wrong on loading Project Feedback');
      setIsLoading(false);
    });
  },
  submitCorrection: (studentId, projectId, versionId, projectFeedback) => {
    projectApi.project_feedback_update(
      studentId,
      projectId,
      versionId,
      { ...projectFeedback, reviewed_date: format(new Date(), 'yyyy-MM-dd') },
    ).then(() => {
      dispatch(professorSubmitCorrectionSuccess());
      message('Correction submitted successfully', 'success');
    }).catch(() => {
      message('Something went wrong on submitting the correction', 'error');
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsCorrection);
