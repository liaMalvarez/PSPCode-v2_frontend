import React, { useEffect, useState } from 'react';
import {
  Navigate,
  Outlet,
  useLocation,
  matchPath
} from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../constants/routesPaths';

require('antd/dist/antd.css');

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
    return (
      <Navigate to="session/login" />
    );
  }

  if ((!session.authenticated && !hasUpdated) || !Object.keys(session.user).length) {
    return (
      <div />
    );
  }

  if (pathname === '/' || pathname === '/session/login' || !allowedRoute) {
    return (
      <Navigate to={session.user.role === 'professor'
        ? '/professor/dashboard/projects'
        : `students/${session.user.id}/projects`}
      />
    );
  }

  return (
    <Outlet />
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
