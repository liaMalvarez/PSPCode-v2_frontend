import React from 'react';
import { Tag, Popover } from 'antd';


const CustomTag = ({ name, title, description }) => (
  <Popover content={description} title={title} trigger="hover">
    <Tag>{name}</Tag>
  </Popover>
);

export default CustomTag;

