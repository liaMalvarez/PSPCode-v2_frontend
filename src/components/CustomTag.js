import React from 'react';
import { Tag, Popover } from 'antd';

require('antd/dist/antd.css');

const CustomTag = ({ name, title, description }) => (
  <Popover content={description} title={title} trigger="hover">
    <Tag>{name}</Tag>
  </Popover>
);

export default CustomTag;

