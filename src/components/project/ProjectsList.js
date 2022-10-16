import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  Popover,
} from 'antd';

import {
  fetchProjects,
  fetchProjectsSuccess,
  resetProjectsList,
} from '../../actions/projectActions';
import { PROJECT_STATUS } from '../../constants/constants';

const moment = require('moment/moment');

const ProjectList = ({
  studentId,
  reset,
  fetchProjectsProp,
  projects,
  loading,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectsProp(studentId);
    return reset;
  }, []);

  const handleChange = (_, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [{
    title: 'PROJECT NAME',
    dataIndex: 'name',
    key: 'name',
    width: '22%',
    render: (_, record) => {
      const status = (moment.duration(moment(record.deadline).diff(moment()))
        .asMilliseconds() < 0
        && record.status !== 'approved') ? 'dued' : record.status;

      return (
        <div className={`line ${status}`}>
          <span className="projectName">{record.name}</span>
          <br />
          <span className="projectProcess">
            {`Process: ${record.process.name}`}
          </span>
        </div>
      );
    },
  }, {
    title: 'ASSIGNED DATE',
    dataIndex: 'assigned',
    key: 'assigned',
    width: '22%',
    sorter: (a, b) => moment.duration(moment(b.assigned).diff(moment(a.assigned))).asMilliseconds(),
    render: (text) => moment(text).format('DD/MM/YYYY'),
    sortOrder: sortedInfo.columnKey === 'assigned' && sortedInfo.order,
  }, {
    title: 'DEADLINE',
    dataIndex: 'deadline',
    key: 'deadline',
    width: '22%',
    sorter: (a, b) => moment.duration(moment(b.deadline).diff(moment(a.deadline))).asMilliseconds(),
    render: (text) => moment(text).format('DD/MM/YYYY'),
    sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
  }, {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
    width: '22%',
    filters: [
      { text: 'Approved', value: 'approved' },
      { text: 'Working', value: 'working' },
      { text: 'Assigned', value: 'assigned' },
      { text: 'Being Corrected', value: 'being_corrected' },
    ],
    filteredValue: filteredInfo.status,
    onFilter: (value, record) => record.status.includes(value),
    render: (text, record, index) => {
      const status = (moment.duration(moment(record.deadline).diff(moment()))
        .asMilliseconds() < 0
        && record.status != 'approved') ? 'dued' : record.status;

      const span = (
        <span>
          <span className={`dot ${status}`} />
          {PROJECT_STATUS[text].name}
        </span>
      );
      if (status === 'dued') {
        return (<Popover content="This project is dued, harry up!">{span}</Popover>);
      }
      return span;
    },
  }];

  return (
    <Table
      className="projectsListTable"
      columns={columns}
      dataSource={projects}
      onChange={handleChange}
      loading={loading}
      onRow={(record) => ({
        onClick: () => { navigate(`/students/${studentId}/projects/${record.key}`); }, // click row
        style: {
          height: '70px',
          cursor: 'pointer',
        },
      })}
      pagination={false}
    />
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects.list.projects,
  loading: state.projects.list.loading,
  error: state.projects.list.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjectsProp: (userid) => {
    dispatch(fetchProjects(userid)).payload.then((result) => {
      dispatch(fetchProjectsSuccess(result));
    });
  },
  reset: () => {
    dispatch(resetProjectsList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
