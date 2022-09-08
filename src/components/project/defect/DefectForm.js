import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  message,
  Input,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  Button,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import projectApi from '../../../api/projectApi';
import InputTooltip from '../../common/InputTooltip';
import { DEFECT_TYPES } from '../../../constants/constants';
import {
  createDefectOnProjectVersionPhase, createDefectOnProjectVersionPhaseSuccess,
  editDefectOnProjectVersionPhase, editDefectOnProjectVersionPhaseSuccess,
} from '../../../actions/projectActions';

const moment = require('moment/moment');

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const DefectForm = ({
  studentId,
  projectId,
  version,
  editDefect,
  phase,
  createDefect,
  onEdit,
  canEdit,
  creating,
  editing,
  defect,
}) => {
  const [defectState, setDefectState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fixDefectsReady, setFixDefectsReady] = useState(false);
  const [fixDefectsLoading, setFixDefectsLoading] = useState(false);
  const [fixDefectsList, setFixDefectsList] = useState([]);

  useEffect(() => {
    if (defect) {
      setShowModal(true);
      setDefectState(defect);
    }
  }, [defect]);

  const handleChange = (attr, value) => {
    if (attr === 'phase_injected') {
      setDefectState({ ...defectState, fix_defect: null, [attr]: value });
      setFixDefectsLoading(true);
      projectApi.assigned_project_version_phases_defect_find(
        studentId,
        projectId,
        version.id,
        value.id,
      ).then((defectList) => {
        setFixDefectsList(defectList);
        setFixDefectsLoading(false);
        setFixDefectsReady(true);
      });
    } else {
      setDefectState({ ...defectState, [attr]: value });
    }
  };

  const modalShow = () => {
    setDefectState(null);
    setShowModal(true);
  };

  const noFutureDate = (current) => current > moment().endOf('day');

  const noSmallerThanDate = (current, date) => current < moment(date);

  const modalCancel = () => {
    setShowModal(false);
    setDefectState(null);
    setFixDefectsList([]);
    onEdit(null);
  };

  const isFixDefectReq = ['COMPILE', 'UNIT TEST'].includes(defectState?.phase_injected
  && fixDefectsList.length
  && version.phases.map(({ psp_phase: { id, name } }) => ({ id, name }))
    .find(({ id }) => String(id) === defectState?.phase_injected.id)?.name);

  const isSaveDisabled = (!defectState
      || !defectState?.discovered_time
      || !defectState?.phase_injected
      || !defectState?.defect_type
      || !defectState?.fixed_time
      || !defectState?.description
    || (isFixDefectReq && !defectState?.fix_defect)
      || String(defectState?.description).trim() === ''
  );

  const modalOk = () => {
    // Required Inputs
    if (isSaveDisabled) {
      message.warning('You must fill all the required inputs (marked with *)', 5);
      return;
    }

    if (defectState?.id) {
      editDefect(studentId, projectId, version.id, phase.id, defectState?.id, defectState);
    } else {
      createDefect(studentId, projectId, version.id, phase.id, defectState);
    }

    modalCancel();
  };

  const modalRender = () => (
    <Form className="defectFormPopover" onSubmit={() => {}}>
      {defectState?.id
        && (
        <FormItem
          label="ID"
        >
          <InputNumber value={defectState?.id ? defectState?.id : null} onChange={(value) => handleChange('id', value)} disabled />
          <InputTooltip input="project_details_phase_defect_form_id" />
        </FormItem>
        )}
      <FormItem
        label="Discovered Time"
        required
      >
        <DatePicker
          disabledDate={(date) => noFutureDate(date)}
          value={defectState?.discovered_time
            ? moment(defectState?.discovered_time)
            : null}
          onChange={(value) => handleChange('discovered_time', value)}
          placeholder="Select date and time"
          showTime
          format="DD/MM/YYYY HH:mm:ss"
        />
        <InputTooltip input="project_details_phase_defect_form_discovered_time" />
      </FormItem>
      <FormItem
        label="Phase Injected"
        required
      >
        <Select
          value={defectState?.phase_injected
            ? String(defectState?.phase_injected.id)
            : null}
          onChange={(value) => handleChange('phase_injected', { id: value })}
        >
          {version.phases.map((item) => item.psp_phase).reduce((x, y) => (
            x.some((o) => o && o.id && y && y.id && o.id === y.id)
              ? x : [...x, y]), []).filter((o) => o && o.id).map((item) => (
                <Option key={item.id} value={String(item.id)}>{item.name}</Option>
          ))}
        </Select>
        <InputTooltip input="project_details_phase_defect_form_phase_injected" />
      </FormItem>
      <FormItem
        label="Defect Type"
        required
      >
        <Select
          value={defectState?.defect_type ? defectState?.defect_type : null}
          onChange={(value) => handleChange('defect_type', value)}
        >
          {DEFECT_TYPES.map((item, i) => (<Option key={i} value={item}>{item}</Option>))}
        </Select>
        <InputTooltip input="project_details_phase_defect_form_defect_type" />
      </FormItem>
      {fixDefectsList.length !== 0 && (
        <FormItem
          label={isFixDefectReq ? 'Fix Defect' : `${' '.repeat(3)}Fix Defect`}
          required={isFixDefectReq}
          className={!isFixDefectReq ? 'not-required' : ''}
        >
          <Select
            value={defectState?.fix_defect ? defectState?.fix_defect : null}
            onChange={(value) => handleChange('fix_defect', value)}
            disabled={!fixDefectsReady}
          >
            {fixDefectsList.map((item) => (
              <Option key={item.id} value={String(item.id)}>
                {`#${item.id} ${item.defect_type}`}
              </Option>
            ))}
          </Select>
          {fixDefectsLoading && <LoadingOutlined style={{ marginLeft: '15px' }} />}
          {!fixDefectsLoading && <InputTooltip input="project_details_phase_defect_form_fix_defect" />}
        </FormItem>
      )}
      <FormItem
        label="Fixed Time"
        required
      >
        <DatePicker
          placement={navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'bottomLeft' : 'topLeft'}
          disabledDate={(date) => noFutureDate(date)
             || noSmallerThanDate(date, defectState?.discovered_time)}
          value={defectState?.fixed_time ? moment(defectState?.fixed_time) : null}
          onChange={(value) => handleChange('fixed_time', value)}
          placeholder="Select date and time"
          showTime
          format="DD/MM/YYYY HH:mm:ss"
          disabled={!defectState?.discovered_time}
        />
        <InputTooltip input="project_details_phase_defect_form_fixed_time" />
      </FormItem>
      <FormItem
        label="Description"
        required
      >
        <TextArea
          autosize={{ minRows: 3 }}
          value={defectState?.description ? defectState?.description : null}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <InputTooltip input="project_details_phase_defect_form_comments" />
      </FormItem>

    </Form>
  );

  return (
    <div>
      <Button
        className="logNewDefect"
        icon={<PlusOutlined />}
        type="boton1"
        onClick={modalShow}
        disabled={!canEdit}
      >
        Record New Defect
      </Button>
      {canEdit
        && (
        <Modal
          confirmLoading={creating || editing}
          title={defectState?.id ? 'Edit a recorded defect' : 'Record new defect'}
          visible={showModal}
          okText="Save"
          onOk={modalOk}
          okButtonProps={{ disabled: isSaveDisabled }}
          onCancel={modalCancel}
          okType="primary"
        >
          {modalRender()}
        </Modal>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  created: state.projects.project_version_phase_create_finish,
  edited: state.projects.project_version_phase_edit_finish,
  deleted: state.projects.project_version_phase_delete_finish,
});

const mapDispatchToProps = (dispatch) => ({
  createDefect: (userid, projectid, versionid, phaseid, defect) => {
    defect.phase_injected_id = defect.phase_injected.id;
    dispatch(createDefectOnProjectVersionPhase(
      userid,
      projectid,
      versionid,
      phaseid,
      defect,
    )).payload.then((result) => {
      dispatch(createDefectOnProjectVersionPhaseSuccess(result));
    });
  },

  editDefect: (userid, projectid, versionid, phaseid, defectid, defect) => {
    defect.phase_injected_id = defect.phase_injected.id;
    dispatch(editDefectOnProjectVersionPhase(
      userid,
      projectid,
      versionid,
      phaseid,
      defectid,
      defect,
    )).payload.then((result) => {
      dispatch(editDefectOnProjectVersionPhaseSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DefectForm);
