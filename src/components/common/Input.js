import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Input = ({
  input, label, type, placeholder, meta: { touched, error },
}) => (
  <div>
    {label && (
      <label>
        {label}
      </label>
    )}
    <div style={{ display: 'flex' }}>
      <input {...input} {...{ placeholder, type }} />
      {touched && error && (
        <Popover content={error}>
          <CloseCircleOutlined />
        </Popover>
      )}
      {false && touched && !error && (
        <CheckCircleOutlined />
      )}
    </div>
  </div>
);

const { string, object } = PropTypes;

Input.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  placeholder: string,
  meta: object,
};

export default Input;
