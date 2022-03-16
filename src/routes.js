import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { sessionService } from 'redux-react-session';
import App from './components/App';
import ProjectListPage from './containers/ProjectsListPage';
import ProjectDetailsPage from './containers/ProjectDetailsPage';
import SessionLoginPage from './containers/SessionLoginPage'; // eslint-disable-line import/no-named-as-default
import SessionPasswordForgotPage from './containers/SessionPasswordForgotPage'; // eslint-disable-line import/no-named-as-default
import SessionPasswordResetPage from './containers/SessionPasswordResetPage'; // eslint-disable-line import/no-named-as-default
import { routes } from './constants/routesPaths';
import UserDetailsPage from './containers/UserDetailsPage';
import DashboardProjectsPage from './containers/DashboardProjectsPage';
import DashboardStudentsPage from './containers/DashboardStudentsPage';
import HomePage from "./containers/HomePage";

//    <IndexRoute onEnter={sessionService.checkAuth} component={ProjectListPage} />
//    <Route path="user/register" component={SignUpPage} />
//    <Route path="user/password/forgot" component={SignUpPage} />
//    <Route path="user/password/reset" component={SignUpPage} />
//    <Route path="user/profile" component={SignUpPage} />

export default (
  <Route path={`/`} component={App}>
    <IndexRoute onEnter={sessionService.checkAuth} component={HomePage} />

    {/* Students */}
    <Route path={`/users/:iduser(/returntoproject/:returntoprojectid)`} component={UserDetailsPage} />
    <Route path={`/students/:idstudent/projects`} component={ProjectListPage} />
    <Route path={`/students/:idstudent/projects/:idproject(/:tab)`} component={ProjectDetailsPage} />

    {/* Professors */}
    <Route path={`/professor/dashboard/projects`} component={DashboardProjectsPage} />
    <Route path={`/professor/dashboard/projects(/:idproject)`} component={DashboardStudentsPage} />
    <Route path={`/professor/dashboard/students`} component={DashboardStudentsPage} />

    (/* Session */}
    <Route path={`/session/login`} component={SessionLoginPage} />
    <Route path={`/session/password/forgot`} component={SessionPasswordForgotPage} />
    <Route path={`/session/password/reset`} component={SessionPasswordResetPage} />


  </Route>
);
