import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  dashboardProjectsList, dashboardProjectsListFailure, dashboardProjectsListSuccess, dashboardProjectsListReset
} from '../../actions/dashboardActions';

const Icon = require('antd/lib/icon');
const Table = require('antd/lib/table');
const Button = require('antd/lib/button');
const moment = require('moment/moment');
const Popover = require('antd/lib/popover');

class DashboardProjects extends Component {

  constructor(props) {
    super(props);
    this.state = { sortedInfo: null, filteredInfo: null };
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    if (this.props.course) {
      this.props.fetchProjects(this.props.course.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.course && (!this.props.course || this.props.course.id != nextProps.course.id)) {
      this.props.fetchProjects(nextProps.course.id);
      return;
    }
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({ sortedInfo: sorter, filteredInfo: filters});
  };

  render() {
    this.state.sortedInfo = this.state.sortedInfo || {};
    this.state.filteredInfo = this.state.filteredInfo || {};
    const columns = [{
      title: 'PROJECT NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        let status = 'colorless';
        if (record.to_correct > 0) {
          status = 'danger';
        //} else if (record.not_assigned > 0 && (record.working + record.to_correct + record.approved > 0)) {
        //  status = 'warning';
        } else if (record.working > 0) {
          status = 'success';
        }
        return (
          <div className={'line ' + status}>
            <span className="projectName">{record.name}</span><br />
            <span className="projectProcess">Process: {record.process.name} <br /> Deadline: {moment(record.deadline).format('DD/MM/YYYY')}</span>
          </div>
        )
      }
    }, {
      title: 'NOT ASSIGNED',
      dataIndex: 'not_assigned',
      key: 'not_assigned',
      render: (text, record, index) => {
        //const msg = text > 0 && (record.working + record.to_correct + record.finished > 0) ? (<b className="warning">{text}</b>) : (<span>{text}</span>);
        const content = text == 1 ? (<span>{text} student hasn't this project assigned</span>) :
                                    (<span>{text} students haven't this project assigned</span>);
        return text == 0 ? (<span>0</span>) : (<Popover content={content}>{text}</Popover>);
      },
    }, {
      title: 'WORKING',
      dataIndex: 'working',
      key: 'working',
      render: (text, record, index) => {
        const content = text == 1 ? (<span>{text} student is working on this project</span>) :
          (<span>{text} students are working on this project</span>);
        return text == 0 ? (<span>0</span>) : (<Popover content={content}>{text}</Popover>);
      },
    }, {
      title: 'APPROVED',
      dataIndex: 'approved',
      key: 'approved',
      render: (text, record, index) => {
        const content = text == 1 ? (<span>{text} student has finished this project successfully</span>) :
          (<span>{text} students have finished this project successfully</span>);
        return text == 0 ? (<span>0</span>) : (<Popover content={content}>{text}</Popover>);
      },
    }, {
      title: 'TO CORRECT',
      dataIndex: 'to_correct',
      key: 'to_correct',
      render: (text, record, index) =>  {
        const msg = text > 0 ? (<b className="danger">{text}</b>) : 0;
        const content = text == 1 ? (<span>{text} student is awaiting your correction</span>) :
          (<span>{text} students are awaiting your correction</span>);
        return text == 0 ? (<span>0</span>) : (<Popover content={content}>{msg}</Popover>);
      },
    }, {
      title: 'ACTION',
      key: 'action',
      render: (text, record, index) => (<Link to={'/professor/dashboard/projects/' + record.id}><Button type="boton1">View Details</Button></Link>)
    }];
    return (
      <Table rowKey="id" className="projectsListTable" columns={columns} dataSource={this.props.projects} onChange={this.handleChange} loading={this.props.loading} pagination={false} />
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    course: state.dashboard.courses.active,
    projects: state.dashboard.projects.list,
    loading: state.dashboard.projects.loading,
    error: state.dashboard.projects.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: (courseId) => {
      dispatch(dashboardProjectsList(courseId)).payload.then((result) => {
        if (true) {
          dispatch(dashboardProjectsListSuccess(result));
        } else {
          dispatch(dashboardProjectsListFailure(result.error));
        }

      });
    },
    reset: () => {
      dispatch(dashboardProjectsListReset());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProjects);
