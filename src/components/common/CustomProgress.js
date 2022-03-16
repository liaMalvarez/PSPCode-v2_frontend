import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Progress = require('antd/lib/progress');

class CustomProgress extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className="customProgress">
        <Progress strokeWidth={5} status="active" percent={100} showInfo={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomProgress);
