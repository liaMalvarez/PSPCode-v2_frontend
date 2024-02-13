import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';

import * as sessionActions from '../actions/sessionActions';
import PasswordResetForm from '../components/session/PasswordResetForm'; // eslint-disable-line import/no-named-as-default
import Logo from '../components/common/Logo';

const { Content } = Layout;

const SessionPasswordResetPage = ({ actions: { reset }, session }) => (
  <Layout className="darkLayout">
    <Content className={{ centredContent: true, fullFormPage: true }}>
      <div>
        <Logo />
        <PasswordResetForm
          onSubmit={reset}
          isAuth={session.authenticated}
        />
      </div>
    </Content>
  </Layout>
);

SessionPasswordResetPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatch)(SessionPasswordResetPage);
