import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popover,
} from 'antd';

import {
  fetchProjects, fetchProjectsFailure, fetchProjectsSuccess,
  resetProjectsList
} from '../../actions/projectActions';
import { PROJECT_STATUS } from '../../constants/constants';

const moment = require('moment/moment');

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = { sortedInfo: null, filteredInfo: null };
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    this.props.fetchProjects(this.props.studentId);
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({ sortedInfo: sorter, filteredInfo: filters });
  };

  render() {
    this.state.sortedInfo = this.state.sortedInfo || {};
    this.state.filteredInfo = this.state.filteredInfo || {};
    const columns = [{
      title: 'PROJECT NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        const status = (moment.duration(moment(record.deadline).diff(moment())).asMilliseconds() < 0 && record.status != 'approved') ? 'dued' : record.status;
        return (
          <div className={`line ${status}`}>
            <span className="projectName">{record.name}</span>
            <br />
            <span className="projectProcess">
              Process:
              {' '}
              {record.process.name}
            </span>
          </div>
        );
      },
    }, {
      title: 'ASSIGNED DATE',
      dataIndex: 'assigned',
      key: 'assigned',
      sorter: (a, b) => moment.duration(moment(b.assigned).diff(moment(a.assigned))).asMilliseconds(),
      render: (text, record, index) => moment(text).format('DD/MM/YYYY'),
      sortOrder: this.state.sortedInfo.columnKey === 'assigned' && this.state.sortedInfo.order,
    }, {
      title: 'DEADLINE',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => moment.duration(moment(b.deadline).diff(moment(a.deadline))).asMilliseconds(),
      render: (text, record, index) =>
        // const dued = (moment.duration(moment(record.deadline).diff(moment())).asMilliseconds() < 0 && record.status !='approved' );
        moment(text).format('DD/MM/YYYY'),
      sortOrder: this.state.sortedInfo.columnKey === 'deadline' && this.state.sortedInfo.order,
    }, {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Working', value: 'working' },
        { text: 'Assigned', value: 'assigned' },
        { text: 'Being Corrected', value: 'being_corrected' },
      ],
      filteredValue: this.state.filteredInfo.status,
      onFilter: (value, record) => record.status.includes(value),
      render: (text, record, index) => {
        const status = (moment.duration(moment(record.deadline).diff(moment())).asMilliseconds() < 0 && record.status != 'approved') ? 'dued' : record.status;
        const span = (<span>
          <span className={`dot ${status}`} />
          {' '}
          {PROJECT_STATUS[text].name}
                      </span>);
        if (status === 'dued') {
          return (<Popover content="This project is dued, harry up!">{span}</Popover>);
        }
        return span;
      }
    }, {
      title: 'ACTION',
      key: 'action',
      render: (text, record, index) => (<Link to={`/students/${this.props.studentId}/projects/${record.key}`}><Button type="boton1">View Project</Button></Link>)
    }];
    return (
      <Table className="projectsListTable" columns={columns} dataSource={this.props.projects} onChange={this.handleChange} loading={this.props.loading} pagination={false} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.list.projects,
  loading: state.projects.list.loading,
  error: state.projects.list.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (userid) => {
    dispatch(fetchProjects(userid)).payload.then((result) => {
      if (true) {
        dispatch(fetchProjectsSuccess(result));
      } else {
        dispatch(fetchProjectsFailure(result.error));
      }
    });
  },
  reset: () => {
    dispatch(resetProjectsList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
