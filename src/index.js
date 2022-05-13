/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Route, Routes, HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import enUS from 'antd/lib/locale-provider/en_US';
import { ConfigProvider } from 'antd';
import { createHashHistory } from 'history';

import configureStore from './store/configureStore';

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
            <Route path="/" element={<HomePage />} />

            {/* Students */}
            <Route path="/users/:iduser(/returntoproject/:returntoprojectid)" element={<UserDetailsPage />} />
            <Route path="/students/:idstudent/projects/:idproject/:tab" element={<ProjectDetailsPage />} />
            <Route path="/students/:idstudent/projects/:idproject" element={<ProjectDetailsPage />} />
            <Route path="/students/:idstudent/projects" element={<ProjectListPage />} />

            {/* Professors */}
            <Route path="/professor/dashboard/projects/:idproject" element={<DashboardStudentsPage />} />
            <Route path="/professor/dashboard/projects" element={<DashboardProjectsPage />} />
            <Route path="/professor/dashboard/students" element={<DashboardStudentsPage />} />

            {/* Session */}
            <Route path="/session/login" element={<SessionLoginPage />} />
            <Route path="/session/password/forgot" element={<SessionPasswordForgotPage />} />
            <Route path="/session/password/reset" element={<SessionPasswordResetPage />} />
          </Routes>
        </Provider>
      </AppContainer>
    </ConfigProvider>
  </HashRouter>,
  document.getElementById('app')
);
