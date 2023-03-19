import React, { useEffect, useState } from 'react';
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

  const [hasUpdated, setHasUpdated] = useState(false);

  const allowedRoutesArray = Object.values(routes);
  allowedRoutesArray.shift();

  const allowedRoute = allowedRoutesArray
    .some((route) => matchPath(route, pathname));

  useEffect(() => {
    setHasUpdated(true);
  }, [session]);

  if (!session.authenticated && hasUpdated) {
    if (['/session/login', '/session/password/forgot', '/session/password/reset'].includes(pathname)) {
      return <Outlet />;
    }

    return (
      <Navigate to="session/login" />
    );
  }

  if ((!session.authenticated && !hasUpdated)
  || (session.authenticated && !Object.keys(session.user).length)) {
    return (<LoadingOutlined size="large" />);
  }

  if (['/', '/session/login', '/session/password/forgot'].includes(pathname) || !allowedRoute) {
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
