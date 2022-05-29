import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Popover,
  Button,
  Table,
  Spin,
  message,
  Modal
} from 'antd';

import {
  dashboardStudentsList, dashboardStudentsListFailure, dashboardStudentsListSuccess, dashboardStudentsListReset,
  dashboardStudentsAssign, dashboardStudentsAssignFailure, dashboardStudentsAssignSuccess,
  dashboardStudentsPoke, dashboardStudentsPokeFailure, dashboardStudentsPokeSuccess
} from '../../actions/dashboardActions';

const moment = require('moment/moment');

class DashboardStudents extends Component {
  constructor(props) {
    super(props);
    this.state = { sortedInfo: null, filteredInfo: null };
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    if (this.props.course) {
      this.props.fetchStudents(this.props.course.id, this.props.projectId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course && (!this.props.course || this.props.course.id != nextProps.course.id)) {
      this.props.fetchStudents(nextProps.course.id, nextProps.projectId);
      return;
    }
    if (nextProps.projectId != this.props.projectId) {
      this.props.fetchStudents(nextProps.course.id, nextProps.projectId);
    }
    if (this.message_poking && nextProps.finished_poke) {
      this.message_poking();
      this.message_poking = null;
    }
    if (this.message_assigning && nextProps.finished_assign) {
      this.message_assigning();
      this.message_assigning = null;
      this.props.fetchStudents(nextProps.course.id, nextProps.projectId);
    }
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({ sortedInfo: sorter, filteredInfo: filters });
  };

  projectOfRecord = (record) => {
    let project = null;
    if (this.props.projectId) {
      project = record.project;
      project.assigned_project_id = project.id;
    } else {
      project = record.current_project;
    }
    return project;
  };

  statusOfProject = (record) => {
    let status = (this.projectOfRecord(record).status === 'assigned' || this.projectOfRecord(record).status === 'working' || this.projectOfRecord(record).status === 'need_correction') ? 'working' : this.projectOfRecord(record).status;
    status = (status === 'working' && moment.duration(moment(this.projectOfRecord(record).deadline).diff(moment())).asMilliseconds() < 0) ? 'dued' : status;
    status = (status === 'not_assigned' && record.current_project.id && record.current_project.status != 'approved') ? 'pending' : status;

    let r = { status, color: 'colorless', msg: status };

    if (status === 'working') {
      r = { status: 'Working', color: 'colorless', msg: `${record.first_name} is working on this project and still has time to finish it on time.` };
    } else if (status === 'dued') {
      r = { status: 'Dued', color: 'warning', msg: `${record.first_name} is working on this project but the deadline has already passed. Consider to send a poke!` };
      r.action = 'poke_this';
    } else if (status === 'being_corrected') {
      r = { status: 'Correction Pending', color: 'danger', msg: `${record.first_name} is waiting for your correction.` };
      r.action = 'correct';
    } else if (status === 'approved') {
      r = { status: 'Approved', color: 'colorless', msg: `${record.first_name} has already finished this project.` };
    } else if (status === 'not_assigned') {
      r = { status: 'Not Assigned', color: 'success', msg: `${record.first_name} hasn't this project assigned.` };
      r.action = 'assign';
    } else if (status === 'pending') {
      r = {
        status: 'Pending',
        color: 'warning',
        msg: (<span>
          {record.first_name}
          {' '}
          hasn't this project assigned and is still working on
          {' '}
          {record.current_project.name}
          .
          {' '}
          <button type="button" onClick={() => this.assign({ id: record.id, name: record.first_name }, this.projectOfRecord(record))}>Assign anyway</button>
        </span>)
      };
    }

    return r;
  };

  poke = (student, project) => {
    const _this = this;
    const v = (moment(project.deadline) < moment()) ? 'fue' : 'es';
    const text = `Hola ${student.name}!\nLa fecha límite de la entrega del ${project.name} ${v} el ${moment(project.deadline).format('DD/MM/YYYY')}.\nHay novedades ?`;
    Modal.confirm({
      title: 'Are you sure?',
      content: (<span>
        This will send the following message to
        {' '}
        {student.name}
        :
        <br />
        <br />
        {text}
      </span>),
      okText: 'Send',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        _this.message_poking = message.loading(`Sending a poke to ${student.name}`, 0);
        _this.props.pokeStudent(student.id, project.assigned_project_id, { message: { text } });
      },
      onCancel() {
      },
    });
  };

