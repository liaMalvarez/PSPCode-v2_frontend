import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { dashboardCourseList, dashboardCourseListFailure, dashboardCourseListReset, dashboardCourseListSuccess, dashboardCourseSelect, dashboardCourseSelectFailure, dashboardCourseSelectReset, dashboardCourseSelectSuccess} from '../../actions/dashboardActions';
import {getCacheObject} from "../../utils/functions";

const Select = require('antd/lib/select');
const Icon = require('antd/lib/icon');

class SelectCourse extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    if(!this.props.list) {
      this.props.dashboardCourseList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.list && !nextProps.active) {
      const c = getCacheObject('courses_active');
      this.props.dashboardCourseSelect(c?c:nextProps.list[0]);
    }
    if(nextProps.error) {
      alert("Something went wrong: " + JSON.stringify(nextProps.error));
    }
  }

  render() {
    if (!this.props.list || !this.props.active) {
      return (
        <Select value="loading">
          <Select.Option key="loading" value="loading"><Icon type="loading" /></Select.Option>
        </Select>
      );
    }
    return (
      <Select value={String(this.props.active.id)} onChange={value => this.props.dashboardCourseSelect(this.props.list.find(o => String(o.id) == String(value)))}>
        {this.props.list.map((item, i) => {
          return (<Select.Option key={item.id} value={String(item.id)}>{item.name}</Select.Option>);
        })}
      </Select>
    );
  }
}

const mapStateToProps = (state) => ({

  active: state.dashboard.courses.active,
  list: state.dashboard.courses.list,
  error: state.dashboard.courses.error,
  loading: state.dashboard.courses.loading,

});

const mapDispatchToProps = dispatch => ({
  dashboardCourseList: () => {
    dispatch(dashboardCourseList()).payload.then((result) => {
      dispatch(dashboardCourseListSuccess(result));
    }).catch((error) => {
      dispatch(dashboardCourseListFailure(error));
    });
  },
  dashboardCourseSelect: (course) => {
    dispatch(dashboardCourseSelect(course)).payload.then((result) => {
      if (true) {
        dispatch(dashboardCourseSelectSuccess(result));
      } else {
        dispatch(dashboardCourseSelectFailure(result.error));
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCourse);
