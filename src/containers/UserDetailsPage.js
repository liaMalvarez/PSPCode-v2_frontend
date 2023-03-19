/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Tabs } from 'antd';

import UserProfile from '../components/user/UserProfile';
import ProfessorSider from '../components/layout/ProfessorSider';
import CustomProgress from '../components/common/CustomProgress';

import { fetchUserDetails, fetchUserDetailsSuccess } from '../actions/userActions';

const { Content } = Layout;

const { TabPane } = Tabs;

const UserDetailsPage = ({
  user_data,
  user_loading,
  session,
  fetchUserDetailsProp,
}) => {
  const { hash: location_hash, iduser: user_id, idproject } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_data || user_data.id != user_id) {
      if (session && (session.user.role === 'professor' || session.user.id == user_id)) {
        fetchUserDetailsProp(user_id);
      } else if (session) {
        navigate(session.user.role === 'professor'
          ? 'professor/dashboard/projects'
          : `students/${session.user.id}/projects`);
      }
    }

    return () => {};
  }, [user_data, session]);

  if (user_loading || !user_data) {
    return (<CustomProgress />);
  }

  return (
    <Layout className="userDetails ant-layout-has-sider">
      <ProfessorSider selected="dashboard.students" />
      <Content className={session.user.role === 'professor' ? 'professorDashboard' : ''}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={session.user.role === 'professor'
              ? '/professor/dashboard/projects'
              : `/students/${session.user.id}/projects`}
            >
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          {(session.user.id != user_id && session.user.role === 'professor')
          && <Breadcrumb.Item><Link to="/professor/dashboard/students">Students</Link></Breadcrumb.Item>}
          {(session.user.id != user_id && session.user.role === 'professor')
          && <Breadcrumb.Item>{user_data.first_name}</Breadcrumb.Item>}
          {(session.user.id == user_id || session.user.role !== 'professor')
          && <Breadcrumb.Item>User Details</Breadcrumb.Item>}
        </Breadcrumb>
        <h1>
          {`${user_data.first_name} ${user_data.last_name}`}
        </h1>
        <section>
          <Tabs defaultActiveKey={location_hash === '#activity' ? '2' : '1'}>
            <TabPane tab="PROFILE" key="1">
              <UserProfile user={user_data} idproject={idproject} />
            </TabPane>
          </Tabs>
        </section>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  user_data: state.users.active.user,
  user_loading: state.users.active.loading,
  user_error: state.users.active.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserDetailsProp: (id) => {
    dispatch(fetchUserDetails(id)).payload.then((result) => {
      dispatch(fetchUserDetailsSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
