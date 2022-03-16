import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from "moment";

const Icon = require('antd/lib/icon');
const Layout = require('antd/lib/layout');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Badge = require('antd/lib/badge');
const Popover = require('antd/lib/popover');
const Avatar = require('antd/lib/avatar');
const Menu = require('antd/lib/menu');

class NotificationBadge extends Component {



  constructor(props) {
    super(props);
    this.state = { page: 1, popOverVisible: false };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    if (false) {
      //this.props.fetchBasicData(this.props.entityName, this.props.entityId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.count && nextProps.count) {
      this.setState({...this.state, count: nextProps.count})
    }
  }

  onMenuItemClick(item) {
    if(item.key === "older") {
      this.props.older(this.state.page + 1);
      console.log('Fetching older ' + (this.state.page + 1));

      this.setState({...this.state, page: this.state.page + 1});
    }
  }
  handleVisibleChange = (visible) => {
    this.setState({ ...this.state, popOverVisible: visible });
  };
  markAsSeen() {
    if (this.props.count > 0) {
      this.props.markseen(this.props.session.user.role)
    }
  }

  notification(item) {
    let x = {
      link: '#',
      icon: 'default',
      text: '',
      date: moment.duration(moment().diff(moment(item.created_at))).humanize() + ' ago.'
    };

    if (this.props.type === 'message') {
      x.text = (<span>{item.originator.first_name} sent you a message about {item.assigned_project.name}</span>);
      x.link = '/students/' + item.assigned_project.user.id + '/projects/' + item.assigned_project.key + '/messages';
      x.icon = 'default';
    } else if (this.props.type === 'general' && item.status === 'approved') {
      x.text = (<span>{item.originator.first_name} approved {item.assigned_project.name}</span>);
      x.link = '/students/' + item.assigned_project.user.id + '/projects/' + item.assigned_project.key + '/messages';
      x.icon = 'default';
    } else if (this.props.type === 'general' && item.status === 'being_corrected') {
      x.text = (<span>{item.originator.first_name} submitted {item.assigned_project.name}</span>);
      x.link = '/students/' + item.assigned_project.user.id + '/projects/' + item.assigned_project.key;
      x.icon = 'default';
    } else if (this.props.type === 'general' && item.status === 'assigned') {
      x.text = (<span>{item.originator.first_name} assigned to you {item.assigned_project.name}</span>);
      x.link = '/students/' + item.assigned_project.user.id + '/projects/' + item.assigned_project.key;
      x.icon = 'default';
    } else if (this.props.type === 'general' && item.status === 'need_correction') {
      x.text = (<span>{item.originator.first_name} rejected {item.assigned_project.name}</span>);
      x.link = '/students/' + item.assigned_project.user.id + '/projects/' + item.assigned_project.key + '/messages';
      x.icon = 'default';
    }

    return x;
  }

  renderTitle() {
    return(<span>{this.props.title}  {this.props.loading && <Icon type="loading" />}</span>);
  }
  renderContent() {

    return (
    <Menu selectable={false} style={{'margin': '-8px -16px'}} onClick={(x) => this.onMenuItemClick(x)}>
      {this.props.notifications.map((item,i) => {
        const data = this.notification(item);
        if(!data.text) return;
        return (
          <Menu.Item key={i} className={"notificationItem"}>
            <Link onClick={(x) => {this.handleVisibleChange(false); hashHistory.push(data.link);}}><Badge status={(i<this.state.count)?'processing':data.icon} />
              <span className="notificationTtem">{data.text}</span>
              <span className="notificationDate">{data.date}</span>
            </Link>
          </Menu.Item>
        );
      })}

      <Menu.Divider />
      { ((this.props.notifications.length === (this.props.limit * this.state.page)) ||
        (this.props.notifications.length === this.props.limit * (this.state.page - 1)  && this.props.loading)) &&
      <Menu.Item key="older">
        See older
      </Menu.Item>
      }
    </Menu>
    );

  }

  render() {
    if (this.props.notifications && this.props.notifications.length > 0) {
      return (
        <Popover placement="bottomRight" title={this.renderTitle()} content={this.renderContent()} trigger="click" visible={this.state.popOverVisible} onVisibleChange={this.handleVisibleChange}>
          <Badge count={this.props.count}>
            <Avatar icon={this.props.icon} onClick={(x) => this.markAsSeen()} />
          </Badge>
        </Popover>
      );
    } else {
      return (
        <Popover placement="bottomRight" title={this.renderTitle()} content={`There are no ${this.props.title} yet.`} trigger="click">
          <Badge count="0">
            <Avatar icon={this.props.icon} />
          </Badge>
        </Popover>
      );
    }

  }
}


const mapStateToProps = (state, ownState) => {
  return {
    session: state.session,
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBadge);
