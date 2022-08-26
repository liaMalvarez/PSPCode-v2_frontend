import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Popover,
  Modal,
  Button,
  Table,
} from 'antd';
import {
  MessageTwoTone,
  EditOutlined,
  CloseCircleTwoTone,
  CloseOutlined,
  ExclamationCircleTwoTone,
  StopOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';

import {
  deleteDefectOnProjectVersionPhase,
  deleteDefectOnProjectVersionPhaseSuccess,
} from '../../../actions/projectActions';

const moment = require('moment/moment');

const DefectsList = ({
  deleteDefectProp,
  studentId,
  projectId,
  version,
  phase,
  canEdit,
  onEdit,
  loading,
  deleting,
  creating,
  editing,
  defects,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});

  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters || {});
    setSortedInfo(sorter || {});
  };

  const deleteDefect = (defectId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteDefectProp(
          studentId,
          projectId,
          version.id,
          phase.id,
          defectId,
        );
      },
    });
  };

  const descriptionPopOver = (text) => (
    <span style={{ maxWidth: '250px', display: 'block' }}>{text}</span>
  );

  const defectErrorsList = ({
    discovered_time_fit,
    inyection_phase,
  }) => (
    <div className="submission-checklist">
      {discovered_time_fit && (
      <span style={{ marginBottom: '3px' }}>
        <CloseCircleTwoTone twoToneColor="#bd3931" />
        {' '}
        {discovered_time_fit}
      </span>
      )}
      {inyection_phase && (
      <span>
        <CloseCircleTwoTone twoToneColor="#bd3931" />
        {' '}
        {inyection_phase}
      </span>
      )}
      {!(inyection_phase || discovered_time_fit) && (
      <span>
        <CheckCircleTwoTone twoToneColor="#87d068" />
        {' '}
        No observations
      </span>
      )}
    </div>
  );

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    render: (text) => text,
    sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
  }, {
    title: 'DISCOVERED TIME',
    dataIndex: 'discovered_time',
    key: 'discovered_time',
    sorter: (a, b) => new Date(a.discovered_time).getTime()
    - new Date(b.discovered_time).getTime(),
    render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss'),
    sortOrder: sortedInfo.columnKey === 'discovered_time' && sortedInfo.order,
  }, {
    title: 'PHASE INJECTED',
    dataIndex: 'phase_injected',
    key: 'phase_injected',
    sorter: (a, b) => a.phase_injected.psp_phase.id - b.phase_injected.psp_phase.id,
    render: (text) => text.psp_phase.name,
    sortOrder: sortedInfo.columnKey === 'phase_injected' && sortedInfo.order,
  }, {
    title: 'TYPE',
    dataIndex: 'defect_type',
    key: 'defect_type',
    sorter: (a, b) => a.defect_type - b.defect_type,
    render: (text) => text,
    sortOrder: sortedInfo.columnKey === 'defect_type' && sortedInfo.order,
  }, {
    title: 'FIX TIME',
    dataIndex: 'fixed_time',
    key: 'fixed_time',
    sorter: (a, b) => new Date(a.fixed_time).getTime()
    - new Date(a.discovered_time).getTime()
    - (new Date(b.fixed_time).getTime()
    - new Date(b.discovered_time).getTime()),
    render: (text, record) => moment
      .duration(moment(text).diff(moment(record.discovered_time))).humanize(),
    sortOrder: sortedInfo.columnKey === 'fixed_time' && sortedInfo.order,
  }, {
    title: 'FIX DEFECT',
    dataIndex: 'fix_defect',
    key: 'fix_defect',
    render: (text) => text || '-',
  }, {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    key: 'description',
    render: (text) => (
      !text ? (
        <StopOutlined style={{ fontSize: '16px', color: '#a5b7be' }} />
      ) : (
        <Popover
          title="Description"
          content={descriptionPopOver(text)}
        >
          <MessageTwoTone
            twoToneColor="#0dc0bb"
            style={{ fontSize: '16px' }}
          />
        </Popover>
      )
    ),
  }, {
    title: canEdit ? 'ACTION' : 'OBSERVATIONS',
    key: 'action',
    render: (_, record) => (canEdit ? (
      <span>
        <Button
          onClick={() => onEdit(record)}
          icon={<EditOutlined />}
          disabled={!canEdit}
        />
          &nbsp;
        <Button
          onClick={() => deleteDefect(record.id)}
          icon={<CloseOutlined />}
          disabled={!canEdit}
        />
      </span>
    ) : (
      <Popover
        title="Observations List"
        content={defectErrorsList(record.observations || {
          discovered_time_fit: null,
          inyection_phase: null,
        })}
        placement="leftBottom"
      >
        {record.observations?.discovered_time_fit || record.observations?.inyection_phase ? (
          <ExclamationCircleTwoTone
            twoToneColor="#faad14"
            style={{ fontSize: '16px' }}
          />
        ) : (
          <StopOutlined
            style={{ fontSize: '16px', color: '#a5b7be' }}
          />
        )}
      </Popover>
    )),
  }];

  return (
    <Table
      className="projectsListTable"
      columns={columns}
      rowKey="id"
      loading={loading
          || deleting
          || creating
          || editing}
      dataSource={defects}
      onChange={handleChange}
      pagination={false}
    />
  );
};

const mapStateToProps = (state) => ({
  loading: state.projects.project_version_defects_loading,
  deleting: state.projects.project_version_phase_defect_deleting,
  creating: state.projects.project_version_phase_defect_creating,
  editing: state.projects.project_version_phase_defect_editing,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDefectProp: (userid, projectid, versionid, phaseid, defectid) => {
    dispatch(deleteDefectOnProjectVersionPhase(
      userid,
      projectid,
      versionid,
      phaseid,
      defectid,
    )).payload.then((result) => {
      dispatch(deleteDefectOnProjectVersionPhaseSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DefectsList);
