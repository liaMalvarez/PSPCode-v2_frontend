import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Popover } from 'antd';

require('antd/dist/antd.css');

class TagLanguage extends Component {
  constructor(props) {
    super(props);
  }

  popOverRender() {
    return (
      <div>
        <span>
          You have chosen to develop this
          <br />
          project in
          {' '}
          {this.props.language}
          .
        </span>
      </div>
    );
  }

  render() {
    return this.props.language ? (
      <Popover content={this.popOverRender()} title="Programming Language" trigger="hover">
        <Tag>{this.props.language}</Tag>
      </Popover>
    ) : (<span />);
  }
}

const mapStateToProps = (state, ownState) => ({
});

export default connect(mapStateToProps, null)(TagLanguage);
