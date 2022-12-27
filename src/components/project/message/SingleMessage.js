import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  FileTextOutlined, CheckOutlined, CloseOutlined, ExclamationOutlined
} from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

class SingleMessage extends Component {
  render() {
    return (
      <div className={`singleMessage ${this.props.data.person.role === 'professor' ? 'right' : 'left'}`}>
        { this.props.data.message_type === 'approved' && <Popover content="Project approved, well done!"><Avatar style={{ backgroundColor: '#56de1d' }} icon={<CheckOutlined />} className="statusAvatar" /></Popover>}
        { this.props.data.message_type === 'rejected' && <Popover content="This project needs correction"><Avatar style={{ backgroundColor: '#f04134' }} icon={<CloseOutlined />} className="statusAvatar" /></Popover>}
        { this.props.data.message_type === 'poke' && <Popover content="Harry up!"><Avatar style={{ backgroundColor: '#ffbc5a' }} icon={<ExclamationOutlined />} className="statusAvatar" /></Popover>}
        <div className="avatar">
          <span className="name">{this.props.data.person.first_name}</span>
        </div>
        <div className="date">
          <span>
            {moment.duration(moment().diff(moment(this.props.data.date))).humanize()}
            {' '}
            ago
          </span>
        </div>
        <div className="message">
          <p>
            {this.props.data.message && this.props.data.message.split('\n').map((item, key) => (<span key={key}>
              {item}
              <br />
                                                                                                </span>))}

          </p>
        </div>
        {this.props.data.link
        && <div className="attachment">
          <Popover content="Click to download the file">
            <span>
              <a href={this.props.data.link} target="_blank" rel="noreferrer">
                <FileTextOutlined />
                {' '}
                <span>1 file attached</span>
              </a>
            </span>
          </Popover>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(SingleMessage);
