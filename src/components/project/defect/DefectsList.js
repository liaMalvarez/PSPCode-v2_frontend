import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Popover,
  Modal,
  Button,
  Table,
} from 'antd';
import { Icon } from '@ant-design/compatible';

import {
  deleteDefectOnProjectVersionPhase, deleteDefectOnProjectVersionPhaseFailure, deleteDefectOnProjectVersionPhaseSuccess,
} from '../../../actions/projectActions';

const moment = require('moment/moment');

class DefectsList extends Component {
  constructor(props) {
    super(props);
    this.state = { sortedInfo: null, filteredInfo: null };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    // this.props.fetchProjects();
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({ sortedInfo: sorter, filteredInfo: filters });
  };

  deleteDefect = (defectId) => {
    const _this = this;
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _this.props.deleteDefect(_this.props.studentId, _this.props.projectId, _this.props.version.id, _this.props.phase.id, defectId);
      },
      onCancel() {
        console.log('jsut nothing happen');
      },
    });
  };

  descriptionPopOver = (text) => (<span style={{ maxWidth: '250px', display: 'block' }}>{text}</span>);

  render() {
    this.state.sortedInfo = this.state.sortedInfo || {};
    this.state.filteredInfo = this.state.filteredInfo || {};
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => text,
      sortOrder: this.state.sortedInfo.columnKey === 'id' && this.state.sortedInfo.order,
    }, {
      title: 'DISCOVERED TIME',
      dataIndex: 'discovered_time',
      key: 'discovered_time',
      sorter: (a, b) => new Date(a.discovered_time).getTime() - new Date(b.discovered_time).getTime(),
      render: (text, record, index) => moment(text).format('DD/MM/YYYY HH:mm:ss'),
      sortOrder: this.state.sortedInfo.columnKey === 'discovered_time' && this.state.sortedInfo.order,
    }, {
      title: 'PHASE INJECTED',
      dataIndex: 'phase_injected',
      key: 'phase_injected',
      sorter: (a, b) => a.phase_injected.psp_phase.id - b.phase_injected.psp_phase.id,
      render: (text, record, index) => text.psp_phase.name,
      sortOrder: this.state.sortedInfo.columnKey === 'phase_injected' && this.state.sortedInfo.order,
    }, {
      title: 'TYPE',
      dataIndex: 'defect_type',
      key: 'defect_type',
      sorter: (a, b) => a.defect_type - b.defect_type,
      render: (text, record, index) => text,
      sortOrder: this.state.sortedInfo.columnKey === 'defect_type' && this.state.sortedInfo.order,
    }, {
      title: 'FIX TIME',
      dataIndex: 'fixed_time',
      key: 'fixed_time',
      sorter: (a, b) => new Date(a.fixed_time).getTime() - new Date(a.discovered_time).getTime() - (new Date(b.fixed_time).getTime() - new Date(b.discovered_time).getTime()),
      render: (text, record, index) => moment.duration(moment(text).diff(moment(record.discovered_time))).humanize(),
      sortOrder: this.state.sortedInfo.columnKey === 'fixed_time' && this.state.sortedInfo.order,
    }, {
      title: 'FIX DEFECT',
      dataIndex: 'fix_defect',
      key: 'fix_defect',
      render: (text, record, index) => {
        let r = '-';
        if (text) {
          // const defect = this.props.defects.find(o => o.id === text);
          // if (defect) {
          // r = defect.id;
          // }
          r = text;
        }
        return r;
      }
    }, {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => {
        if (!text) {
          return (<span> </span>);
        }
        return (
          <Popover content={this.descriptionPopOver(text)}>
            <span><Icon type="info-circle-o" /></span>
          </Popover>
        );
      }
    }, {
      title: 'ACTION',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <Button onClick={() => this.props.onEdit(record)} icon="edit" disabled={!this.props.canEdit} />
&nbsp;
          <Button onClick={() => this.deleteDefect(record.id)} icon="delete" disabled={!this.props.canEdit} />
        </span>)
    }];
    return (
      <Table columns={columns} rowKey="id" loading={this.props.loading || this.props.deleting || this.props.creating || this.props.editing} dataSource={this.props.defects} onChange={this.handleChange} pagination={false} />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.projects.project_version_defects_loading,
  deleting: state.projects.project_version_phase_defect_deleting,
  creating: state.projects.project_version_phase_defect_creating,
  editing: state.projects.project_version_phase_defect_editing
});

const mapDispatchToProps = (dispatch) => ({

  deleteDefect: (userid, projectid, versionid, phaseid, defectid) => {
    dispatch(deleteDefectOnProjectVersionPhase(userid, projectid, versionid, phaseid, defectid)).payload.then((result) => {
      if (true) {
        dispatch(deleteDefectOnProjectVersionPhaseSuccess(result));
      } else {
        dispatch(deleteDefectOnProjectVersionPhaseFailure(result.error));
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DefectsList);
