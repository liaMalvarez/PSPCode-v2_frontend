import React from 'react';
import {
  Navigate,
  Outlet,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import CustomFooter from '../components/layout/CustomFooter';
import CustomHeader from '../components/layout/CustomHeader';
import ProfessorSider from '../components/layout/ProfessorSider';

import routes from '../constants/routesPaths';

require('antd/dist/result.css');

const HomePage = ({ session }) => {
  const { pathname } = useLocation();

  const allowedRoutesArray = Object.values(routes);
  allowedRoutesArray.shift();

  const allowedRoute = allowedRoutesArray
    .some((route) => matchPath(route, pathname));

  if (!session.checked) {
    return (<LoadingOutlined className="hoc_loader" />);
  }

  if (!session.authenticated && session.checked) {
    if (['/session/login', '/session/password/forgot', '/session/password/reset'].includes(pathname)) {
      return <Outlet />;
    }

    return (
      <Navigate to="session/login" />
    );
  }
  console.log('hoc', session.user);
  if (!Object.keys(session.user).length) {
    return (<LoadingOutlined className="hoc_loader" />);
  }

  if (
    ['/', '/session/login', '/session/password/forgot'].includes(pathname)
    || !allowedRoute
    || (pathname === '/session/password/reset' && session.user.role === 'professor')
  ) {
    return (
      <Navigate to={session.user.role === 'professor'
        ? 'professor/dashboard/projects'
        : `students/${session.user.id}/projects`}
      />
    );
  }

  return (
    <Layout>
      <CustomHeader />
      {session.user.role === 'professor' && <ProfessorSider />}
      <Outlet />
      <CustomFooter />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
