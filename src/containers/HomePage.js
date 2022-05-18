import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/sessionActions';

require('antd/dist/antd.css');

const HomePage = ({ session}) => {
  const navigate = useNavigate();
  const [hasUpdated, setHasUpdated] = useState(false);

  const redirectToPage = () => {
    if (!session.authenticated) {
      console.log('acaaaa');
      navigate('/session/login');
    } else if (session.user.role === 'professor') {
      navigate('/professor/dashboard/projects');
    } else if (session.user.role === 'student') {
      navigate(`/students/${session.user.id}/projects`);
    }
  };

  useEffect(() => {
    setHasUpdated(true);
    if (!hasUpdated) return;
    redirectToPage();
  }, [session]);

  return (
    <div>
      Welcome.
      <button onClick={logout} type="button">Logout</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
