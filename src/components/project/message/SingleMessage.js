import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Avatar = require('antd/lib/avatar');
const Icon = require('antd/lib/icon');
const Popover = require('antd/lib/popover');

class SingleMessage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  handleChange = (pagination, filters, sorter) => {
  };

  render() {
    return (
      <div className={'singleMessage ' + (this.props.data.person.role === 'professor' ? 'right' : 'left')}>
        { this.props.data.message_type === 'approved' && <Popover content={"Project approved, well done!"}><Avatar style={{ backgroundColor: '#56de1d' }} icon="check" className={"statusAvatar"} /></Popover>}
        { this.props.data.message_type === 'rejected' && <Popover content={"This project needs correction"}><Avatar style={{ backgroundColor: '#f04134' }} icon="close" className={"statusAvatar"} /></Popover>}
        { this.props.data.message_type === 'poke' && <Popover content={"Harry up!"}><Avatar style={{ backgroundColor: '#ffbc5a' }} icon="exclamation" className={"statusAvatar"} /></Popover>}
        <div className="avatar">
          <span className="name">{this.props.data.person.first_name}</span>
        </div>
        <div className="date">
          <span>{moment.duration(moment().diff(moment(this.props.data.date))).humanize()} ago</span>
        </div>
        <div className="message">
          <p>{this.props.data.message && this.props.data.message.split('\n').map((item, key) => {
            return (<span key={key}>{item}<br/></span>);
          })}</p>
        </div>
        {this.props.data.link &&
        <div className="attachment">
          <Popover content={"Click to download the file"}>
            <span><a href={this.props.data.link} target="_blank"><Icon type="file-text" /> <span>1 file attached</span></a></span>
          </Popover>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, null)(SingleMessage);
