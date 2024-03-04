import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Popover,
  Button,
  Table,
  Spin,
  message,
  Modal,
} from 'antd';

import {
  dashboardStudentsList, dashboardStudentsListSuccess, dashboardStudentsListReset,
  dashboardStudentsAssign, dashboardStudentsAssignSuccess,
  dashboardStudentsPoke, dashboardStudentsPokeSuccess,
} from '../../actions/dashboardActions';

const moment = require('moment/moment');

const DashboardStudents = ({
  fetchStudents,
  pokeStudent,
  assignProject,
  reset,
  course,
  projectId,
  session,
  students,
  loading,
  finished_poke,
  finished_assign,
}) => {
  const [sortedInfo, setSortedInfo] = useState({ columnKey: 'status', order: true });
  const [filteredInfo, setFilteredInfo] = useState({ professor: [session.user.id] });
  const [messagePoking, setMessagePoking] = useState('');
  const [messageAssigning, setMessageAssigning] = useState('');

  const navigate = useNavigate();

  useEffect(() => reset(), []);

  useEffect(() => {
    if (course) {
      fetchStudents(course.id, projectId);
    }
  }, [course, projectId]);

  useEffect(() => {
    if (messagePoking && finished_poke) {
      message.loading(messagePoking, 3);
      setMessagePoking('');
    }

    if (messageAssigning && finished_assign) {
      message.loading(messageAssigning, 3);
      setMessageAssigning('');
      fetchStudents(course.id, projectId);
    }
  }, [finished_poke, finished_assign]);

  const assign = (student, project) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'Are you sure you want to assign a new project to this student? This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        setMessageAssigning(`Assigning ${project.name} to ${student.name}`);
        assignProject(course.id, project.course_project_instance_id, student.id);
      },
      onCancel() {
      },
    });
  };

  const projectOfRecord = (record) => {
    let project = null;

    if (projectId && record.project) {
      project = {
        ...record.project,
        assigned_project_id: record.project.id,
      };
    } else {
      project = record.current_project;
    }

    return project;
  };

  const statusOfProject = (record) => {
    let status = (projectOfRecord(record).status === 'assigned' || projectOfRecord(record).status === 'working' || projectOfRecord(record).status === 'need_correction') ? 'working' : projectOfRecord(record).status;
    status = (status === 'working' && moment.duration(moment(projectOfRecord(record).deadline).diff(moment())).asMilliseconds() < 0) ? 'dued' : status;
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
        msg: (
          <div>
            {record.first_name}
            {' '}
            hasn&apos;t this project assigned and is still working on
            {' '}
            {record.current_project.name}
            .
            <button
              className="ant-btn-boton1"
              style={{ marginTop: '10px', padding: '3px 8px' }}
              onClick={() => assign(
                { id: record.id, name: record.first_name },
                projectOfRecord(record),
              )}
            >
              Assign anyway
            </button>
          </div>
        ),
      };
    }

    return r;
  };

  const poke = (student, project) => {
    const v = (moment(project.deadline) < moment()) ? 'fue' : 'es';
    const text = `Hola ${student.name}!\nLa fecha límite de la entrega del ${project.name} ${v} el ${moment(project.deadline).format('DD/MM/YYYY')}.\nHay novedades ?`;
    Modal.confirm({
      title: 'Are you sure?',
      content: (
        <span>
          {`This will send the following message to ${student.name}:`}
          <br />
          <br />
          {text}
        </span>
      ),
      okText: 'Send',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        setMessagePoking(`Sending a poke to ${student.name}`);
        pokeStudent(student.id, project.assigned_project_id, { message: { text } });
      },
      onCancel() {
      },
    });
  };

  if (!session.user || !session.user.id) {
    return (<div><Spin size="large" /></div>);
  }

  const columns = [{
    title: 'STUDENT NAME',
    dataIndex: 'first_name',
    key: 'first_name',
    width: projectId ? '32%' : '20%',
    render: (_, record) => {
      const status = statusOfProject(record);
      return (
        <div className={`line ${status.color} h-50`}>
          <span className="projectName">
            {record.first_name}
            {' '}
            {record.last_name}
          </span>
        </div>
      );
    },
  }, {
    title: 'TUTOR',
    dataIndex: 'professor',
    key: 'professor',
    width: projectId ? '32%' : '20%',
    filters: students ? students
      .map((o) => ({ text: o.professor.first_name, value: o.professor.id }))
      .reduce((x, y) => (x.some((o) => o.value === y.value)
        ? x : [...x, y]), []) : [],
    onFilter: (value, record) => String(record.professor.id) === String(value),
    render: (text) => text.first_name,
    filteredValue: filteredInfo?.professor,
  }, {
    title: 'CURRENT PROJECT',
    key: 'project',
    width: '20%',
    className: projectId ? 'displayNone' : '',
    sorter: (a, b) => a.current_project.id - b.current_project.id,
    render: (_, record) => projectOfRecord(record).name || <p className='not_assigned_project'>No Project Assigned</p>,
    sortOrder: sortedInfo?.columnKey === 'project' && sortedInfo.order,
  }, {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
    width: projectId ? '32%' : '20%',
    sorter: (a, b) => (statusOfProject(a).status || '-').localeCompare(statusOfProject(b).status || '-'),
    sortOrder: sortedInfo?.columnKey === 'status' && sortedInfo.order,
    render: (_, record) => {
      const status = statusOfProject(record);

      return status?.status ? (
        <Popover content={(
          <span style={{ maxWidth: '250px', display: 'block' }}>
            {status.msg}
          </span>
        )}
        >
          <div>
            <div className={`dot ${status.color}`} />
            {status.status}
          </div>
        </Popover>
      ): <div>-</div>;
    },
  }, {
    title: 'ACTION',
    key: 'action',
    width: '10%',
    render: (_, record) => {
      const status = statusOfProject(record);
      let btn = (<span />);

      if (status.action === 'correct') {
        btn = (
          <Button
            onClick={() => navigate(`/students/${record.id}/projects/${projectOfRecord(record).assigned_project_id}`)}
            type="boton1"
          >
            Correct
          </Button>
        );
      } else if (status.action === 'poke_this') {
        btn = (
          <Button
            type="boton1"
            onClick={() => poke(
              { id: record.id, name: record.first_name },
              projectOfRecord(record),
            )}
            disabled={messagePoking}
          >
            Poke
          </Button>
        );
      } else if (status.action === 'poke_current') {
        btn = (
          <Button
            type="boton1"
            onClick={() => poke({ id: record.id, name: record.first_name }, record.current_project)}
            disabled={messagePoking}
          >
            Poke
          </Button>
        );
      } else if (status.action === 'assign') {
        btn = (
          <Button
            type="boton1"
            onClick={() => assign(
              { id: record.id, name: record.first_name },
              projectOfRecord(record),
            )}
            disabled={messageAssigning}
          >
            Assign
          </Button>
        );
      } else {
        btn = (
          <Button
            onClick={() => navigate(`/students/${record.id}/projects/${(projectId && projectOfRecord(record).assigned_project_id) ? projectOfRecord(record).assigned_project_id : ''}`)}
            type="boton1"
            disabled={messageAssigning}
          >
            {`View Project${!projectId || status.status === 'Pending' ? 's' : ''}`}
          </Button>
        );
      }

      return btn;
    },
  }];

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  return (
    <Table
      rowKey="id"
      className="projectsListTable"
      columns={columns}
      dataSource={students}
      loading={loading}
      onChange={handleChange}
      pagination={false}
      onRow={(record) => ({
        onClick: () => { navigate(`/students/${record.id}/projects/${(projectId && projectOfRecord(record).assigned_project_id) ? projectOfRecord(record).assigned_project_id : ''}`); }, // click row
        style: {
          height: '70px',
          cursor: 'pointer',
        },
      })}
    />
  );
};

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
      dispatch(dashboardStudentsListSuccess(result));
    });
  },
  pokeStudent: (studentId, projectId) => {
    dispatch(dashboardStudentsPoke(studentId, projectId, message)).payload.then((result) => {
      dispatch(dashboardStudentsPokeSuccess(result));
    });
  },
  assignProject: (courseId, projectId, studentId) => {
    dispatch(dashboardStudentsAssign(courseId, projectId, studentId)).payload.then((result) => {
      dispatch(dashboardStudentsAssignSuccess(result));
    });
  },
  reset: () => {
    dispatch(dashboardStudentsListReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStudents);
