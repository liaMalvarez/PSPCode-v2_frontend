import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import ProjectList from '../components/project/ProjectsList';
import ProfessorSider from "../components/layout/ProfessorSider";
import SpanData from "../components/common/SpanData";

const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
const Tabs = require('antd/lib/tabs');
const Breadcrumb = require('antd/lib/breadcrumb');

const { Content } = Layout;
const TabPane = Tabs.TabPane;

require('antd/dist/antd.css');

class ProjectListPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <CustomHeader />
        <Layout className="ant-layout-has-sider">
          <ProfessorSider selected="dashboard.students" />
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
              {this.props.session.user.role === 'professor' && <Breadcrumb.Item><Link to={'/professor/dashboard/students'}>Students</Link></Breadcrumb.Item>}
              {this.props.session.user.role === 'professor' && <Breadcrumb.Item><Link to={'/users/' + this.props.studentId}><SpanData entityName="student" entityId={this.props.studentId} loading output="first_name" /></Link></Breadcrumb.Item>}
              <Breadcrumb.Item>Projects</Breadcrumb.Item>
            </Breadcrumb>
            {this.props.session.user.role === 'professor' && <h1>Projects of <SpanData entityName="student" entityId={this.props.studentId} loading output="first_name" /></h1>}
            {this.props.session.user.role !== 'professor' && <h1>My Projects</h1>}
            <section>
              <Tabs defaultActiveKey="1">
                <TabPane tab="LIST" key="1">
                  <ProjectList studentId={this.props.studentId} />
                </TabPane>
              </Tabs>
            </section>

          </Content>
        </Layout>
        <CustomFooter />
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownState) => ({
  studentId: ownState.params.idstudent,
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage);
