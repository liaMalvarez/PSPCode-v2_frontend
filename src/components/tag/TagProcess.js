import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tag, Popover } from 'antd';

require('antd/dist/antd.css');

class TagProcess extends Component {
  constructor(props) {
    super(props);
  }

  popOverRender() {
    return (
      <div>
        <span>
          This projects follows
          {' '}
          {this.props.name}
        </span>
      </div>
    );
    return (
      <div>
        <span>
          Time Planning:
          {' '}
          {this.props.has_plan_time ? 'Yes' : 'No'}
        </span>
        {' '}
        <br />
        <span>
          LOC Planning:
          {' '}
          {this.props.has_plan_loc ? 'Yes' : 'No'}
        </span>
        {' '}
        <br />
        <span>
          PIP required:
          {' '}
          {this.props.has_pip ? 'Yes' : 'No'}
        </span>
      </div>
    );
  }

  render() {
    return (
      <Popover content={this.popOverRender()} title="PSP Process" trigger="hover">
        <Tag>{this.props.name}</Tag>
      </Popover>
    );
  }
}

const mapStateToProps = (state, ownState) => ({
});

export default connect(mapStateToProps, null)(TagProcess);
