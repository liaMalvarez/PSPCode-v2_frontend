import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import DashboardProjects from '../components/dashboard/DashboardProjects';
import ProfessorSider from "../components/layout/ProfessorSider";
import SelectCourse from "../components/common/SelectCourse";

const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
const Breadcrumb = require('antd/lib/breadcrumb');
const Select = require('antd/lib/select');

const { Content } = Layout;

require('antd/dist/antd.css');

class DashboardProjectsPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <CustomHeader />
        <Layout className="ant-layout-has-sider">
          <ProfessorSider selected="dashboard.projects" />
          <Content className="professorDashboard">
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
              <Breadcrumb.Item>Projects</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Projects Dashboard</h1>
            <div className="filters">
              <SelectCourse />
            </div>
            <section>
              <DashboardProjects />
            </section>

          </Content>
        </Layout>
        <CustomFooter />
      </Layout>
    );
  }
};

const mapStateToProps = (state, ownState) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProjectsPage);
