import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'

const Tag = require('antd/lib/tag');
const Popover = require('antd/lib/popover');
require('antd/dist/antd.css');

class TagInstructions extends Component {


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
        <span>
          <a href={this.props.link} target="blank">Click here to download</a> the project instructions. <br />
          You have until {moment(this.props.deadline).format('DD/MM/YYYY')} to submit this project.
        </span>
      </div>
    );

  }

  render() {

    return (
      <Popover content={this.popOverRender()} title="Instructions" trigger="hover">
        <Tag>Instructions</Tag>
      </Popover>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
  };
};

export default connect(mapStateToProps, null)(TagInstructions);
