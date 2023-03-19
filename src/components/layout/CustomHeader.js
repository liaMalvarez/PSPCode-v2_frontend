/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Popover,
  Layout,
  Avatar,
  Badge,
  Menu,
} from 'antd';
import { BellOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

import LogoutButton from '../session/LogoutButton';
import NotificationBadge from '../common/NotificactionBadge';
import Logo from '../common/Logo';
import {
  fetchNotifications,
  fetchNotificationsSuccess,
  updateNotifications,
  updateNotificationsSuccess,
  fetchOlderNotifications,
  fetchOlderNotificationsSuccess,
  fetchNotiMessages,
  fetchNotiMessagesSuccess,
  updateNotiMessages,
  updateNotiMessagesSuccess,
  fetchOlderNotiMessages,
  fetchOlderNotiMessagesSuccess,
} from '../../actions/notificationActions';

const { Header } = Layout;

const NOTIFICATION_LIST_LIMIT = 8;

const CustomHeader = ({
  fetchNotificationsProp,
  fetchNotiMessagesProp,
  session,
  notifications,
  updateNotificationsProp,
  fetchOlderNotificationsProp,
  fetchOlderNotiMessagesProp,
  updateNotiMessagesProp,
}) => {
  useEffect(() => {
    fetchNotificationsProp();
    fetchNotiMessagesProp();
  }, []);

  const ProfileMenu = () => (
    <Menu selectable={false} style={{ margin: '-8px -16px' }}>
      {session.user.role === 'student' && (
        <Menu.Item key="0">
          <Link to={`/users/${session.user.id}`}>My Profile</Link>
        </Menu.Item>
      )}
      <Menu.Item key="1">
        <a
          href="https://psp-heroku-staging.s3.amazonaws.com/message/file/44/14398c71-31e9-434c-8390-c11a71d976f8.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Help
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3"><LogoutButton /></Menu.Item>
    </Menu>
  );

  return (
    <Header>
      <div className="logoBar">
        <Link to={session.user.role === 'professor'
          ? '/professor/dashboard/projects'
          : `students/${session.user.id}/projects`}
        >
          <Logo />
        </Link>
      </div>
      <div className="notificationBar">
        <div className="item">
          <NotificationBadge
            type="general"
            title="Notifications"
            icon={<BellOutlined />}
            notifications={notifications.general.list}
            count={notifications.general.count}
            loading={notifications.general.loading}
            markseen={updateNotificationsProp}
            older={fetchOlderNotificationsProp}
            limit={NOTIFICATION_LIST_LIMIT}
          />
        </div>
        <div className="item">
          <NotificationBadge
            type="message"
            title="Messages"
            icon={<MessageOutlined />}
            notifications={notifications.messages.list}
            count={notifications.messages.count}
            loading={notifications.messages.loading}
            markseen={updateNotiMessagesProp}
            older={fetchOlderNotiMessagesProp}
            limit={NOTIFICATION_LIST_LIMIT}
          />
        </div>
        <div className="item">
          <Popover
            placement="bottomRight"
            title={`${session.user.first_name} ${session.user.last_name && session.user.last_name.substr(0, 1)}.`}
            content={ProfileMenu()}
            trigger="click"
          >
            <Badge>
              <Avatar shape="circle" icon={<UserOutlined />} />
            </Badge>
          </Popover>
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,

  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsProp: () => {
    dispatch(fetchNotifications(NOTIFICATION_LIST_LIMIT)).payload.then((result) => {
      dispatch(fetchNotificationsSuccess(result));
    });
  },
  fetchOlderNotificationsProp: (page) => {
    dispatch(fetchOlderNotifications(NOTIFICATION_LIST_LIMIT, page)).payload.then((result) => {
      dispatch(fetchOlderNotificationsSuccess(result));
    });
  },
  updateNotificationsProp: (role) => {
    dispatch(updateNotifications(role)).payload.then((result) => {
      dispatch(updateNotificationsSuccess(result));
    });
  },
  fetchNotiMessagesProp: () => {
    dispatch(fetchNotiMessages(NOTIFICATION_LIST_LIMIT)).payload.then((result) => {
      dispatch(fetchNotiMessagesSuccess(result));
    });
  },
  fetchOlderNotiMessagesProp: (page) => {
    dispatch(fetchOlderNotiMessages(NOTIFICATION_LIST_LIMIT, page)).payload.then((result) => {
      dispatch(fetchOlderNotiMessagesSuccess(result));
    });
  },
  updateNotiMessagesProp: (role) => {
    dispatch(updateNotiMessages(role)).payload.then((result) => {
      dispatch(updateNotiMessagesSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
