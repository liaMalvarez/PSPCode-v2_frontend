import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ant-design/compatible';
import { Popover } from 'antd';

const Input = ({
  input, label, type, placeholder, meta: { touched, error }
}) => (
  <div>
    {label && (
      <label>
        {label}
      </label>
    )}
    <div>
      <input {...input} {...{ placeholder, type }} />
      {touched && error && <Popover content={error}><Icon type="close-circle" /></Popover>}
      {false && touched && !error && <Icon type="check-circle" /> }
    </div>
  </div>
);

const { string, object } = PropTypes;

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  meta: object
};

export default Input;
