import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Icon } from '@ant-design/compatible';
import { Layout } from 'antd';

import * as sessionActions from '../actions/sessionActions';
import PasswordResetForm from '../components/session/PasswordResetForm'; // eslint-disable-line import/no-named-as-default
import Logo from '../components/common/Logo';

require('antd/dist/antd.css');

const { Content } = Layout;

const SessionPasswordResetPage = ({ actions: { reset } }) => (
  <Layout className="darkLayout">
    <Content className={{ centredContent: true, fullFormPage: true }}>
      <div>
        <Logo />
        <PasswordResetForm onSubmit={reset} />
        <div className="textBelowButton">
          <Link to="/session/login">
            <Icon type="meh-o" />
            I do not want to rest my password
          </Link>
        </div>
      </div>
    </Content>
  </Layout>
);

const { object } = PropTypes;

SessionPasswordResetPage.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(null, mapDispatch)(SessionPasswordResetPage);
