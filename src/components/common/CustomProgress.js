import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd';

const CustomProgress = () => (
  <div className="customProgress">
    <Progress strokeWidth={5} status="active" percent={100} showInfo={false} />
  </div>
);

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomProgress);
