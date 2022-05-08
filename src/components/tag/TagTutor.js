import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tag, Popover } from 'antd';

require('antd/dist/antd.css');

class TagTutor extends Component {
  constructor(props) {
    super(props);
  }

  popOverRender() {
    return (
      <div>
        <span>
          Full Name:
          {' '}
          {this.props.first_name}
          {' '}
          {this.props.last_name}
        </span>
        {' '}
        <br />
        <span>
          Email:
          {' '}
          <a href={`to:${this.props.email}`}>{this.props.email}</a>
        </span>
      </div>
    );
  }

  render() {
    return (
      <Popover content={this.popOverRender()} title="Tutor" trigger="hover">
        <Tag>{this.props.first_name}</Tag>
      </Popover>
    );
  }
}

const mapStateToProps = (state, ownState) => ({
});

export default connect(mapStateToProps, null)(TagTutor);
