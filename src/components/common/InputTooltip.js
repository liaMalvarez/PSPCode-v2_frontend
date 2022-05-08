import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@ant-design/compatible';
import { Popover } from 'antd';

import { TEXTS } from '../../constants/constants'

class InputTooltip extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    if (!TEXTS[this.props.input]) {
      return (<span />);
    }

    return (
      <Popover content={TEXTS[this.props.input]}>
        <Link>
          <Icon type="info-circle" />
        </Link>
      </Popover>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTooltip);
