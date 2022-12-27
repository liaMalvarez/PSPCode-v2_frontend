import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Logo extends Component {

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
      <span className="logo">PSP<span>code</span></span>
    );
  }
}

export default connect(null, null)(Logo);
