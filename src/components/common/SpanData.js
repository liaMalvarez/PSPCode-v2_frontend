import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from '@ant-design/compatible';

import {
  basicDataFetch, basicDataFetchFailure, basicDataFetchSuccess
} from '../../actions/utilsActions';
import { PROJECT_STATUS } from '../../constants/constants';

class SpanData extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    if (!this.props.basic_data.some((o) => o.key == `${this.props.entityName}_${this.props.entityId}`)) {
      this.props.fetchBasicData(this.props.entityName, this.props.entityId);
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    if (!this.props.basic_data.some((o) => o.key == `${this.props.entityName}_${this.props.entityId}`) && this.props.loading) {
      return (<span>
        <Icon type="loading" />
        {' '}
        loading
      </span>);
    }
    const value = this.props.basic_data.find((o) => o.key == `${this.props.entityName}_${this.props.entityId}`).object[this.props.output];
    let text = value;
    if (this.props.format === 'date') {
      text = moment(value).format('DD/MM/YYYY');
    } else {
    }
    return (<span>{text}</span>);
  }
}

const mapStateToProps = (state) => ({

  basic_data: state.utils.basic_data,

});

const mapDispatchToProps = (dispatch) => ({
  fetchBasicData: (entityName, entityId) => {
    dispatch(basicDataFetch(entityName, entityId)).payload.then((result) => {
      if (true) {
        dispatch(basicDataFetchSuccess(result));
      } else {
        dispatch(basicDataFetchFailure(result.error));
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpanData);
