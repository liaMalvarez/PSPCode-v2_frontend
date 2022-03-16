import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router';
import * as sessionActions from '../actions/sessionActions';
import PasswordResetForm from '../components/session/PasswordResetForm'; // eslint-disable-line import/no-named-as-default
import { routes } from '../constants/routesPaths';
import Logo from '../components/common/Logo';

const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
require('antd/dist/antd.css');

const { Content } = Layout;

const SessionPasswordResetPage = ({ actions: { reset } }) => (
  <Layout className="darkLayout">
    <Content className={{centredContent:true, fullFormPage: true}}>
      <div>
        <Logo />
        <PasswordResetForm onSubmit={reset} />
        <div className="textBelowButton">
          <Link to="/session/login"><Icon type="meh-o" /> I don't want to rest my password</Link>
        </div>
      </div>
    </Content>
  </Layout>
);

const { object } = PropTypes;

SessionPasswordResetPage.propTypes = {
  actions: object.isRequired
};

const mapDispatch = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(null, mapDispatch)(SessionPasswordResetPage);
