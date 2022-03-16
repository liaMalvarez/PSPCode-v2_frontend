import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
const Sider = require('antd/lib/layout/Sider');

const { Content } = Layout;

class ProfessorSider extends Component {

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
    if(this.props.session.user.role !== 'professor') {
      return (<div />);
    }
    return (
      <Sider className="professorSider">
        <Link to={'/professor/dashboard/projects'}><span>Projects Dashboard {this.props.selected === 'dashboard.projects' && <Icon type="caret-left" />}</span></Link>
        <Link to={'/professor/dashboard/students'}><span>Students Dashboard {this.props.selected === 'dashboard.students' && <Icon type="caret-left" />}</span></Link>
      </Sider>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    session: state.session,
    selected: ownState.selected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorSider);

