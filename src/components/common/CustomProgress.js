import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd';

const CustomProgress = () => (
  <div className="custom-progress">
    <Progress
      strokeWidth={10}
      strokeColor={{
        '0%': '#92b0af',
        '100%': '#0dc0bb',
      }}
      status="active"
      percent={100}
      showInfo={false}
      strokeLinecap="square"
    />
  </div>
);

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomProgress);
