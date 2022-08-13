import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Tabs } from 'antd';

import ProjectList from '../components/project/ProjectsList';
import ProfessorSider from '../components/layout/ProfessorSider';
import SpanData from '../components/common/SpanData';

const { Content } = Layout;
const { TabPane } = Tabs;

const ProjectListPage = ({ session }) => {
  const { idstudent: studentId } = useParams();

  return (
    <Layout className="ant-layout-has-sider">
      <ProfessorSider selected="dashboard.students" />
      <Content
        className={session.user.role === 'professor'
          ? 'professorDashboard'
          : 'studentsDashboard'}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={session.user.role === 'professor'
              ? '/professor/dashboard/projects'
              : `/students/${session.user.id}/projects`}
            >
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          {session.user.role === 'professor' && <Breadcrumb.Item><Link to="/professor/dashboard/students">Students</Link></Breadcrumb.Item>}
          {session.user.role === 'professor' && <Breadcrumb.Item><Link to={`/users/${studentId}`}><SpanData entityName="student" entityId={studentId} loading output="first_name" /></Link></Breadcrumb.Item>}
          <Breadcrumb.Item>Projects</Breadcrumb.Item>
        </Breadcrumb>
        {session.user.role === 'professor' && (
        <h1>
          Projects of
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
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage);
