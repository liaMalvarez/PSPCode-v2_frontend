/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@ant-design/compatible';
import { Layout, Breadcrumb, Tabs } from 'antd';

import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import UserProfile from '../components/user/UserProfile';
import { fetchUserDetails, fetchUserDetailsFailure, fetchUserDetailsSuccess } from '../actions/userActions';
import ProfessorSider from '../components/layout/ProfessorSider';
import CustomProgress from '../components/common/CustomProgress';

require('antd/dist/antd.css');

const { Content } = Layout;

const { TabPane } = Tabs;

const UserDetailsPage = ({
  user_data,
  user_loading,
  session,
  user_id,
  location_hash,
  returntoprojectid,
  reset
}) => {
  useEffect(() => {
    if (!user_data) {
      if (session && (session.user.role === 'professor' || session.user.id == user_id)) {
        fetchUserDetails(user_id);
      }
    }

    return () => { reset(); };
  }, [user_data, session, user_id]);

  if (user_loading || !user_data) {
    return (<CustomProgress />);
  }

  return (
    <Layout>
      <CustomHeader />
      <Layout className="userDetails ant-layout-has-sider">
        <ProfessorSider selected="dashboard.students" />
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
            {(session.user.id != user_id && session.user.role === 'professor') && <Breadcrumb.Item><Link to="/professor/dashboard/students">Students</Link></Breadcrumb.Item>}
            {(session.user.id != user_id && session.user.role === 'professor') && <Breadcrumb.Item>{user_data.first_name}</Breadcrumb.Item>}
            {(session.user.id == user_id || session.user.role !== 'professor') && <Breadcrumb.Item>My Profile</Breadcrumb.Item>}
          </Breadcrumb>
          <h1>
            {user_data.first_name}
            {' '}
            {user_data.last_name}
          </h1>
          <section>
            <Tabs defaultActiveKey={location_hash === '#activity' ? '2' : '1'}>
              <TabPane tab="PROFILE" key="1">
                <UserProfile user={user_data} returnToProjectId={returntoprojectid} />
              </TabPane>
            </Tabs>
          </section>

          <CustomFooter />

        </Content>

      </Layout>

    </Layout>
  );
};

const mapStateToProps = (state, ownState) => ({
  location_hash: ownState.location.hash,
  user_id: ownState.params.iduser,
  returntoprojectid: ownState.params.returntoprojectid,
  session: state.session,
  user_data: state.users.active.user,
  user_loading: state.users.active.loading,
  user_error: state.users.active.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserDetails: (id) => {
    dispatch(fetchUserDetails(id)).payload.then((result) => {
      if (true) {
        dispatch(fetchUserDetailsSuccess(result));
      } else {
        dispatch(fetchUserDetailsFailure(result.error));
      }
    });
  },
  reset: () => {
    // dispatch(resetUserDetails());
    // dispatch(resetUserDetailsVersion());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
