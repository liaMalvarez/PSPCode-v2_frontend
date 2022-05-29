/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ConfigProvider } from 'antd';
import { createHashHistory } from 'history';
import enUS from 'antd/lib/locale-provider/en_US';

import configureStore from './store/configureStore';
import routes from './constants/routesPaths';

import ProjectListPage from './containers/ProjectsListPage';
import ProjectDetailsPage from './containers/ProjectDetailsPage';
import SessionLoginPage from './containers/SessionLoginPage'; // eslint-disable-line import/no-named-as-default
import SessionPasswordForgotPage from './containers/SessionPasswordForgotPage'; // eslint-disable-line import/no-named-as-default
import SessionPasswordResetPage from './containers/SessionPasswordResetPage'; // eslint-disable-line import/no-named-as-default
import UserDetailsPage from './containers/UserDetailsPage';
import DashboardProjectsPage from './containers/DashboardProjectsPage';
import DashboardStudentsPage from './containers/DashboardStudentsPage';
import HomePage from './containers/HomePage';

import './styles/styles.scss';

const store = configureStore();

const history = createHashHistory();
render(
  <HashRouter history={history} location={history.location} navigator={history}>
    <ConfigProvider locale={enUS}>
      <AppContainer>
        <Provider store={store}>
          <Routes>
            <Route path={routes.index} element={<HomePage />}>
              {/* Students */}
              <Route path={routes.studentReturnProject} element={<UserDetailsPage />} />
              <Route path={routes.studentProjectDetailsTab} element={<ProjectDetailsPage />} />
              <Route path={routes.studentProjectDetails} element={<ProjectDetailsPage />} />
              <Route path={routes.studentProjectsList} element={<ProjectListPage />} />

              {/* Professors */}
              <Route path={routes.professorProjectDetails} element={<DashboardStudentsPage />} />
              <Route path={routes.professorProjectsList} element={<DashboardProjectsPage />} />
              <Route path={routes.professorStudentsList} element={<DashboardStudentsPage />} />

              {/* Session */}
              <Route path={routes.login} element={<SessionLoginPage />} />
              <Route path={routes.passwordForgot} element={<SessionPasswordForgotPage />} />
              <Route path={routes.passwordReset} element={<SessionPasswordResetPage />} />
            </Route>
          </Routes>
        </Provider>
      </AppContainer>
    </ConfigProvider>
  </HashRouter>,
  document.getElementById('app')
);
