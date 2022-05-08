import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Icon } from '@ant-design/compatible';

const { Sider } = Layout;

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
    if (this.props.session.user.role !== 'professor') {
      return (<div />);
    }
    return (
      <Sider className="professorSider">
        <Link to="/professor/dashboard/projects">
          <span>
            Projects Dashboard
            {' '}
            {this.props.selected === 'dashboard.projects' && <Icon type="caret-left" />}
          </span>
        </Link>
        <Link to="/professor/dashboard/students">
          <span>
            Students Dashboard
            {' '}
            {this.props.selected === 'dashboard.students' && <Icon type="caret-left" />}
          </span>
        </Link>
      </Sider>
    );
  }
}

const mapStateToProps = (state, ownState) => ({
  session: state.session,
  selected: ownState.selected,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorSider);

