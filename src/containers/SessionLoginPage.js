import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/session/LoginForm'; // eslint-disable-line import/no-named-as-default
import Logo from '../components/common/Logo';

const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
require('antd/dist/antd.css');

const { Content } = Layout;

const UserLoginPage = ({ actions: { login } }) => (
  <Layout className="darkLayout">
    <Content className={{ centredContent: true, fullFormPage: true }}>
      <div>
        <Logo />
        <LoginForm onSubmit={login} />
        <div className="textBelowButton">
          <Link to="/session/password/forgot">
            <Icon type="frown-o" />
            I forgot my password
          </Link>
        </div>
      </div>
    </Content>
  </Layout>
);

const { object } = PropTypes;

UserLoginPage.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(null, mapDispatch)(UserLoginPage);