  assign = (student, project) => {
    const _this = this;
    Modal.confirm({
      title: 'Are you sure?',
      content: 'Are you sure you want to assign a new project to this student? This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        _this.message_assigning = message.loading(`Assigning ${project.name} to ${student.name}`, 0);
        _this.props.assignProject(_this.props.course.id, project.course_project_instance_id, student.id);
      },
      onCancel() {
      },
    });
  };

  render() {
    if (!this.props.session.user || !this.props.session.user.id) {
      return (<div><Spin size="large" /></div>);
    }
    this.state.sortedInfo = this.state.sortedInfo || { columnKey: 'status', order: true };
    this.state.filteredInfo = this.state.filteredInfo || { professor: [String(this.props.session.user.id)] };
    const columns = [{
      title: 'STUDENT NAME',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text, record, index) => {
        const status = this.statusOfProject(record);

        return (
          <div className={`line ${status.color}`}>
            <span className="projectName">
              {record.first_name}
              {' '}
              {record.last_name}
            </span>
            <br />
            <span className="projectProcess">
              <Link to={`/students/${record.id}/projects`}>view activity</Link>
            </span>
          </div>
        );
      }
    }, {
      title: 'TUTOR',
      dataIndex: 'professor',
      key: 'professor',
      filters: this.props.students ? this.props.students.map((o) => ({ text: o.professor.first_name, value: o.professor.id })).reduce((x, y) => (x.some((o) => o.value === y.value) ? x : [...x, y]), []) : {},
      filteredValue: this.state.filteredInfo.professor,
      onFilter: (value, record) => String(record.professor.id) === String(value),
      render: (text, record, index) => text.first_name,
    }, {
      title: 'CURRENT PROJECT',
      key: 'project',
      className: this.props.projectId ? 'displayNone' : '',
      sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => this.projectOfRecord(record).name,
      sortOrder: this.state.sortedInfo.columnKey === 'project' && this.state.sortedInfo.order,
    }, {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => this.statusOfProject(a).status > this.statusOfProject(b).status,
      sortOrder: this.state.sortedInfo.columnKey === 'status' && this.state.sortedInfo.order,
      render: (text, record, index) => {
        const status = this.statusOfProject(record);

        return status.status ? (
          <Popover content={(<span style={{ maxWidth: '250px', display: 'block' }}>{status.msg}</span>)}>
            <span>
              <span className={`dot ${status.color}`} />
              {status.status}
            </span>
          </Popover>
        ) : (<span />);
      }
    }, {
      title: 'ACTION',
      key: 'action',
      render: (text, record, index) => {
        const status = this.statusOfProject(record);
        let btn = (<span />);

        if (status.action === 'correct') {
          btn = (<Link to={`/students/${record.id}/projects/${this.projectOfRecord(record).assigned_project_id}`}><Button type="boton1">Correct</Button></Link>);
        } else if (status.action === 'poke_this') {
          btn = (<button type="button" onClick={() => this.poke({ id: record.id, name: record.first_name }, this.projectOfRecord(record))}><Button type="boton1" disabled={this.message_poking}>Poke</Button></button>);
        } else if (status.action === 'poke_current') {
          btn = (<button type="button" onClick={() => this.poke({ id: record.id, name: record.first_name }, record.current_project)}><Button type="boton1" disabled={this.message_poking}>Poke</Button></button>);
        } else if (status.action === 'assign') {
          btn = (<button type="button" onClick={() => this.assign({ id: record.id, name: record.first_name }, this.projectOfRecord(record))}><Button type="boton1" disabled={this.message_assigning}>Assign</Button></button>);
        }

        return btn;
      }
    }];
    return (
      <Table rowKey="id" className="projectsListTable" columns={columns} dataSource={this.props.students} onChange={this.handleChange} loading={this.props.loading} pagination={false} />
    );
  }
}

const mapStateToProps = (state) => ({
  course: state.dashboard.courses.active,

  students: state.dashboard.students.list,
  loading: state.dashboard.students.loading,
  error: state.dashboard.students.error,

  finished_poke: state.dashboard.finished_poke,
  finished_assign: state.dashboard.finished_assign,

  session: state.session,

});

const mapDispatchToProps = (dispatch) => ({
  fetchStudents: (courseId, projectId) => {
    dispatch(dashboardStudentsList(courseId, projectId)).payload.then((result) => {
      if (true) {
        dispatch(dashboardStudentsListSuccess(result));
      } else {
        dispatch(dashboardStudentsListFailure(result.error));
      }
    });
  },
  pokeStudent: (studentId, projectId, message) => {
    dispatch(dashboardStudentsPoke(studentId, projectId, message)).payload.then((result) => {
      if (true) {
        dispatch(dashboardStudentsPokeSuccess(result));
      } else {
        dispatch(dashboardStudentsPokeFailure(result.error));
      }
    });
  },
  assignProject: (courseId, projectId, studentId) => {
    dispatch(dashboardStudentsAssign(courseId, projectId, studentId)).payload.then((result) => {
      if (true) {
        dispatch(dashboardStudentsAssignSuccess(result));
      } else {
        dispatch(dashboardStudentsAssignFailure(result.error));
      }
    });
  },
  reset: () => {
    dispatch(dashboardStudentsListReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStudents);
