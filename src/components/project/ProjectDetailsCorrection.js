import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse, Input, Switch } from 'antd';

import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined, CloseOutlined,
} from '@ant-design/icons';

import {
  createMessageOnProject,
  createMessageOnProjectSuccess,
} from '../../actions/projectActions';
import CorrectionTable from './correction/CorrectionTable';
import CustomTag from '../CustomTag';

const { Panel } = Collapse;
const { TextArea } = Input;

const ProjectDetailsCorrection = ({ project, version }) => {
  const [projectFeedback, setProjectFeedback] = useState(
    {
      approved: false,
      comment: 'General comment',
      fechaEntrega: 'una fecha',
      fechaCorrección: 'otra fecha',
      sections: [{
        name: 'Programa y Resultado de Test',
        corrections: [{
          description: 'El programa resulta ser funcional.',
          comment: 'some comment as placeholder',
          approved: true,
          phases: [{ index: 0, name: 'PLAN' }, { index: 4, name: 'UNIT TEST' }, { index: 6, name: 'UNIT TEST' }],
          automatizable: true,
        },
        {
          description: 'Todos los test requeridos fueron ejecutados',
          comment: 'some comment as placeholder',
          approved: true,
          phases: [],
          automatizable: true,
        }],
      }, {
        name: 'Log de Tiempo',
        corrections: [{
          description: 'Los datos del tiempo se registran en todas las fases del proceso, Los datos del tiempo se registran en todas las fases del proceso, Los datos del tiempo se registran en todas las fases del proceso',
          comment: 'some comment as placeholder',
          approved: true,
          phases: [],
          automatizable: true,
        },
        {
          description: 'Los resultados de los test son consistentes con el estándar de conteo.',
          comment: 'some comment as placeholder',
          approved: false,
          phases: [],
          automatizable: true,
        }],
      }, {
        name: 'Log de Defectos',
        corrections: [{
          description: 'Los datos del tiempo se registran en todas las fases del proceso, Los datos del tiempo se registran en todas las fases del proceso, Los datos del tiempo se registran en todas las fases del proceso',
          comment: '',
          approved: false,
          phases: [],
          automatizable: true,
        },
        {
          description: 'Los tiempos son registrados en los pasos correctos del proceso',
          comment: 'some comment as placeholder',
          approved: true,
          phases: [],
          automatizable: true,
        }],
      }],
    },
  );

  const panelHeader = (corrections, name) => (
    <div className="correction-table-header">
      {name}
      {corrections.some(({ approved }) => !approved) ? (
        <CustomTag
          description="There are unapproved criterias"
          title="Unapproved"
          name="Unapproved"
          color="gold"
          icon={<ExclamationCircleOutlined />}
        />
      ) : (
        <CustomTag
          description="All criterias has been approved"
          name="Approved"
          title="Approved"
          color="green"
          icon={<CheckCircleOutlined />}
        />
      )}
    </div>
  );

  const setSection = (sectionName, attribute, data) => {
    const newProjectfeedback = projectFeedback;
    const sectionIndex = projectFeedback.sections.findIndex(({ name }) => name === sectionName);
    const newSection = projectFeedback.sections[sectionIndex];

    newSection.corrections = newSection.corrections
      .map((correction, index) => ({ ...correction, [attribute]: data[index] }));

    newProjectfeedback.sections[sectionIndex] = newSection;

    setProjectFeedback({ ...newProjectfeedback });
  };

  const setGeneralAttribute = (attribute, newValue) => {
    console.log(newValue);
    setProjectFeedback({ ...projectFeedback, [attribute]: newValue });
  };

  return (
    <div className="projectDetailsMessages">
      <div className="title">
        General Feedback
      </div>
      <div className="generalFeedbackRow">
        <div className="generalFeedbackColumn">
          <div className="switchRow">
            Approve project?
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={projectFeedback.approved}
              onChange={(newValue) => setGeneralAttribute('approved', newValue)}
              defaultChecked
            />
          </div>
          <TextArea
            placeholder="Leave a general comment of the project..."
            className="general-comment"
            value={projectFeedback.comment}
            autoSize={{ minRows: 3 }}
            onChange={(e) => setGeneralAttribute('comment', e.target.value)}
          />
        </div>
        <div className="projectDates">
          hola
        </div>
      </div>
      <div className="separator" />
      <div className="title">
        Project Grading
      </div>
      <Collapse
        ghost
      >
        {projectFeedback.sections.map(({ name, corrections }, index) => (
          <Panel header={panelHeader(corrections, name)} key={index}>
            <CorrectionTable data={corrections} sectionName={name} setSection={setSection} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  created: state.projects.project_messages_created,
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (userid, projectid, message) => {
    dispatch(createMessageOnProject(userid, projectid, message)).payload.then((result) => {
      dispatch(createMessageOnProjectSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsCorrection);
