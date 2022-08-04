import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const ProfessorSider = ({ session, selected }) => {
  if (session.user.role !== 'professor') {
    return (<div />);
  }

  return (
    <Sider className="professorSider sider">
      <Link to="/professor/dashboard/projects">
        <span>
          Projects Dashboard
          {selected === 'dashboard.projects' && <CaretLeftOutlined />}
        </span>
      </Link>
      <Link to="/professor/dashboard/students">
        <span>
          Students Dashboard
          {selected === 'dashboard.students' && <CaretLeftOutlined />}
        </span>
      </Link>
    </Sider>
  );
};

const mapStateToProps = (state, ownState) => ({
  session: state.session,
  selected: ownState.selected,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorSider);
