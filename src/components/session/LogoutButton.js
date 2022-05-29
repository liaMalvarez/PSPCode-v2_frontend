import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button
} from 'antd';
import * as sessionActions from '../../actions/sessionActions';

const LogoutButton = ({ actions: { logout } }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate('/session/login');
  };

  return (
    <Button type="button" onClick={logoutHandler}>
      Logout
    </Button>
  );
};

const { object } = PropTypes;

LogoutButton.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(null, mapDispatch)(LogoutButton);
