import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/sessionActions';

require('antd/dist/antd.css');

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/session/login');
  }, []);

  return (
    <div>
      Welcome.
      <button onClick={logout} type="button">Logout</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
