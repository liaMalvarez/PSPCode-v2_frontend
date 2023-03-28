import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
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

import projectApi from '../../api/projectApi';
import CorrectionTable from './correction/CorrectionTable';
import CustomTag from '../CustomTag';

const { Panel } = Collapse;
const { TextArea } = Input;

const ProjectDetailsCorrection = ({
  versionId,
  project,
  studentId,
  canEditCorrection,
  error,
  isLoading,
  projectFeedback,
  setProjectFeedback,
  isUnapprovedCriteria,
}) => {
  const [areChangesToBeSaved, setAreChangesToBeSaved] = useState(false);
  const [hasSavedChanges, setHasSavedChanges] = useState(false);

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

export default ProjectDetailsCorrection;
