import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const Tag = require('antd/lib/tag');
const Popover = require('antd/lib/popover');
require('antd/dist/antd.css');

class TagTutor extends Component {


  constructor(props) {
    super(props);
  }


  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  popOverRender() {
    return (
      <div>
        <span>Full Name: {this.props.first_name} {this.props.last_name}</span> <br />
        <span>Email: <a href={'to:' + this.props.email}>{this.props.email}</a></span>
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

const mapStateToProps = (state, ownState) => {
  return {
  };
};

export default connect(mapStateToProps, null)(TagTutor);
