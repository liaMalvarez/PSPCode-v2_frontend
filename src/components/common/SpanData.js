import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';

import {
  basicDataFetch,
  basicDataFetchSuccess
} from '../../actions/utilsActions';

const SpanData = ({
  format,
  basic_data,
  entityName,
  entityId,
  fetchBasicData,
  loading,
  output
}) => {
  useEffect(() => {
    if (!basic_data.some((o) => o.key == `${entityName}_${entityId}`)) {
      fetchBasicData(entityName, entityId);
    }
  }, []);

  if (!basic_data.some((o) => o.key == `${entityName}_${entityId}`) && loading) {
    return (
      <span>
        <LoadingOutlined />
        {' '}
        loading
      </span>
    );
  }
  const value = basic_data.find((o) => o.key == `${entityName}_${entityId}`).object[output];
  let text = value;
  if (format === 'date') {
    text = moment(value).format('DD/MM/YYYY');
  }
  return (<span>{text}</span>);
};

const mapStateToProps = (state) => ({
  basic_data: state.utils.basic_data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBasicData: (entityName, entityId) => {
    dispatch(basicDataFetch(entityName, entityId)).payload.then((result) => {
      dispatch(basicDataFetchSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpanData);
