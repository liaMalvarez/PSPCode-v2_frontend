import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Layout } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const ProfessorSider = ({ session }) => {
  const { pathname } = useLocation();
  const { idproject: projectId } = useParams();

  if (session.user.role !== 'professor') {
    return (<div />);
  }

  return (
    <Sider className="professorSider sider">
      <Link to="/professor/dashboard/projects">
        <span>
          Projects Dashboard
          {!pathname.includes('students') && (
          <CaretLeftOutlined style={{
            border: 'none',
            fontSize: '200%',
            display: 'flex',
            alignItems: 'center',
          }}
          />
          )}
        </span>
      </Link>
      <Link to="/professor/dashboard/students">
        <span>
          Students Dashboard
          {pathname.includes('students') && !projectId && (
          <CaretLeftOutlined style={{
            border: 'none',
            fontSize: '200%',
            display: 'flex',
            alignItems: 'center',
          }}
          />
          )}
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
