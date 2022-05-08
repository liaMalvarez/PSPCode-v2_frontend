import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import LogoutButton from '../session/LogoutButton';
import NotificationBadge from '../common/NotificactionBadge';
import Logo from '../common/Logo';
import { fetchNotifications, fetchNotificationsSuccess, fetchNotificationsFailure, updateNotifications, updateNotificationsFailure, updateNotificationsSuccess, fetchNotificationsReset, fetchOlderNotifications, fetchOlderNotificationsFailure, fetchOlderNotificationsReset, fetchOlderNotificationsSuccess,
  fetchNotiMessages, fetchNotiMessagesSuccess, fetchNotiMessagesFailure, updateNotiMessages, updateNotiMessagesFailure, updateNotiMessagesSuccess, fetchNotiMessagesReset, fetchOlderNotiMessages, fetchOlderNotiMessagesFailure, fetchOlderNotiMessagesReset, fetchOlderNotiMessagesSuccess} from '../../actions/notificationActions'

const Layout = require('antd/lib/layout');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Badge = require('antd/lib/badge');
const Popover = require('antd/lib/popover');
const Icon = require('antd/lib/icon');
const Avatar = require('antd/lib/avatar');
const Menu = require('antd/lib/menu');

const { Header } = Layout;

const NOTIFICATION_LIST_LIMIT = 8;




class CustomHeader extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.props.fetchNotifications();
    this.props.fetchNotiMessages();
  }
  componentWillReceiveProps(nextProps) {
  }

  ProfileMenu() {
    return (
      <Menu selectable={false} style={{'margin': '-8px -16px'}}>
        {this.props.session.user.role === 'student' &&
        <Menu.Item key="0">
          <Link to={'/users/' + this.props.session.user.id}>My Profile</Link>
        </Menu.Item>
        }
        <Menu.Item key="1">
          <a href="https://psp-heroku-staging.s3.amazonaws.com/message/file/44/14398c71-31e9-434c-8390-c11a71d976f8.pdf" target="_blank">Help</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3"><LogoutButton /></Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Header>
        <div className="logoBar">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="notificationBar">
          <div className="item">
            <NotificationBadge type="general" title="Notifications" icon="bell" notifications={this.props.notifications.general.list} count={this.props.notifications.general.count} loading={this.props.notifications.general.loading} markseen={this.props.updateNotifications} older={this.props.fetchOlderNotifications} limit={NOTIFICATION_LIST_LIMIT} />
          </div>
          <div className="item">
            <NotificationBadge type="message" title="Messages" icon="message"  notifications={this.props.notifications.messages.list} count={this.props.notifications.messages.count} loading={this.props.notifications.messages.loading} markseen={this.props.updateNotiMessages} older={this.props.fetchOlderNotiMessages} limit={NOTIFICATION_LIST_LIMIT} />
          </div>
          <div className="item">
            <Popover placement="bottomRight" title={this.props.session.user.first_name + ' ' + (this.props.session.user.last_name && this.props.session.user.last_name.substr(0,1)) + '.'} content={this.ProfileMenu()} trigger="click">
              <Badge>
                <Avatar icon="user"/>
              </Badge>
            </Popover>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,

    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: () => {
      dispatch(fetchNotifications(NOTIFICATION_LIST_LIMIT)).payload.then((result) => {
        if (true) {
          dispatch(fetchNotificationsSuccess(result));
        } else {
          dispatch(fetchNotificationsFailure(result.error));
        }
      });
    },
    fetchOlderNotifications: (page) => {
      dispatch(fetchOlderNotifications(NOTIFICATION_LIST_LIMIT,page)).payload.then((result) => {
        if (true) {
          dispatch(fetchOlderNotificationsSuccess(result));
        } else {
          dispatch(fetchOlderNotificationsFailure(result.error));
        }
      });
    },
    updateNotifications: (role) => {
      dispatch(updateNotifications(role)).payload.then((result) => {
        if (true) {
          dispatch(updateNotificationsSuccess(result));
        } else {
          dispatch(updateNotificationsFailure(result.error));
        }
      });
    },
    fetchNotiMessages: () => {
      dispatch(fetchNotiMessages(NOTIFICATION_LIST_LIMIT)).payload.then((result) => {
        if (true) {
          dispatch(fetchNotiMessagesSuccess(result));
        } else {
          dispatch(fetchNotiMessagesFailure(result.error));
        }
      });
    },
    fetchOlderNotiMessages: (page) => {
      dispatch(fetchOlderNotiMessages(NOTIFICATION_LIST_LIMIT,page)).payload.then((result) => {
        if (true) {
          dispatch(fetchOlderNotiMessagesSuccess(result));
        } else {
          dispatch(fetchOlderNotiMessagesFailure(result.error));
        }
      });
    },
    updateNotiMessages: (role) => {
      dispatch(updateNotiMessages(role)).payload.then((result) => {
        if (true) {
          dispatch(updateNotiMessagesSuccess(result));
        } else {
          dispatch(updateNotiMessagesFailure(result.error));
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
