import { SubmissionError } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { removeAllCokies } from '../utils/functions';

export const login = (user) => () => sessionApi.login({ user }).then((user) => {
  const navigate = useNavigate();
  sessionService.saveUser(user)
    .then(() => {
      navigate('/');
    });
}).catch((err) => {
  throw new SubmissionError({
    _error: err.errors[0]
  });
});

export const logout = () => () => sessionApi.logout().then(() => {
  const navigate = useNavigate();
  sessionService.deleteSession();
  sessionService.deleteUser();
  removeAllCokies();
  localStorage.clear();
  navigate('/session/login');
}).catch((err) => {
  const navigate = useNavigate();
  removeAllCokies();
  sessionService.deleteSession();
  sessionService.deleteUser();
  removeAllCokies();
  localStorage.clear();
  navigate('/session/login');
  throw (err);
});

export const forgot = (user) => () => sessionApi.forgot(user, String(window.location.href).replace('session/password/forgot', 'session/password/reset')).then((r) => {
  throw new SubmissionError({ ok: true });
}).catch((err) => {
  if (err.errors && err.errors.ok) {
    throw new SubmissionError({ _error: 'yes' });
  } else {
    throw new SubmissionError({ _error: 'no' });
  }
});

export const reset = (user) => () => {
  const url = new URL(window.location.href);
  const headers = { token: url.searchParams.get('token'), uid: url.searchParams.get('uid'), client: url.searchParams.get('client_id') };
  return sessionApi.reset(user, headers).then((r) => {
    throw new SubmissionError({ ok: true });
  }).catch((err) => {
    if (err.errors && err.errors.ok) {
      throw new SubmissionError({ _error: 'yes' });
    } else {
      throw new SubmissionError({ _error: 'no' });
    }
  });
};

