import React from 'react';
import { Tag, Popover } from 'antd';

const CustomTag = ({
  name,
  title,
  description,
  color = '#90b2b1',
  icon = undefined,
}) => (
  <Popover content={description} title={title} trigger="hover">
    <Tag color={color} icon={icon}>{name}</Tag>
  </Popover>
);

export default CustomTag;
