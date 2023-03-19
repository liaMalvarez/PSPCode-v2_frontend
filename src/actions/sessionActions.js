import { SubmissionError } from 'redux-form';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { removeAllCokies } from '../utils/functions';

export const login = (user) => () => sessionApi.login({ user }).then((user) => {
  sessionService.saveUser(user);
  return user;
}).catch((err) => {
  throw new SubmissionError({
    _error: err.errors[0],
  });
});

export const logout = () => () => sessionApi.logout().then(() => {
  sessionService.deleteSession();
  sessionService.deleteUser();
  removeAllCokies();
  localStorage.clear();
}).catch((err) => {
  removeAllCokies();
  sessionService.deleteSession();
  sessionService.deleteUser();
  removeAllCokies();
  localStorage.clear();
  throw (err);
});

export const forgot = (user) => () => sessionApi.forgot(user, String(window.location.href).replace('session/password/forgot', 'session/password/reset')).then(() => {
  throw new SubmissionError({ ok: true });
}).catch((err) => {
  if (err.errors && err.errors.ok) {
    throw new SubmissionError({ _error: 'yes' });
  } else {
    throw new SubmissionError({ _error: 'no' });
  }
});

export const reset = (user) => async () => {
  let headers = {};

  try {
    headers = await sessionService.loadSession();
  } catch {
    const url = new URL(window.location.href);

    if (!headers?.token) {
      headers = {
        token: url.searchParams.get('token'),
        uid: url.searchParams.get('uid'),
        client: url.searchParams.get('client_id'),
      };
    }
  }

  return sessionApi.reset(user, headers).then(() => {
    throw new SubmissionError({ ok: true });
  }).catch((err) => {
    if (err.errors && err.errors.ok) {
      throw new SubmissionError({ _error: 'yes' });
    } else {
      throw new SubmissionError({ _error: 'no' });
    }
  });
};
