import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd';

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

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomProgress);
