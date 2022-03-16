import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import DashboardStudents from '../components/dashboard/DashboardStudents';
import ProfessorSider from "../components/layout/ProfessorSider";
import SpanData from "../components/common/SpanData";
import SelectCourse from "../components/common/SelectCourse";


const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
const Breadcrumb = require('antd/lib/breadcrumb');
const Sider = require('antd/lib/layout/Sider');

const { Content } = Layout;

require('antd/dist/antd.css');

class DashboardStudentsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <CustomHeader/>
        <Layout className="ant-layout-has-sider">
          <ProfessorSider selected="dashboard.students" />
          <Content className="professorDashboard">
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/"><Icon type="home"/></Link></Breadcrumb.Item>
              { this.props.projectId && <Breadcrumb.Item><Link to="/professor/dashboard/projects">Projects</Link></Breadcrumb.Item> }
              { this.props.projectId && <Breadcrumb.Item><SpanData entityName="project" entityId={this.props.projectId} loading output="name" /></Breadcrumb.Item> }
              { !this.props.projectId && <Breadcrumb.Item>Students</Breadcrumb.Item> }
            </Breadcrumb>
            {this.props.projectId &&
            <div>
              <h1><SpanData entityName="project" entityId={this.props.projectId} loading output="name" /> Dashboard</h1>
              <div className="filters">
                <span>Deadline: <SpanData entityName="project" entityId={this.props.projectId} loading output="deadline" format="date" /></span>
                <div style={{visibility:'hidden'}}><SelectCourse /></div>
              </div>
            </div>}
            {!this.props.projectId &&
            <div>
              <h1>Students Dashboard</h1>
              <div className="filters">
                <SelectCourse />
              </div>
            </div>
            }
            <section>
              <DashboardStudents projectId={this.props.projectId} />
            </section>

          </Content>
        </Layout>
        <CustomFooter/>
      </Layout>
    );
  }
};

const mapStateToProps = (state, ownState) => {
  return {
    projectId: ownState.params.idproject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStudentsPage);
