import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';

const { Sider } = Layout;

class ProfessorSider extends Component {
  constructor(props) {
    super(props);
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
            {this.props.selected === 'dashboard.projects' && <CaretLeftOutlined />}
          </span>
        </Link>
        <Link to="/professor/dashboard/students">
          <span>
            Students Dashboard
            {' '}
            {this.props.selected === 'dashboard.students' && <CaretLeftOutlined />}
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

