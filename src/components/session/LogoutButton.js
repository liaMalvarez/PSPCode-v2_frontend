import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button,
} from 'antd';
import * as sessionActions from '../../actions/sessionActions';

const LogoutButton = ({ actions: { logout } }) => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
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
  actions: Object.isRequired,
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

export default connect(null, mapDispatch)(LogoutButton);
