import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/sessionActions';

require('antd/dist/antd.css');

const HomePage = ({ session }) => {
  const navigate = useNavigate();

  const redirectToPage = () => {
    if (!session.authenticated || !session.user.id) {
      console.log('acaaaa');
      navigate('/session/login');
    } else if (session.user.role === 'professor') {
      navigate('/professor/dashboard/projects');
    } else {
      navigate(`/students/${session.user.id}/projects`);
    }
  };

  useEffect(() => {
    redirectToPage();
    console.log('hola', session);
    if (!session.authenticated || !session.user.id) {
      console.log('acaaaa3');
      navigate('/session/login');
    } else {
      redirectToPage();
    }
  }, [session]);

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
