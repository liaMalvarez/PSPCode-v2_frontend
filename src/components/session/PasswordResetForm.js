import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';

import { Link } from 'react-router-dom';
import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

export const PasswordResetForm = ({
  handleSubmit, error, submitting
}) => (
  <div>
    <div className="textAboveForm">
      {!error && <p>pick your new password.</p>}
      {error && error === 'no'
        && (
          <p>
            Whoops, we can't reset your password. Try getting a new magic link from
            {' '}
            <Link to="/session/password/forgot">here</Link>
            .
          </p>
        )}
      {error && error === 'yes' && <p>Perfect, you have changed your password successfully.</p>}
    </div>
    <form onSubmit={handleSubmit}>
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
        {(!error || error === 'no') && <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="boton1">{submitting ? ' Loading...' : 'Submit'}</Button>}
        {(error && error === 'yes') && <Link to="/session/login"><Button type="boton1">Login</Button></Link>}
      </div>
    </form>
  </div>
);

const { func, string } = PropTypes;

PasswordResetForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.passwordReset)
})(PasswordResetForm);

