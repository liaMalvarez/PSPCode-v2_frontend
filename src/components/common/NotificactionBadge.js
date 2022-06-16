import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';

import {
  Popover,
  Badge,
  Avatar,
  Menu
} from 'antd';

const NotificationBadge = ({
  count,
  older,
  markseen,
  session,
  type,
  title,
  loading,
  notifications,
  limit,
  icon
}) => {
  const [page, setPage] = useState(1);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const navigate = useNavigate();

  const onMenuItemClick = (item) => {
    if (item.key === 'older') {
      older(page + 1);
      console.log(`Fetching older ${page + 1}`);

      setPage(page + 1);
    }
  };

  const handleVisibleChange = (visible) => {
    setPopOverVisible(visible);
  };

  const markAsSeen = () => {
    if (count > 0) {
      markseen(session.user.role);
    }
  };

  const notification = (item) => {
    const x = {
      link: '#',
      icon: 'default',
      text: '',
      date: `${moment.duration(moment().diff(moment(item.created_at))).humanize()} ago.`
    };

    if (type === 'message') {
      x.text = (
        <span>
          {item.originator.first_name}
          {' '}
          sent you a message about
          {' '}
          {item.assigned_project.name}
        </span>
      );
      x.link = `/students/${item.assigned_project.user.id}/projects/${item.assigned_project.key}/messages`;
      x.icon = 'default';
    } else if (type === 'general' && item.status === 'approved') {
      x.text = (
        <span>
          {item.originator.first_name}
          {' '}
          approved
          {' '}
          {item.assigned_project.name}
        </span>
      );
      x.link = `/students/${item.assigned_project.user.id}/projects/${item.assigned_project.key}/messages`;
      x.icon = 'default';
    } else if (type === 'general' && item.status === 'being_corrected') {
      x.text = (
        <span>
          {item.originator.first_name}
          {' '}
          submitted
          {' '}
          {item.assigned_project.name}
        </span>
      );
      x.link = `/students/${item.assigned_project.user.id}/projects/${item.assigned_project.key}`;
      x.icon = 'default';
    } else if (type === 'general' && item.status === 'assigned') {
      x.text = (
        <span>
          {item.originator.first_name}
          {' '}
          assigned to you
          {' '}
          {item.assigned_project.name}
        </span>
      );
      x.link = `/students/${item.assigned_project.user.id}/projects/${item.assigned_project.key}`;
      x.icon = 'default';
    } else if (type === 'general' && item.status === 'need_correction') {
      x.text = (
        <span>
          {item.originator.first_name}
          {' '}
          rejected
          {' '}
          {item.assigned_project.name}
        </span>
      );
      x.link = `/students/${item.assigned_project.user.id}/projects/${item.assigned_project.key}/messages`;
      x.icon = 'default';
    }

    return x;
  };

  const renderTitle = () => (
    <div>
      {title}
      {' '}
      {loading && <LoadingOutlined />}
    </div>
  );

  const renderContent = () => (
    <Menu selectable={false} style={{ margin: '-8px -16px' }} onClick={(x) => onMenuItemClick(x)}>
      {notifications.map((item, i) => {
        const data = notification(item);
        if (!data.text) return;
        return (
          <Menu.Item key={i} className="notificationItem">
            <button
              onClick={() => {
                handleVisibleChange(false);
                navigate(data.link);
              }}
              type="button"
              className="dot-button"
            >
              <Badge status={(i < count) ? 'processing' : data.icon} />
              <div className="notificationInfo">
                <span>{data.text}</span>
                <span className="notificationDate">{data.date}</span>
              </div>
            </button>
          </Menu.Item>
        );
      })}

      <Menu.Divider />
      { ((notifications.length - 1 === (limit * page))
        || (notifications.length - 1 === limit * (page - 1) && loading))
      && (
        <Menu.Item key="older">
          See older
        </Menu.Item>
      )}
    </Menu>
  );

  if (notifications && notifications.length > 0) {
    return (
      <Popover placement="bottomRight" title={renderTitle()} content={renderContent()} trigger="click" visible={popOverVisible} onVisibleChange={handleVisibleChange}>
        <Badge count={count}>
          <Avatar shape="circle" icon={icon} onClick={() => markAsSeen()} />
        </Badge>
      </Popover>
    );
  }

  return (
    <Popover placement="bottomRight" title={renderTitle()} content={`There are no ${title} yet.`} trigger="click">
      <Badge count="0">
        <Avatar shape="circle" icon={icon} />
      </Badge>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBadge);
