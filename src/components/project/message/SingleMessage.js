import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { Avatar, Popover } from 'antd';

import {
  FileTextOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';

const SingleMessage = ({ data, user, isLastOne }) => {
  const itsMySelf = data.person.id === user.id;

  const renderPopover = (message, color, icon) => (
    <Popover content={message}>
      <Avatar
        style={{
          backgroundColor: color,
          [itsMySelf ? 'left' : 'right']: '-10px',
        }}
        icon={icon}
        className="statusAvatar"
      />
    </Popover>
  );

  const iconSelector = () => {
    switch (data.message_type) {
      case 'approved':
        return renderPopover('Project approved, well done!', '#56de1d', <CheckOutlined />);
      case 'rejected':
        return renderPopover('This project needs correction', '#f04134', <CloseOutlined />);
      case 'poke':
        return renderPopover('Harry up!', '#ffbc5a', <ExclamationOutlined />);
      default:
        return null;
    }
  };

  return (
    <div className={classNames('singleMessage', { right: itsMySelf, last: isLastOne })}>
      {iconSelector()}
      {!itsMySelf && (
        <div className="avatar">
          <span className="name">{data.person.first_name}</span>
        </div>
      )}

      <div className="message" style={{ justifyContent: itsMySelf ? 'flex-end' : '' }}>
        <p>
          {data.message && data.message.split('\n').map((item, key) => (
            <span key={key}>
              {item}
              <br />
            </span>
          ))}
        </p>
      </div>

      {data.link && (
        <div className="attachment">
          <Popover content="Click to download the file">
            <span>
              <a href={data.link} target="_blank" rel="noreferrer">
                <FileTextOutlined />
                {' '}
                <span>1 file attached</span>
              </a>
            </span>
          </Popover>
        </div>
      )}

      <div className="date" style={{ textAlign: itsMySelf ? 'left' : 'right' }}>
        <span>
          {moment.duration(moment().diff(moment(data.date))).humanize()}
          {' '}
          ago
        </span>
      </div>
    </div>
  );
};

export default SingleMessage;
