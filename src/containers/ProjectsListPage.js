import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Tabs } from 'antd';

import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import ProjectList from '../components/project/ProjectsList';
import ProfessorSider from '../components/layout/ProfessorSider';
import SpanData from '../components/common/SpanData';

const { Content } = Layout;
const { TabPane } = Tabs;

require('antd/dist/antd.css');

const ProjectListPage = ({ session }) => {
  const { idstudent: studentId } = useParams();

  return (
    <Layout>
      <CustomHeader />
      <Layout className="ant-layout-has-sider">
        <ProfessorSider selected="dashboard.students" />
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
            {session.user.role === 'professor' && <Breadcrumb.Item><Link to="/professor/dashboard/students">Students</Link></Breadcrumb.Item>}
            {session.user.role === 'professor' && <Breadcrumb.Item><Link to={`/users/${studentId}`}><SpanData entityName="student" entityId={studentId} loading output="first_name" /></Link></Breadcrumb.Item>}
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
          </Breadcrumb>
          {session.user.role === 'professor' && (
            <h1>
              Projects of
              {' '}
              <SpanData entityName="student" entityId={studentId} loading output="first_name" />
            </h1>
          )}
          {session.user.role !== 'professor' && <h1>My Projects</h1>}
          <section>
            <Tabs defaultActiveKey="1">
              <TabPane tab="LIST" key="1">
                <ProjectList studentId={studentId} />
              </TabPane>
            </Tabs>
          </section>

        </Content>
      </Layout>
      <CustomFooter />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage);
