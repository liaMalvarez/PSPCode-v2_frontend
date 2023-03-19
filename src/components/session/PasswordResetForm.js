import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';
import { MehOutlined } from '@ant-design/icons';

import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

export const PasswordResetForm = ({
  handleSubmit,
  error,
  submitting,
  isAuth,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit();
  };

  const deleteParamsOnRedirect = () => {
    const currentUrl = window.location.href;
    const urlWithoutQueryParams = currentUrl.split('?')[0];

    window.history.pushState({}, '', urlWithoutQueryParams);
    window.location.href = urlWithoutQueryParams;
  };

  return (
    <div>
      <div className="textAboveForm">
        {!error && <p>Pick your new password.</p>}
        {error === 'no' && (
          <p>
            Whoops, we can't reset your password. Try getting a new magic link from
            {' '}
            <Link to="/session/password/forgot">here</Link>
            .
          </p>
        )}
        {error && error === 'yes' && <p>Perfect, you have changed your password successfully.</p>}
      </div>
      <form onSubmit={onSubmit}>
        {(!error || error === 'no')
          && (
            <div>
              <div>
                <Field
                  name="password"
                  placeholder="Password"
                  component={Input}
                  type="password"
                />
              </div>
              <div>
                <Field
                  name="passwordConfirmation"
                  placeholder="Repeat Password"
                  component={Input}
                  type="password"
                />
              </div>
            </div>
          )}
        <div className="hCenter">
          {(!error || error === 'no') && (
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={handleSubmit}
              type="boton1"
            >
              {submitting ? ' Loading...' : 'Submit'}
            </Button>
          )}
          {(error === 'yes') && (
            <Link
              to={isAuth ? '/' : '/session/login'}
              onClick={deleteParamsOnRedirect}
            >
              <Button type="boton1">
                Go Back to
                {' '}
                {isAuth ? 'Home' : 'Login'}
              </Button>
            </Link>
          )}
        </div>
      </form>
      {(!error || error === 'no') && (
        <div className="textBelowButton">
          <Link
            to={isAuth ? '/' : '/session/login'}
            onClick={deleteParamsOnRedirect}
          >
            <MehOutlined style={{ marginRight: '10px' }} />
            I do not want to reset my password
          </Link>
        </div>
      )}
    </div>
  );
};

const { func, string } = PropTypes;

PasswordResetForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string,
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.passwordReset),
})(PasswordResetForm);
