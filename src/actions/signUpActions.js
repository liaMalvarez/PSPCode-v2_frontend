import { SubmissionError } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { routes } from '../constants/routesPaths';

export const signUp = (user) => () => sessionApi.signUp({ user }).then(({ user }) => {
  const navigate = useNavigate();
  sessionService.saveUser(user)
    .then(() => {
      navigate(routes.index);
    });
}).catch((err) => {
  throw new SubmissionError(err.errors);
});
