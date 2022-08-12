import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';

import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import DashboardProjects from '../components/dashboard/DashboardProjects';
import ProfessorSider from '../components/layout/ProfessorSider';
import SelectCourse from '../components/common/SelectCourse';

const { Content } = Layout;

const DashboardProjectsPage = ({ session }) => (
  <Layout>
    <Layout className="ant-layout-has-sider">
      <Content className="professorDashboard">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={session.user.role === 'professor'
              ? '/professor/dashboard/projects'
              : `/students/${session.user.id}/projects`}
            >
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
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
  </Layout>
);

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProjectsPage);
