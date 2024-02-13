import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';

import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

export const LoginForm = (props) => {
  const {
    handleSubmit,
    error,
    submitting,
  } = props;

  const onLogin = async (event) => {
    event.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={onLogin}>
      {error
      && (
        <div className="textAboveForm">
          <p>{error}</p>
        </div>
      )}
      <div>
        <Field
          name="email"
          placeholder="Email"
          component={Input}
          type="email"
        />
      </div>
      <div>
        <Field
          name="password"
          placeholder="Password"
          component={Input}
          type="password"
        />
      </div>
      <div className="hCenter">
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onLogin}
          type="boton1"
        >
          {submitting ? ' Loading...' : 'Log In'}
        </Button>
      </div>
    </form>
  );
};

const { func, string } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string,
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login),
})(LoginForm);
