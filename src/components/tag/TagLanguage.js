import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const Tag = require('antd/lib/tag');
const Popover = require('antd/lib/popover');
require('antd/dist/antd.css');

class TagLanguage extends Component {


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
        <span>You have chosen to develop this<br />project in {this.props.language}.</span>
      </div>
    );

  }

  render() {

    return this.props.language?(
      <Popover content={this.popOverRender()} title="Programming Language" trigger="hover">
        <Tag>{this.props.language}</Tag>
      </Popover>
    ):(<span/>);
  }
}

const mapStateToProps = (state, ownState) => {
  return {
  };
};

export default connect(mapStateToProps, null)(TagLanguage);
