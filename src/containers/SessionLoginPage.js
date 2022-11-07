import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

import * as sessionActions from '../actions/sessionActions';
import LoginForm from '../components/session/LoginForm'; // eslint-disable-line import/no-named-as-default
import Logo from '../components/common/Logo';

const { Content } = Layout;

const UserLoginPage = ({ actions: { login } }) => (
  <Layout className="darkLayout">
    <Content className={{ centredContent: true, fullFormPage: true }}>
      <div>
        <Logo />
        <LoginForm onSubmit={login} />
        <div className="textBelowButton">
          <Link to="/session/password/forgot">
            <FrownOutlined style={{ marginRight: '10px' }} />
            I forgot my password
          </Link>
        </div>
      </div>
    </Content>
  </Layout>
);

const { object } = PropTypes;

UserLoginPage.propTypes = {
  actions: object.isRequired,
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

export default connect(null, mapDispatch)(UserLoginPage);
