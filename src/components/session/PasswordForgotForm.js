import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';

import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

export const PasswordForgotForm = ({
  handleSubmit, error, submitting
}) => (
  <div>
    <div className="textAboveForm">
      {!error && <p>forgot your password? not a big deal! just type your email below and we will send you a magic link to reset it.</p>}
      {error && error === 'no' && <p>Whoops, we don't have that email on our database, try with another one!</p>}
      {error && error === 'yes' && <p>Perfect, we have sent you an email with a magic link to reset your password.</p>}
    </div>
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="email"
          placeholder="Email"
          component={Input}
          type="email"
        />
      </div>
      <div className="hCenter">
        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="boton1">{submitting ? ' Loading...' : 'Submit'}</Button>
      </div>
    </form>
  </div>
);

const { func, string } = PropTypes;

PasswordForgotForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.passwordForgot)
})(PasswordForgotForm);
