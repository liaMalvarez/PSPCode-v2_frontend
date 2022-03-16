import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

const Button = require('antd/lib/button');

const handleKeyDown = (e, cb) => {
  if (e.key === 'Enter' && e.shiftKey === false) {
    e.preventDefault();
    cb();
  }
};


export const LoginForm = (props) => {
  const { handleSubmit, error, pristine, reset, submitting } = props;
  return (
    <form onKeyDown={(e) => { handleKeyDown(e, handleSubmit); }}>
      {error &&
      <div className="textAboveForm">
        <p>{error}</p>
      </div>
      }
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
        <Button loading={submitting} onClick={handleSubmit} type="boton1">{submitting?' Loading...':'Log In'}</Button>
      </div>
    </form>
  );
};

const { func, string } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login)
})(LoginForm);
