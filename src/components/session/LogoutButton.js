import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button,
} from 'antd';
import { dashboardReducerResetAll } from '../../actions/dashboardActions';

import * as sessionActions from '../../actions/sessionActions';

const LogoutButton = ({ actions: { logout }, cleanAllData }) => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    cleanAllData();
    await logout();
    navigate('/session/login');
  };

  return (
    <Button type="button" onClick={logoutHandler}>
      Logout
    </Button>
  );
};

LogoutButton.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),

  cleanAllData: () => {
    dispatch(dashboardReducerResetAll())
  },
});



export default connect(null, mapDispatchToProps)(LogoutButton);
