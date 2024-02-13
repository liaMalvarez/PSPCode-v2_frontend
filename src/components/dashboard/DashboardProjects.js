import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Popover,
  Button,
  Table,
} from 'antd';

import {
  dashboardProjectsList,
  dashboardProjectsListSuccess,
} from '../../actions/dashboardActions';

const moment = require('moment/moment');

const DashboardProjects = ({
  course,
  projects,
  loading,
  fetchProjects,
}) => {
  useEffect(() => {
    if (course) {
      fetchProjects(course.id);
    }
  }, [course]);

  const columns = [{
    title: 'PROJECT NAME',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => {
      let status = 'colorless';
      if (record.to_correct > 0) {
        status = 'danger';
      } else if (record.working > 0) {
        status = 'success';
      }
      return (
        <div className={`line ${status}`}>
          <span className="projectName">{record.name}</span>
          <br />
          <span className="projectProcess">
            {`Process: ${record.process.name}`}
            <br />
            {`Deadline: ${moment(record.deadline).format('DD/MM/YYYY')}`}
          </span>
        </div>
      );
    },
  }, {
    title: 'NOT ASSIGNED',
    dataIndex: 'not_assigned',
    key: 'not_assigned',
    render: (text) => {
      const content = text == 1 ? (
        <span>
          {`${text} student hasn't this project assigned`}
        </span>
      ) : (
        <span>
          {`${text} students haven't this project assigned`}
        </span>
      );
      return text == 0 ? 0 : (<Popover content={content}>{text}</Popover>);
    },
  }, {
    title: 'WORKING',
    dataIndex: 'working',
    key: 'working',
    render: (text) => {
      const content = text == 1 ? (
        <span>
          {`${text} student is working on this project`}
        </span>
      ) : (
        <span>
          {`${text} students are working on this project`}
        </span>
      );
      return text == 0 ? (<span>0</span>) : (<Popover content={content}>{text}</Popover>);
    },
  }, {
    title: 'APPROVED',
    dataIndex: 'approved',
    key: 'approved',
    render: (text) => {
      const content = text == 1 ? (
        <span>
          {`${text} student has finished this project successfully`}
        </span>
      ) : (
        <span>
          {`${text} students have finished this project successfully`}
        </span>
      );
      return text == 0 ? (<span>0</span>) : (<Popover content={content}>{text}</Popover>);
    },
  }, {
    title: 'TO CORRECT',
    dataIndex: 'to_correct',
    key: 'to_correct',
    render: (text) => {
      const msg = text > 0 ? (<b className="danger">{text}</b>) : 0;
      const content = text == 1 ? (
        <span>
          {`${text} student is awaiting for your correction`}
        </span>
      ) : (
        <span>
          {`${text} students are awaiting for your correction`}
        </span>
      );
      return text == 0 ? (<span>0</span>) : (<Popover content={content}>{msg}</Popover>);
    },
  }, {
    title: 'ACTION',
    key: 'action',
    render: (_, record) => (
      <Link to={`/professor/dashboard/projects/${record.id}`}>
        <Button type="boton1">View Details</Button>
      </Link>
    ),
  }];

  return (
    <Table
      rowKey="id"
      className="projectsListTable"
      columns={columns}
      dataSource={projects}
      loading={loading}
      pagination={false}
    />
  );
};

const mapStateToProps = (state, ownState) => ({
  course: state.dashboard.courses.active,
  projects: state.dashboard.projects.list,
  loading: state.dashboard.projects.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (courseId) => {
    dispatch(dashboardProjectsList(courseId)).payload.then((result) => {
      dispatch(dashboardProjectsListSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProjects);
