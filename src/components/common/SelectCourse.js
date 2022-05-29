import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';

import {
  dashboardCourseList,
  dashboardCourseListFailure,
  dashboardCourseListSuccess,
  dashboardCourseSelect,
  dashboardCourseSelectSuccess
} from '../../actions/dashboardActions';
import { getCacheObject } from '../../utils/functions';

const SelectCourse = ({
  list,
  dashboardCourseListProp,
  dashboardCourseSelectProp,
  active,
  error
}) => {
  useEffect(() => {
    if (!list) {
      dashboardCourseListProp();
    }
  }, []);

  useEffect(() => {
    if (list && !active) {
      const c = getCacheObject('courses_active');
      dashboardCourseSelectProp(c || list[0]);
    }
    if (error) {
      alert(`Something went wrong: ${JSON.stringify(error)}`);
    }
  }, [list, active, error]);

  if (!list || !active) {
    return (
      <Select value="loading">
        <Select.Option key="loading" value="loading"><LoadingOutlined /></Select.Option>
      </Select>
    );
  }
  return (
    <Select
      value={String(active.id)}
      onChange={
        (value) => dashboardCourseSelectProp(
          list.find((o) => String(o.id) == String(value))
        )
      }
    >
      {list.map((item) => (<Select.Option key={item.id} value={String(item.id)}>{item.name}</Select.Option>))}
    </Select>
  );
};

const mapStateToProps = (state) => ({

  active: state.dashboard.courses.active,
  list: state.dashboard.courses.list,
  error: state.dashboard.courses.error,
  loading: state.dashboard.courses.loading,

});

const mapDispatchToProps = (dispatch) => ({
  dashboardCourseListProp: () => {
    dispatch(dashboardCourseList()).payload.then((result) => {
      dispatch(dashboardCourseListSuccess(result));
    }).catch((error) => {
      dispatch(dashboardCourseListFailure(error));
    });
  },
  dashboardCourseSelectProp: (course) => {
    dispatch(dashboardCourseSelect(course)).payload.then((result) => {
      dispatch(dashboardCourseSelectSuccess(result));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCourse);
