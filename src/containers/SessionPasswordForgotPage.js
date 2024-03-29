import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

import * as sessionActions from '../actions/sessionActions';
import PasswordForgotForm from '../components/session/PasswordForgotForm'; // eslint-disable-line import/no-named-as-default
import Logo from '../components/common/Logo';

const { Content } = Layout;

const SessionPasswordForgotPage = ({ actions: { forgot } }) => (
  <Layout className="darkLayout">
    <Content className={{ centredContent: true, fullFormPage: true }}>
      <div>
        <Logo />
        <PasswordForgotForm onSubmit={forgot} />
        <div className="textBelowButton">
          <Link to="/session/login">
            <SmileOutlined style={{ marginRight: '10px' }} />
            I remember my password
          </Link>
        </div>
      </div>
    </Content>
  </Layout>
);

const { object } = PropTypes;

SessionPasswordForgotPage.propTypes = {
  actions: object.isRequired,
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

export default connect(null, mapDispatch)(SessionPasswordForgotPage);
